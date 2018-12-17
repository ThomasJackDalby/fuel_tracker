const bunyan = require("bunyan");

function LoggerConfig(name) {
	this.name = name,
	this.level = "debug",
		this.streams = [{
			type: "rotating-file",
			path: "./logs/log.json",
		}, {
			stream: process.stdout
		}]
};
module.exports.createLogger = function (name) {
	let config = new LoggerConfig(name);
	return bunyan.createLogger(config);
};
module.exports.requestLogger = function (logger) {
	return (req, res, next) => {
		logger.info("[" + req.ip + "] for [" + req.originalUrl + "]");
		next();
	}
}