const request = require('request');

const forecast = (lat, long, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=4252a40096bf33b127000aa9d90b31fc&query=${lat},${long}&units=m`;

    request({ url , json: true }, (error, { body })=>{
        if(error){
            callback('Unable to connect to the weather service',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`)
        }
    })
}

module.exports = forecast;