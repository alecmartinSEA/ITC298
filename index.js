var http = require('http');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var path = require('path');
var records = require('./lib/records');
var Record = require("./models/Record");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use((err, req, res, next) => {
  console.log(err)
})

//for views
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//main
//Main w/ database notation 

app.get('/', (req,res) => {
    Record.find((err,records) => {
      console.log(err)
      console.log(records)
        if (err) return next(err);
        res.render('master', {records: records});    
    });
});




/*app.get('/detail/:title', function(req,res){
  res.type('text.html');
  
  var found = records.get(req.params.title);
  if(!found) {
    found = {title: req.params.title,};
  }
  res.render('detail', {found: found, title: req.params.title});
});*/







app.post('/get', (req,res, next) => {
    Record.findOne({ title:req.body.title }, (err, record) => {

        if (err) return next(err);
        res.type('text/html');
        res.render('detail', {found: record, title:req.body.title }); 
        console.log(found);
    });
});

app.get('/get', (req,res) => {
   Record.findOne ({ title:req.query.title}, (err, record) => {
       if (err) return next(err); 
       res.type('text/html');
       res.render('detail',  {found: record, title:req.query.title }); 
   });  
});


app.get('/delete', (req,res) => {
  Record.remove({title:req.query.title}, (err, result) => {
  if (err) return next(err);
 let deleted = result.result.n !== 0;
  Record.count((err, total) =>{
    res.type('text/html');
    res.render('delete', {title: req.query.title, deleted: result.result.n !== 0, found: total });
    console.log(result);
    console.log(total);
  });
  });    
});
    


  

app.get('/about', function(req,res) {
  res.type('text/plain');
  res.send('About Groovy vinyls');
});

//apis 
app.get('/api/v1/record/:title', (req,res,next) => {
  let title =req.params.title;
  console.log(title);
  Record.findOne({title: title}, (err, result) => {
    if (err || !result) return next(err);
    res.json( result );
  });
});

app.get('/api/v1/records', (req,res,next) => {
  Record.find((err,result) => {
    if (err || !result) return next(err);
    res.json(result);
  });
});

app.get('/api/v1/delete/:title', (req,res,next) => {
  Record.remove({"title":req.params.title}, (err,result) => {
    if (err) return next(err);
    res.json({"deleted": result.result.n});
  });
});

app.get('/api/v1/add/:title/:artist/:genre', (req,res,next) => {
  let title =req.params.title;
  Record.update({title: title}, {title:title, artist: req.params.artist, genre: req.params.genre}, {upsert: true}, (err, result) => {
    if (err) return next(err);
    res.json({updated: result.nModified});
  });
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






       