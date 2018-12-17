const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const datastore = require('./data/datastore.js');
const logger = require("./logging.js").createLogger("auth");
const jwt = require('express-jwt');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        logger.info("Creating local strategy.");
        await datastore.initialise();
        let user = await datastore.getUserFromName(username);
        console.log("THE USER IS");
        console.log(user);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (!user.validatePassword(password)) return done(null, false, { message: 'Incorrect password.' });
        console.log("here?")
        return done(null, user);
    }
))

const getTokenFromHeaders = (req) => {
    console.log(req)
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;