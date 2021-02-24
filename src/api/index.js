import fetch from 'isomorphic-unfetch';
import { formatDateTime } from 'lib';

const CITIES_LOCATION = {
  nairobi: {
    slug: 'nairobi',
    latitude: '-1.2709',
    longitude: '36.8169',
    name: 'Nairobi',
    country: 'Kenya',
    label: 'Nairobi, Kenya',
    zoom: '12',
    center: '-1.2709,36.8169',
    twitterHandle: '@nairobicitygov',
  },
  lagos: {
    slug: 'lagos',
    latitude: '6.4552',
    longitude: '3.4198',
    name: 'Lagos',
    country: 'Nigeria',
    label: 'Lagos, Nigeria',
    zoom: '12',
    center: '6.4552,3.4198',
    twitterHandle: '@followlasg',
  },
  'dar-es-salaam': {
    slug: 'dar-es-salaam',
    latitude: '-6.7846',
    longitude: '39.2669',
    name: 'Dar es Salaam',
    country: 'Tanzania',
    label: 'Dar-es-salaam, Tanzania',
    zoom: '12',
    center: '-6.7846,39.2669',
    twitterHandle: '#DarEsSalaam',
  },
  africa: {
    slug: 'africa',
    latitude: '6.4552',
    longitude: '3.4198',
    name: 'Africa',
    country: 'Nigeria',
    label: 'Africa',
    zoom: '12',
    center: '6.4552,3.4198',
    twitterHandle: '@followlasg',
  },
};

const COUNTRIES_LOCATION = {
  kenya: {
    slug: 'kenya',
    city: 'nairobi',
    latitude: '0.17666667',
    longitude: '37.90832778',
    name: 'Kenya',
    label: 'Kenya',
    zoom: '6',
    center: '0.17666667,37.90832778',
  },
  uganda: {
    slug: 'uganda',
    city: 'kampala',
    latitude: '1.373333',
    longitude: '32.290275',
    name: 'Uganda',
    label: 'Uganda',
    zoom: '6',
    center: '1.373333,32.290275',
  },
  tanzania: {
    slug: 'tanzania',
    latitude: '-6.200',
    longitude: '34.629',
    name: 'Dar es Salaam',
    country: 'Tanzania',
    label: 'Tanzania',
    zoom: '6',
    center: '-6.7846,39.2669',
    twitterHandle: '#DarEsSalaam',
  },
  'south-africa': {
    slug: 'south-africa',
    latitude: '-30.559482',
    longitude: '22.937506',
    name: 'South Africa',
    label: 'South Africa',
    zoom: '5',
    center: '-30.559482,22.937506',
  },
  nigeria: {
    slug: 'nigeria',
    city: 'lagos',
    latitude: '9.081999',
    longitude: '8.675277',
    name: 'Nigeria',
    label: 'Nigeria',
    zoom: '6',
    center: '9.081999,8.675277',
  },
  africa: {
    slug: 'africa',
    latitude: '8.7832',
    longitude: '34.5085',
    name: 'Africa',
    country: 'africa',
    label: 'Africa',
    zoom: '3',
    center: '8.7832,34.5085',
    twitterHandle: '@followlasg',
  },
};

function chunkData(rawData, intervalMinutes = 60) {
  const intervalMilli = intervalMinutes * 60 * 1000;
  let currentBucket = 0;
  const buckets = [];

  const data = rawData.reverse();
  const startTime = new Date(data[0].timestamp).getTime();
  let intervalCurr = startTime - (startTime % intervalMilli) + intervalMilli;

  for (let i = 0; i < data.length; i += 1) {
    if (new Date(data[i].timestamp).getTime() < intervalCurr) {
      buckets[currentBucket] = buckets[currentBucket] || [];
      buckets[currentBucket].push(data[i]);
    } else {
      intervalCurr += intervalMilli;
      currentBucket += 1;
    }
  }
  return buckets;
}

function calculateAverage(data, chunk = 60) {
  const results = [];

  const chunks = chunkData(data, chunk);
  chunks.forEach((tempData) => {
    const sum = tempData.reduce(
      (acc, current) => {
        return {
          P1: acc.P1 + current.P1,
          P2: acc.P2 + current.P2,
          timestamp:
            new Date(acc.timestamp).getTime() +
            new Date(current.timestamp).getTime(),
        };
      },
      { P1: 0, P2: 0, timestamp: 0 }
    );
    const intervalMilli = chunk * 60 * 1000;
    const startTime = new Date(tempData[0].timestamp).getTime();
    const averageTime = startTime - (startTime % intervalMilli) + intervalMilli;

    const average = {
      P1: sum.P1 / tempData.length,
      P2: sum.P2 / tempData.length,
      timestamp: averageTime,
    };
    const { date, time } = formatDateTime(average.timestamp);
    average.dateLabel = `${date} \n ${time}`;
    results.push(average);
  });

  return results;
}

function dataByCountry(data, country) {
  return data.filter((datum) => datum.location.country === country) || [];
}

function dataByCountries(data) {
  /* eslint-disable no-param-reassign */
  const byCountries = data.reduce((results, item) => {
    const key = item.location?.country?.toLowerCase() || 'other';
    results[key] = results[key] || []; // create array if not exists
    results[key].push(item); // push item
    return results;
  }, {});
  /* eslint-enable no-param-reassign */
  Object.keys(byCountries).map((key) => {
    byCountries[key] = calculateAverage(byCountries[key]);
    return null;
  });
  return byCountries;
}

function sortCountries(data) {
  const byCountries = { ...data };
  Object.keys(byCountries).map((key) => {
    byCountries[key] = calculateAverage(byCountries[key], new Date().getTime());
    return null;
  });
  return Object.keys(byCountries)
    .sort((a, b) => {
      return byCountries[a][0].P1 - byCountries[b][0].P1;
    })
    .map((key) => ({ name: key, data: byCountries[key][0] }))
    .filter((datum) => datum.data.P1 && datum.data.P2);
}

const headers = new Headers();

headers.append('Authorization', `token ${process.env.DATA4_DSGS}`);
const defaultTimestampGte = new Date();
defaultTimestampGte.setHours(defaultTimestampGte.getHours() - 4);

async function getData(
  url = `https://api.sensors.africa/v2/data`,
  timestamp = defaultTimestampGte.toISOString(),
  times = 0
) {
  const timestampQuery = '';
  // if (timestamp) {
  //   timestampQuery = `?timestamp__gte=${timestamp}`;
  // }
  const response = await fetch(url + timestampQuery, {
    headers,
  });
  const resjson = await response.json();

  const data = resjson.results.map((readings) => {
    const P1 =
      readings.sensordatavalues.find(
        (dataValue) => dataValue.value_type === 'P1'
      )?.value || 0;
    const P2 =
      readings.sensordatavalues.find(
        (dataValue) => dataValue.value_type === 'P2'
      )?.value || 0;
    const { date, time } = formatDateTime(readings.timestamp);
    return {
      ...readings,
      P1: Number(P1),
      P2: Number(P2),
      dateLabel: `${date} \n ${time}`,
    };
  });

  if (data[data.length - 1].timestamp > timestamp) {
    return data.concat(await getData(resjson.next, timestamp, times + 1));
  }
  return data;
}

const API = {
  getAirData(city) {
    return fetch(`https://api.sensors.africa/v2/data/air/?city=${city}`);
  },
  getData,
  getWeeklyP2Data(city) {
    const fromDate = new Date(Date.now() - 7 * 24 * 3600 * 1000)
      .toISOString()
      .substr(0, 10);
    return fetch(
      `https://api.sensors.africa/v2/data/air/?city=${city}&from=${fromDate}&interval=day&value_type=P2`
    );
  },
};

async function getNodesPerNetwork(
  totalNodes,
  url = 'https://api.sensors.africa/v1/node'
) {
  const data = [];
  const networks = [
    { name: 'PURPLE_AIR', label: 'PurpleAir' },
    { name: 'AIRQO', label: 'AirQO' },
    { name: 'SMART_CITIZEN', label: 'SmartCitizen' },
    { name: 'AIR_NOW', label: 'AirNow' },
    { name: 'OPENDATA_DURBAN', label: 'OpenData Durban' },
    { name: 'SENSORS_COMMUNITY', label: 'Sensor.Community' },
  ];
  /* eslint-disable no-await-in-loop */
  for (let index = 0; index < networks.length; index += 1) {
    const response = await fetch(url, {
      headers: { Authorization: `token ${process.env[networks[index].name]}` },
    });
    const resjson = await response.json();
    data.push({ name: networks[index].label, count: resjson.count });
  }
  /* eslint-enable no-await-in-loop */

  data.push({
    name: 'sensors.AFRICA',
    count: totalNodes - data.reduce((acc, curr) => acc + curr.count, 0),
  });
  return data;
}

async function getNodesPerCountry(
  countries,
  url = 'https://api.sensors.africa/v1/node'
) {
  const data = [];
  /* eslint-disable no-await-in-loop */
  for (let index = 0; index < countries.length; index += 1) {
    const countryQuery = `?location__country=${countries[index]}`;
    const response = await fetch(url + countryQuery, {
      headers: { Authorization: `token ${process.env.DATA4_DSGS}` },
    });
    const resjson = await response.json();
    data.push({ name: countries[index], count: resjson.count });
  }
  /* eslint-enable no-await-in-loop */

  return data;
}

/**
 * Recuresively fetch data till result.next page is null then concats all data and return
 * @param  {String} url URL to fetch.
 * @param  {Object} options http options.
 * @param  {String} times number of times this function has been called Recuresively.
 * @return {Array}     Array of results
 */
async function fetchAllNodes(url, options = { headers }, times = 0) {
  const response = await fetch(url, options);
  const resjson = await response.json();
  const data = resjson.results;
  if (resjson.next) {
    const nextData = await fetchAllNodes(resjson.next, options, times + 1);
    return { ...nextData, results: data.concat(nextData.results) };
  }

  return { ...resjson, results: data };
}

export {
  CITIES_LOCATION,
  COUNTRIES_LOCATION,
  dataByCountry,
  dataByCountries,
  calculateAverage,
  sortCountries,
  getNodesPerNetwork,
  getNodesPerCountry,
  fetchAllNodes,
};
export default API;
