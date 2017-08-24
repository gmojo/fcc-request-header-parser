// server.js - where your node app starts
// init project
var express = require('express');
var app = express();

//set static
app.use(express.static('public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//route for homepage
app.get('/', function(request, response) {
  response.render('index');
});

//route for homepage
app.get('/api/whoami', function(req, res) { 
  var software = req.get('User-Agent')
  var parsedHeader = {
    ipaddress: req.get('x-forwarded-for').split(',')[0],
    language: req.get('Accept-Language').split(',')[0],
    software: software.substring(software.indexOf('(')+1, software.indexOf(')'))
  }
  
  res.send(JSON.stringify(parsedHeader));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
