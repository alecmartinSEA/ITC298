var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var path = require('path');
var records = require('./lib/records');
var Record = require("./models/Record");
app.use(bodyParser.json());
app.use('/api', require("cors")());

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
      
        if (err) return next(err);
        res.render('master', {records: JSON.stringify(records)});    
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


app.get('/get', (req,res,next) => {
   Record.findOne({ title:req.query.title}, (err, record) => {
       if (err) return next(err); 
       res.type('text/html');
       res.render('detail',  {found: record, title:req.query.title }); 
   });  
});

app.post('/get', (req,res, next) => {
    Record.findOne({ title:req.body.title }, (err, record) => {
      if (err) return next(err);
        res.type('text/html');
        res.render('detail', {found: record, title:req.body.title }); 
        
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
  
  Record.findOne({title: title}, (err, result) => {
    if (err || !result) return next(err);
       
      res.json(result);


  });
});

app.get('/api/v1/records', (req,res,next) => {

  Record.find((err,result) => {
    if (err || !result) return next(err);
   
    res.json(result);
  });
});



app.get('/api/v1/add/:title/:artist/:genre', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    Record.update({ title: title}, {title:title, artist: req.params.artist, genre: req.params.genre }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
      });
});

//api post add
app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let record = new Record({title:req.body.title,artist:req.body.artist,genre:req.body.genre});
        record.save((err,newRecord) => {
            if (err) return next(err);
            console.log(newRecord)
            res.json({updated: 0, _id: newRecord._id});
        });
    } else { // update existing document
        Record.updateOne({ _id: req.body._id}, {title:req.body.title, artist: req.body.artist, genre: req.body.genre }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});




app.get('/api/v1/delete/:id', (req,res, next) => {
    Record.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
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






       