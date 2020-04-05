const request = require('request');

const forecast = (latitude,longitude,callback) => {
  //console.log(longitude,latitude);
          const url = 'https://api.darksky.net/forecast/c2cf7c82f86f955c4bc0ea75ebc68e5d/' + `${latitude},${longitude}` +'?units=auto'
      request({url : url, json: true}, (error,{body}= {}) => {
           //console.log(response.body);

           if (error) {
             callback('unaable to connect to the network',undefined)
           }

           else if (body.error) {
             callback('unable to find location! please enter proper values of longitude and latitude...and try again',undefined)
           }
           else {
               callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out today. This is high today is ${body.daily.data[0].temperatureHigh} degrees with a low of ${body.daily.data[0].temperatureLow} degrees. There is ${body.currently.precipProbability}% chance of rain.` )
           }

      })
        }


module.exports = forecast;
