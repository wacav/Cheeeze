const regText = /^마법의(\s소라고동|소라고동|\s소라고둥|소라고둥)(\s|님\s)[0-9|a-z|A-Z|가-힣ㄱ-ㅎㅏ-ㅣ~!@\#$%<>^&*\(\)\-=+_\\|\s]*\?$/i
const answers =  [
	'그래.', '당장 시작해.', '응.', '허락 할게.', '돼.'
	, '하고싶은대로 해.', '나중에 해', '다시 한번 물어봐.'
	, '가만히 있어.' , '둘 다 하지마.'
	, '아니.', '아아안 돼애에.', '포기해.'
	, '하지마.', '안돼.'
]

module.exports = client => {
	client.on('message', msg => {
		if(regText.exec(msg.content)){
			msg.reply(answers[Math.floor(Math.random() * answers.length)])
		}
	})
}
