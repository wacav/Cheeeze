module.exports = (client) => {
	client.on('error', e => {
		console.log(e);
	})
}