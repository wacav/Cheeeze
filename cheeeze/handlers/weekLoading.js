const moment = require('moment')

const day = 1000 * 3600 * 24
const week = day * 7
const onWeek = day * 5

function calcWeekPercent(remainTime, isWeek){
	if(isWeek){
		return (remainTime / onWeek) / (day * 2) * 100
	}else{
		return remainTime / onWeek * 100
	}
}

function setWeekBlock(weekPercent, isWeek){
	const blockCount = parseInt(parseFloat(weekPercent) / 5)
	const blackBlock = '■'
	const whileBlock = '□'
	const total = blackBlock.repeat(blockCount) + whileBlock.repeat(20-blockCount)
	if(isWeek){
		return '월요일 로딩 중...  [' + total + ']'
	} else {
		return '주말 로딩 중.....  [' + total + ']'
	}
}

module.exports = client => {
	client.on('message', msg => {
		if (msg.content === '/로딩'){
			const nowTime = moment().add(3, 'd').add(9, 'h');
			const remainTime = nowTime % week
			const isWeek = remainTime > onWeek ? true : false
			const weekPercent = calcWeekPercent(remainTime, isWeek).toFixed(2)
			const block = setWeekBlock(weekPercent, isWeek)

			const result = block + ' ' + weekPercent + '%'
			msg.channel.send(result)
		}
	})
}
