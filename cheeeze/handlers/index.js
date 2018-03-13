const hello = require('./hello')
const error = require('./error')
const lotto = require('./lotto')
const magicSora = require('./magicSora')
const weekLoading = require('./weekLoading')
const aqi = require('./aqi')

module.exports = function (client) {
	//error handler
	error(client)	
    hello(client)
    /** message events **/
    lotto(client) 	
    magicSora(client)
    weekLoading(client)
    aqi(client)
}