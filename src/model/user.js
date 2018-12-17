const crypto = require("crypto");
const jwt = require('jsonwebtoken');

module.exports.User = function (data) {
    if (data) {
        this.username = data.username;
        this.hash = data.hash;
        this.salt = data.salt;
    }

    this.toSQL = function() {
        return {
            username: this.username,
            hash: this.hash,
            salt: this.salt
        }
    }

    this.setPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }

    this.validatePassword = function (password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    };

    this.generateJWT = function () {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    }

    this.toAuthJSON = function () {
        return {
            _id: this._id,
            email: this.email,
            token: this.generateJWT(),
        };
    };
}
