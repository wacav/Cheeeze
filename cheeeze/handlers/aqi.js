const request = require('request')

const regContent = /^\/오염\s/i
const aqiKey = process.env.AQI_TOKEN
const geolocationKey = process.env.GEOLOCATION_API_KEY
module.exports = client => {
    client.on('message', msg => {
        if(regContent.exec(msg.content)){
            const area = encodeURIComponent(msg.content.split(" ")[1]);
            if(!area) return;

            const geoLocationUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
                +'?address=' + area + '&key=' + geolocationKey

            request(geoLocationUrl, (err,httpResponse,body) => {

                body = JSON.parse(body)
                if(httpResponse.statusCode !== 200) return;

                if(body.results.length > 0){
                    const lat = body.results[0].geometry.location.lat
                    const lng = body.results[0].geometry.location.lng
                    msg.reply(lat)
                    msg.reply(lng)
                }
            })


        }
    })
}