const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d6354f8e6901ccacfe321036eec524e9&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                wind_speed: body.current.wind_speed,
                humidity: body.current.humidity,
                precip: body.current.precip,
                time: body.current.observation_time,


            })
        }
    })
}

module.exports = forecast