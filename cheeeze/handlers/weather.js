const request = require('request')
const moment = require('moment')

const regContent = /^\/날씨\s/i
const weatherKey = process.env.WEATHER_KEY
const geolocationKey = process.env.GEOLOCATION_API_KEY
const absoluteTemp = 273.15

module.exports = client => {
    client.on('message', msg => {
        if(regContent.exec(msg.content)){
            const area = msg.content.split(" ")[1];
            const encodeArea = encodeURIComponent(area);
            if(!area){
                msg.reply('위치를 지정해주세요! 위치를 찾지 못했어요')
                return;  
            } 

            const geoLocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeArea}&key=${geolocationKey}`

            request(geoLocationUrl, (err,httpResponse,body) => {
                if(httpResponse.statusCode !== 200){
                    msg.channel.send('값을 가져오지 못했어요ㅠㅠ')
                    return;  
                } 
                body = JSON.parse(body)

                if(body.results.length > 0){
                    const lat = body.results[0].geometry.location.lat
                    const lng = body.results[0].geometry.location.lng
                    const aqiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherKey}`
                    request(aqiUrl, (err,httpResponse, body) => {
                        if(httpResponse.statusCode !== 200){
                            msg.channel.send('값을 가져오지 못했어요ㅠㅠ')
                            return;  
                        } 
                        const data = JSON.parse(body)
                        const temp = (data.main.temp - absoluteTemp).toFixed(1)
                        const tempTime = moment(data.dt * 1000).format("YYYY년MM월DD일 HH시mm분")
                        let weather = '';
                        
                        switch(data.weather[0].icon){
                            case '01d' || '01n':
                                weather = '현재 날씨는 맑음 이네요!'
                            break
                            case '02d' || '02n':
                                weather = '현재 날씨는 구름 조금있어요!'
                            break
                            case '03d' || '03n':
                                weather = '현재 날씨는 구름이 많아요!'
                            break
                            case '04d' || '04n':
                                weather = '현재 날씨는 흐리네요 ㅠ!'
                            break
                            case '09d' || '09n':
                                weather = '현재 날씨는 소나기가 내리고 있어요!'
                            break
                            case '10d' || '10n':
                                weather = '현재 날씨는 비가 내리고 있어요!'
                            break
                            case '11d' || '11n':
                                weather = '현재 날씨는 천둥번개가 치고 있네요!!!'
                            break
                            case '13d' || '13n':
                                weather = '현재 날씨는 눈이 내리고 있어요!'
                            break
                            case '50d' || '50n':
                                weather = '현재 날씨는 안개가 짙게 껴있네요!'
                            break
                        }
                        msg.reply(`${tempTime}에 측정된 자료에요!\n\n * ${weather}\n\n * ${area}의 현재온도는 \`${temp}℃\`네요!`)
                    })
                }else{
                    msg.channel.send('지역을 찾지 못했어요 ㅠㅠ')
                }
            })
        }
    })
}