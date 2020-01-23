//const api = require('./routes')(); // we must call the function to return the router for us
const userApi = require('./routes/user')();
const projectApi = require('./routes/project')();
const express = require('express');
//const expressSession = require('express-session');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000;


const verifyToken = require('./helpers/authentication-helper').verifyToken;

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
	console.log('req.url : ', req.url);
	if (req.url != '/signup' && req.url != '/login') {
		verifyToken(req.headers['authorization']).then((userId) => {
			console.log('user id after verify : ', userId);
			res.locals.userId = userId;

			return next();

		}).catch((err) => {
			return res.status(403).send({
				message: 'Failed to authenticate token....'
			});
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