let api = require('./routes/api')(); // we must call the function to return the router for us
let userApi = require('./routes/user')();
let projectApi = require('./routes/project')();
let express = require('express');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser')
const port = process.env.PORT || 8000;

// global variables
global.utilOptions = { depth: null };


// enable cors for all origins
app.use(cors());

// http.createServer(app, function(req, res) {
// 	console.log('created');
// }).listen(8000, function(res) {
// 	console.log('listened');
// });

app.listen(port, () => {
	console.log('listening on port ' + port);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use('/', api);
app.use('/', userApi);
app.use('/', projectApi);