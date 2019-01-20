const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Function to validate if the date instance is valid
function isValidDate(d) {
  return d instanceof Date && isFinite(d)
}

app.get("/api/timestamp/:date_string?/", function(req, res) {
  
  let date = req.params.date_string ? new Date( req.params.date_string ) : new Date();

  res.json({ 
    "unix" : !isValidDate( date ) ? null : date.getTime(),
    "utc" : !isValidDate( date ) ? "Invalid date" : date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});