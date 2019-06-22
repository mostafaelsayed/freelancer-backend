//let http = require('http');
let api = require('./routes/api')(); // we must call the function to return the router for us
let express = require('express');
let path = require('path');
let app = express();
let cors = require('cors')
let bodyParser = require('body-parser')
const port = process.env.PORT || 8000;

app.use(cors());

// http.createServer(app, function(req, res) {
// 	console.log('created');
// }).listen(8000, function(res) {
// 	console.log('listened');
// });

app.listen(port, () => {
	console.log('listening on port ' + port);
});

//console.log(path.resolve(__dirname + '/../frontend'));

// serve static files
//app.use(express.static(path.resolve(__dirname + '/../frontend')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use('/', api);