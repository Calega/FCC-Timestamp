// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string/", function(req, res) {
  
  var unix;
  var utc;
  var dateString = req.params.date_string;
  
  function isValidDate(d) {
    return d instanceof Date && isFinite(d)
  }
  
  if ( !isValidDate( new Date( dateString ) ) ) {
      unix = null;
      utc = "Invalid date";
  } else {
      unix = new Date( dateString ).getTime();
      utc = new Date( dateString ).toUTCString();
  }
  
  if (!dateString) {
    unix = Date.now().getTime();
    utc = Date.now().toUTCString();
  } 
  
  res.json({ 
    "unix" : unix,
    "utc" : utc
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});