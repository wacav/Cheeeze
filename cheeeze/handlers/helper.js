const helperText = '\n'
	+ '`/로또` :  로또 번호를 뽑아드립니다!\n\n'
	+ '`/날씨 [지역]` : 해당 `지역`에 있는 현재날씨를 알려드립니다!\n\n'
	+ '`/오염 [지역]` : 해당 `지역`에 있는 대기중 오염도를 알려드립니다!\n\n'
	+ '`마법의소라고동` : 마법의 소라고동님은 어려운일을 도와줘요! \n'
	+ ' 예시) `마법의소라고동님 오늘 저녁엔 치킨을 먹을까요?`\n' 
	+ '마법의 소라고동님은 까다로우셔서 질문 끝에 `?` 를 붙이지 않으면 대답을 안해줘요!\n\n'
	+ '`/로딩` : 주말까지 얼마나 남았는지 알려드립니다!\n\n'
	+ ' `/치즈` : 치즈가 자기소개 합니다!\n\n';

const aboutCheeeze = '안녕하세요! 저는 치즈라고 해요! :sunglasses: :sunglasses: :sunglasses: '
	+ '`/?` 또는 `/도움`을 입력하시면 명령어를 확인하실수 있어요\n\n'
	+ 'AI 는 아니고 명령어에 따라 대답해주는 **봇** 이랍니다!\n\n'
	+ '오류가 난다면 메일을 통해 알려주세요!\n\n'
	+ '`waca.chong.dev@gmail.com` 에 메일을 주세요!'

module.exports = client => {
	client.on('message', msg => {
		if(msg.content === '/?' || msg.content === '/도움' ){
			msg.reply(helperText)
		}
		if(msg.content === '/치즈'){
			msg.channel.send(aboutCheeeze)
		}
	})
}