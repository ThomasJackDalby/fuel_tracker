const mysql = require('mysql');
const sqlgen = new (require('sql-generator'))();
const logger = require("./../logging.js").createLogger("database");

var connection = null;

async function executeQuery(sqlQuery) {
    return new Promise((resolve, reject) => {
        logger.info("Executing SQL: " + sqlQuery);
        connection.query(sqlQuery, (err, res) => {
            if (err) reject(err);
            logger.debug("resolved");
            console.log(res);
            resolve(res);
        });
    });
}
async function loadSecretsFile() {
    return new Promise((resolve, reject) => {
        try {
            let secrets = require("./../../secrets.json");
            resolve(secrets.database);
        }
        catch (err) {
            reject(err);
        }
    });
}
async function readEnvironmentValues() {
    new Promise((resolve, reject) => {
        try {
            let secrets = {
                host: process.env.host,
                user: process.env.user,
                password: process.env.password,
                database: process.env.database
            }
            resolve(secrets);
        }
        catch (err) {
            reject(err);
        }
    });
}
async function initialise() {
    return loadSecretsFile()
        .catch(err => readEnvironmentValues())
        .catch()
        .then(config => connection = mysql.createConnection(config));
}
async function getTableItems(tableName) {
    return executeQuery("SELECT * FROM " + tableName)
        .catch(err => logger.error(err))
}
async function getTableItem(tableName, itemId) {
    return executeQuery("SELECT * FROM " + tableName + " WHERE id=" + itemId);
}

function errorHandler(err) {
    err => logger.error(err);
}

module.exports = {
    initialise: initialise,
    getTableItems: getTableItems,
    getTableItem: getTableItem,
    executeQuery: executeQuery,
}