let lottoNumList = [
    1,2,3,4,5,
    6,7,8,9,10,
    11,12,13,14,15,
    16,17,18,19,20,
    21,22,23,24,25,
    26,27,28,29,30,
    31,32,33,34,35,
    36,37,38,39,40,
    41,42,43,44,45
];
// 최대치
const max = 230;
// 최소치
const min = 50;
// 복사
const temp = lottoNumList.slice();

// 50 ~ 230 까지 랜덤 숫자
// 최소 최대는 47 ~ 238 이다.
let total = 0; 
// 결과
let result = [];

// 로또번호 1개 불러오기
function getRandNum(){
    if(lottoNumList.length < 1){
        reset();
        return getRandNum();
    }
    // 0 ~ 44 random
    let l = Math.floor(Math.random() * lottoNumList.length);
    // lottoNum 추출
    let lottoNum = lottoNumList[l];
    // lottoNum remove
    lottoNumList.splice(l,1);
    return lottoNum;
}

//초기화
function reset(){
    // 초기화
    result = [];
    lottoNumList = temp.slice();
}

// 로또 체크
function checkLotto(lottoNum) {
    let tempTotal = 0;
    let tempResult = result.slice();
    let evenCount = 0;
    let oddCount = 0;
    // 임시 리스트에 값 넣어본다
    tempResult.push(lottoNum);
    
    // 총합
    for(let i in tempResult) {
        tempTotal += tempResult[i];
    }
    
    // 오름차순
    tempResult = tempResult.sort(function (a, b) {
        return a - b;
    });
    
    // 0~5자리 일때 합계보다 같거나 클 경우
    if(tempResult.length < 6 && tempTotal >= total){ return false; }
    // 6자리 일때 합계보다 클경우 
    if((tempResult.length == 6 && tempTotal > total )||(tempResult.length == 6 && tempTotal < total)){ return false; }
    
    
    // 4 ~ 6 자리일때 검증
    if(tempResult.length > 3 && tempResult.length <= 6 ){
        if(isContinutyTest(tempResult) && isLatestNumSameTest(tempResult) && isSameTest(tempResult) ){
            
        } else {
            return false;
        }
    }
    
	// 6자리가 모두 들어가고 합계와 맞을때 홀수,짝수 검증
    if(tempResult.length == 6 && tempTotal == total){ 
        for (let i in tempResult) {
            if (tempResult[i] % 2 == 0) {
                // 짝수
                evenCount++;
            } else {
                // 홀수
                oddCount++;
            }
        }
        if (evenCount == 6 || oddCount == 6) {       
            return false;
        }
       
    }
    return true;
}

function isContinutyTest(tempList){
    // 연속된 숫자
    let count = 0;
    // 2연속된 카운트
    let count2 = 0;
    // 3연속된 카운트
    let count3 = 0;
    for(let i in tempList){
        count = 0;
        i = Number(i);
        // 현재값 + 1 이 다음 값이랑 같으면 
        for( let j = 0; j < (tempList.length - j); j++){
            if (  tempList[i + j] == ( tempList[i + j + 1] + 1 ) )  {
                count++;
            }else{
                break;
            }
        }
        if(count > 1){
            if(count > 3){
                return false;
            }else if(count == 2){
                count2++;
            }else if(count == 3){
                count3++;
            }
        }
        if(count2 > 2){
            return false;
        }else if(count3 > 1){
            return false;   
        }else {
            return true;   
        }
    }
    return false;
}


function isSameTest(tempList){
    // 2연속된 카운트
    let count2 = 0;
    // 3연속된 카운트
    let count3 = 0;
    for(let i in tempList){
        let count = 0;
        i = Number(i);
        for( let j = 0; j < (tempList.length - j); j++){
            let num1 = Math.floor(tempList[i + j] / 10);
            let num2 = Math.floor(tempList[i + j + 1] / 10);
            if(!isNaN(num1) && !isNaN(num2) && num1 == num2){
                count++
            }else{
                break;
            }
            
        }
        if(count == 3){
            return false;
        }else if(count == 2){
            count3++;
        }

    }
    if(count3 ==2){
        return false;   
    }else{
        return true;
    }
    return false;
}

function isLatestNumSameTest(tempList){
    // 2연속된 카운트
    let count2 = 0;
    // 3연속된 카운트
    let count3 = 0;
    for(let i in tempList){
        let count = 0;
        i = Number(i);
        for( let j = 0; j < (tempList.length - j); j++){
            let str1 = tempList[i + j] + "";
            let str2 = tempList[i + j + 1] + "";
            if ( Number(str1.charAt(str1.length - 1)) == Number(str2.charAt(str2.length - 1)) ) {
                count++
            }else{
                break;
            }
        }
        
       if(count > 1){
            if(count > 3){
                return false;
            }else if(count == 2){
                count2++;
            }else if(count == 3){
                count3++;
            }
        }
        if(count2 > 2){
            return false;
        }else if(count3 > 1){
            return false;   
        }else {
            return true;   
        }
    }
}

module.exports = client => {
	client.on('message', msg => {
		if (msg.content === '/로또'){
			reset()
			total = Math.floor( Math.random() * (max - min) ) + min

		    // Loop
		    let loop = 0;
		    // 너무 많이 찾지는 말자
		    while(result.length != 6 && loop++ < 1000000){
		        let lottoNum = getRandNum()
		        if(checkLotto(lottoNum)){
		            result.push(lottoNum)
		        }
		    }

		    if(result.length == 6){
		        msg.channel.send("로또 번호 [" + result + "]")
		    }else {
		        msg.channel.send("로또 번호 추첨 실패...")
		    }
		}
	});
}