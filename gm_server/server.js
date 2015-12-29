var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/static', express.static('routes/img'));

// Routes to get wormie images (now also creates left and right heart pieces)
var wormieRouter = express.Router();
app.use('/wormie', wormieRouter);
require('./routes/wormieRoutes.js')(wormieRouter);

// Routes to get wormie heart images
var heartRouter = express.Router();
app.use('/heart', heartRouter);
require('./routes/heartRoutes.js')(heartRouter);

app.listen('7878', function() {
  console.log('listening on 7878');
});

module.exports = app;

