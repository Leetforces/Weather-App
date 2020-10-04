const request = require('request')
//require("dotenv").config()

const getID = (address, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q="
        + encodeURIComponent(address)
        + "&APPID=" + process.env.WEATHER_API_KEY
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.id)
        }
    })
}



module.exports=getID;