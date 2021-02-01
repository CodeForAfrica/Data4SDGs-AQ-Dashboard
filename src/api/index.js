import fetch from 'isomorphic-unfetch';
import { formatDateTime } from 'lib';

const HUMIDITY_READING = 'humidity';
const TEMPERATURE_READING = 'temperature';
const P2_READING = 'P2';

const formatAirStats = (data, isPm2 = false) => {
  const formatted = {};
  ['average', 'maximum', 'minimum'].forEach((stat) => {
    const parsed = Number.parseFloat(data[stat]);
    if (isPm2 && stat === 'average') {
      formatted.averageDescription = `measurements not recorded`;
      if (!Number.isNaN(parsed)) {
        let difference = 25.0 - parsed;
        let position = 'below';
        if (parsed > 25.0) {
          difference = parsed - 25.0;
          position = 'above';
        }
        const percentage = ((difference / 25.0) * 100).toFixed(2);
        formatted.averageDescription = `${percentage}% ${position} the safe level`;
      }
    }
    formatted[stat] = Number.isNaN(parsed) ? '--' : parsed.toFixed(2);
  });
  return formatted;
};

const getFormattedStats = (data, reading) => {
  let statData = {};
  if (data && data.count === 1) {
    statData = data.results[0][reading];
  }
  return formatAirStats(statData, reading === P2_READING);
};

const getFormattedHumidityStats = (data) => {
  return getFormattedStats(data, HUMIDITY_READING);
};

const getFormattedP2Stats = (data) => {
  return getFormattedStats(data, P2_READING);
};

const getFormattedTemperatureStats = (data) => {
  return getFormattedStats(data, TEMPERATURE_READING);
};

const DATE_FMT_OPTIONS = {
  timeZone: 'UTC',
  weekday: 'short',
  day: 'numeric',
  month: 'short',
};

const formatWeeklyP2Stats = (data) => {
  const stats = [];
  // Start with the oldest value
  for (let i = data.length - 1; i >= 0; i -= 1) {
    let averagePM = Number.parseFloat(data[i].average);
    if (Number.isNaN(averagePM)) {
      averagePM = 0.0;
    }
    const date = new Date(data[i].start_datetime).toLocaleDateString(
      'en-US',
      DATE_FMT_OPTIONS
    );
    stats.push({ date, averagePM });
  }
  return stats;
};

const getFormattedWeeklyP2Stats = (data) => {
  const statData =
    (data && data.count === 1 && data.results[0][P2_READING]) || [];
  return formatWeeklyP2Stats(statData);
};

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
    zoom: '6',
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

function chunkData(rawData, intervalMinutes = 30) {
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

function calculateAverage(data, chunk = 30) {
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
    .map((key) => ({ name: key, data: byCountries[key][0] }));
}

const headers = new Headers();

headers.append('Authorization', `token ${process.env.DATA4_DSGS}`);
const yesterday = new Date();
yesterday.setMinutes(15);

async function getData(
  url = `https://api.sensors.africa/v2/data`,
  timestamp = yesterday.toISOString(),
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

export {
  CITIES_LOCATION,
  COUNTRIES_LOCATION,
  getFormattedHumidityStats,
  getFormattedP2Stats,
  getFormattedTemperatureStats,
  getFormattedWeeklyP2Stats,
  dataByCountry,
  dataByCountries,
  calculateAverage,
  sortCountries,
};
export default API;
