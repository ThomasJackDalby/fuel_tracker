const database = require("./database.js");
const generateInsertQuery = require('mysql-insert-multiple');
const logger = require("./../logging.js").createLogger("datastore");
const User = require("./../model/user.js").User;

async function initialise() {
    return database.initialise();
}

async function getRefuels() {
    logger.debug("Getting refuels");
    return database.getTableItems("Refuels")
        .then(data => {
            logger.debug("Got data "+data.length);
            return data;
        })
        .catch(err => logger.error(err));
}

async function createRefuel(refuel) {
    let sql = generateInsertQuery({table:"Refuels", data: [refuel], maxRow: 1}).next();
    return database.executeQuery(sql);
}

async function getUserFromName(name) {
    logger.info("Getting user from name ["+name+"]");
    let users = await database.executeQuery("SELECT * FROM Users WHERE username='"+name+"'");
    if (users.length == 0) return null;
    return new User(users[0]);
}

async function createUser(user) {
    let sql = generateInsertQuery({table:"Users", data: [user], maxRow: 1}).next();
    return database.executeQuery(sql);
}

module.exports = {
    initialise: initialise,
    getRefuels: getRefuels,
    createRefuel: createRefuel,
    createUser: createUser,
    getUserFromName: getUserFromName,
};