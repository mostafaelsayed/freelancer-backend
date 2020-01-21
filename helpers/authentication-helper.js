const jwt = require('jsonwebtoken');
const secrets = require('../secrets');

module.exports = {
    getToken(user) {
        return jwt.sign({email: user.email, id: user.id}, secrets.tokenSecret, {expiresIn: 24*60*60 });
    }
}