const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=8390d75bd084ea53cfa0627a844902ca&query=' +
    latitude +
    ',' +
    longitude;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback(body.error.info);
    } else {
      const temperature = body.current.temperature;
      const feelsLikeTemperature = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions[0];

      const forecastSummary =
        weatherDescription +
        '. It is currently ' +
        temperature +
        ' degrees out. It feels like ' +
        feelsLikeTemperature +
        ' degrees out.';

      callback(undefined, forecastSummary);
    }
  });
};

module.exports = forecast;
