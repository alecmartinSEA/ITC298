var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var records = require('./lib/records');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

//for views
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//main
app.get('/', function(req,res) {


  
   res.render('master', {records:records.getAll()}); 


  
});

app.get('/detail/:title', function(req,res){
  res.type('text.html');
  var found = records.get(req.params.title);
  if(!found) {
    found = {title: req.params.title,};
  }
  res.render('detail', {found: found});
});


app.post('/get', function(req,res) {
  
  var found = records.get(req.body.title); 
  res.render('detail', {found: found});
  
});




app.get('/delete', function(req,res, found) {
  console.log(req.query.title)
  var found = records.delete(req.query.title);
  console.log(found)
  res.render('delete', {title: req.query.title, found: found.total} );

  
});

app.get('/about', function(req,res) {
  res.type('text/plain');
  res.send('About Groovy vinyls');
});




//errors should be last or else will fail
app.use(function(req,res) {
  res.type("text/plain");
  res.status(404);
  res.send('404 - Not FOUND');
});

app.use(function(req,res) {
  res.type("text/plain");
  res.status(505);
  res.send('505 - Server Error');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' ; press CTRL-c to terminate');
});






       