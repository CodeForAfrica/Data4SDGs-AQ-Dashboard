import fetch from 'isomorphic-unfetch';

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
    latitude: '0.17666667',
    longitude: '37.90832778',
    name: 'Kenya',
    label: 'Kenya',
    zoom: '12',
    center: '0.17666667,37.90832778',
  },
  uganda: {
    slug: 'uganda',
    latitude: '1.373333',
    longitude: '32.290275',
    name: 'Uganda',
    label: 'Uganda',
    zoom: '12',
    center: '1.373333,32.290275',
  },
  tanzania: {
    slug: 'tanzania',
    latitude: '-6.7846',
    longitude: '39.2669',
    name: 'Dar es Salaam',
    country: 'Tanzania',
    label: 'Tanzania',
    zoom: '12',
    center: '-6.7846,39.2669',
    twitterHandle: '#DarEsSalaam',
  },
  southafrica: {
    slug: 'southafrica',
    latitude: '30.559482',
    longitude: '22.937506',
    name: 'South Africa',
    label: 'South Africa',
    zoom: '12',
    center: '30.559482,22.937506',
  },
  nigeria: {
    slug: 'nigeria',
    latitude: '9.081999',
    longitude: '8.675277',
    name: 'Nigeria',
    label: 'Nigeria',
    zoom: '12',
    center: '9.081999,8.675277',
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

const API = {
  getAirData(city) {
    return fetch(`https://api.sensors.africa/v2/data/air/?city=${city}`);
  },
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
};
export default API;
