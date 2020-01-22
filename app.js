//const api = require('./routes')(); // we must call the function to return the router for us
const userApi = require('./routes/user')();
const projectApi = require('./routes/project')();
const express = require('express');
const tokenSecret = require('./config/secrets').tokenSecret;
//const expressSession = require('express-session');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000;
const jwt = require("jsonwebtoken");
const util = require('util');
// global variables
const utilOptions = { depth: null };

// enable cors for all origins
app.use(cors({credentials: true, origin: true}));

// // use express-session
// app.use(expressSession({
// 	saveUninitialized: true,
// 	resave: true,
// 	secret: 'freelancing-app'
// }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// middleware for api requests
app.use('/api', function(req, res, next) {
	if (req.url != '/signup' && req.url != '/login') {
		console.log('req.url : ', req.url);
		//console.log('req.session.user : ', req.session.user);
		const token = req.headers['authorization'];

		console.log('token : ', token);
		
		jwt.verify(token, tokenSecret, function(err, decoded) {
			if (err) {
				console.log("Failed to authenticate token..");

				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token....'
				});
			}
			else {
				console.log('verified token : ', util.inspect(decoded, utilOptions));

				if (decoded && decoded.email) {
					// Set user UID in the request
					// In a real application the user profile should be retrieved from the persistent storage here
					// req.user = {
					// 	email: decoded.email
					// };
					// if (!req.session.user) {
					// 	req.session.user = {};
					// }

					// req.session.user.email = decoded.email;
					res.locals.userId = decoded.id;

					return next();
				}
			}
		});
	}

	else {
		return next();
	}
});

app.use('/api', [userApi, projectApi]);

app.listen(port, () => {
	console.log('listening on port ' + port);
});