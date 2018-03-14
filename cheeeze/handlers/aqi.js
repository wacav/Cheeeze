const request = require('request')
const moment = require('moment')

const regContent = /^\/오염\s/i
const aqiKey = process.env.AQI_TOKEN
const geolocationKey = process.env.GEOLOCATION_API_KEY

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
                    const aqiUrl = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${aqiKey}`
                    request(aqiUrl, (err,httpResponse, body) => {
                        if(httpResponse.statusCode !== 200){
                            msg.channel.send('값을 가져오지 못했어요ㅠㅠ')
                            return;  
                        } 
                        body = JSON.parse(body)
                        const data = body.data
                        const aqi = data.aqi
                        const aqiTime = moment(data.time.s).format("YYYY년MM월DD일 HH시")
                        let aqiMsg = '';

                        if( aqi > 300 ) { aqiMsg = '위험한 수준이에요.... 외출을 피하시는게 좋을것 같아요ㅜㅜ!' }
                        else if( aqi > 200 ) { aqiMsg = '매우 나쁘네요.. 일반인도 약한 영향이 유발될수 있어요.. 조심하세요..!' }
                        else if( aqi > 150 ) { aqiMsg = '나쁜 상태에요!! 나가게 된다면 미세먼지가 느껴질거에요!!' }
                        else if( aqi > 100 ) { aqiMsg = '안좋아요.. ㅠ 어린이나 노약자분들에겐 유해하군요.. 마스크를 쓰는건 어떨까요?' }
                        else if( aqi > 50 ) { aqiMsg = '보통 !! 너무 무리만 하지 마세요~ 오홍홍' }
                        else { aqiMsg = '좋네요! 오늘은 밖에서 운동하는건 어떨까요?' }

                        msg.reply(`${aqiTime}에 측정된 자료에요!\n\n${area}의 대기오염지수는 \`${aqi}\`\n\n${aqiMsg}`)
                        
                    })
                }else{
                    msg.channel.send('지역을 찾지 못하였습니다.')
                }
            })
        }
    })
}