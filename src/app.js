const express = require("express");
const bodyParser = require('body-parser');
const passport = require("passport");
const logging = require("./logging.js");
const datastore = require("./data/datastore.js");
const auth = require('./auth.js');
const router = express.Router()
const logger = logging.createLogger("app");
const cookieParser = require('cookie-parser')
const app = express();

// Configure app
app.use(logging.requestLogger(logger));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', express.static('public'));
app.use(passport.initialize());
app.use('/api', router);
app.use(cookieParser())

logger.info("Starting server");

router.get("/refuels", auth.optional, (req, res) => {
	  getItems(req, res, datastore.getRefuels);
});
router.post("/refuels", auth.optional, async (req, res) => {
    try {
        let refuel = {
            milage: parseInt(req.body.milage),
            pricePerLitre: parseFloat(req.body.ppl),
            totalCost: parseFloat(req.body.cost),
            location: req.body.location,
            date: req.body.date,
        }
        refuel.amount = Math.round(refuel.totalCost / refuel.pricePerLitre, 3);
        logger.info("refueled")
        console.log(refuel)
        datastore.createRefuel(refuel);
        res.redirect("/");
    }
    catch (err) {
        logger.error(err);
    }
});

router.post('/login', auth.optional, (req, res, next) => {
    const { body } = req;
    if (!body.username) {
        return res.sendStatus(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!body.password) {
        return res.sendStatus(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) return next(err);
        console.log("INFO")
        console.log(info)
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            return res.json({ user: user.toAuthJSON() });
        }
        return res.sendStatus(400).info;
    })(req, res, next);
});

function getItems(req, res, getter) {
    return datastore.initialise()
        .then(() => getter())
        .then(data => res.json(data))
        .catch(err => res.json({ error: err.stack }));
}
module.exports = app;