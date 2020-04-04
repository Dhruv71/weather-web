const request = require('request');


const geocode = (address,callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZGg3MSIsImEiOiJjazhhNDhhN20wMHY1M2dwY242djY5bjJqIn0.GhCjw0zuCkHEwFfDXbZ2dA&limit=1'
  request( { url : url, json: true}, (error,{body}) => {
    if (error) {
      callback('Unable to connect with network', undefined)
    }
    else if (body.features.length === 0) {
      callback('unable to find address....enter proper address and try again', undefined)
    }
    else {
       const {features} = body
      callback(undefined, {
                           longitude: features[0].center[0],
                           latitude: features[0].center[1],
                           location: features[0].place_name})
    }
  })
}

module.exports = geocode;
