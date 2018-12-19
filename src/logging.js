const bunyan = require("bunyan");
const fs = require('fs');
const loggingFolderPath = "./logs";
if (!fs.existsSync(loggingFolderPath)){
    fs.mkdirSync(loggingFolderPath);
}

function LoggerConfig(name) {
	this.name = name,
	this.level = "debug",
		this.streams = [{
			type: "rotating-file",
			path: "./logs/log",
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
		logger.info("Request [" + req.ip + "] for [" + req.originalUrl + "]");
		next();
	}
}