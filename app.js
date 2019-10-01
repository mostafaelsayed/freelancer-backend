let api = require('./routes/api')(); // we must call the function to return the router for us
let userApi = require('./routes/user')();
let projectApi = require('./routes/project')();
let express = require('express');
let expressSession = require('express-session');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser')
const port = process.env.PORT || 8000;
let jwt = require("jsonwebtoken");
let util = require('util');
// global variables
global.utilOptions = { depth: null };

// enable cors for all origins
app.use(cors());

// use express-session
app.use(expressSession({
	saveUninitialized: true,
	resave: true,
	secret: 'freelancing-app'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// middleware for api requests
app.use('/api', function(req, res, next) {
	console.log('req.url : ', req.url);
	console.log('req.session.user : ', req.session.user);
	var token = req.headers['authorization'];
	console.log('token : ', token);
	// if (req.url != '/login' && req.url != '/signup' && req.session.user === undefined) {
	// 	res.send('not authenticated');
	// }
	// else {
	// 	next();
	// }
	jwt.verify(token, '987fdgo1z09qjla0934lksdp0', function(err, decoded) {
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
				if (!req.session.user) {
					req.session.user = {};
				}

				req.session.user.email = decoded.email;

				return next();
			}
		}
	})
});

app.use('/', api);
app.use('/', userApi);
app.use('/', projectApi);

app.listen(port, () => {
	console.log('listening on port ' + port);
});