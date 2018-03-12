const hello = function(client){
    client.on("message", (msg) => {
        if(msg.content == '.아빠'){
            msg.reply("아빠는 와카님입니다.");
        }
    })
}

module.exports = hello;