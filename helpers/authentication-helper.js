const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const util = require('util');
const utilOptions = { depth: null };

module.exports = {
    getToken(user) {
        return jwt.sign({email: user.email, id: user.id, role: user.role}, secrets.tokenSecret, { expiresIn: 24*60*60 });
    },

    verifyToken(token) {
		console.log('token : ', token);
        
        return new Promise((resolve, reject) => {
            jwt.verify(token, secrets.tokenSecret, function(err, decoded) {
                if (err) {
                    console.log("Failed to authenticate token..");

                    reject(false);
                }
                else {
                    console.log('success verify token : ', util.inspect(decoded, utilOptions));
                    resolve(decoded);
                }
            });
        });
            
    }
}