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


  
   res.sendFile(__dirname + '/public/home.html'); 


  /*res.type('text/plain');
  res.send('Groovy vinyls'); */
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






       /*
        case '/search' :
          let found = records.get(params.title);
          if (found) {
          console.log(records.get(params.title))
          res.writeHead(200, {'content-Type' : 'text/plain'});
          res.end('Results for ' + params.title + "\n" + JSON.stringify(found)); 
          }
          else {
          res.writeHead(200, {'content-Type' : 'text/plain'});
          res.end('No results'); 
          }          
          break;
          /*remove the requested item from your list, if found, and display the new total # 
          of items. For example "[BOOK TITLE] removed. N total books" 
          case '/delete' :
          console.log(records.getAll()); 
          //delete the record with param of title
          let result = records.delete(params.title);
          console.log(result.total);
          res.writeHead(200, {'content-Type' : 'text/plain'});
          //you deleted the name 'title' your new length returns records.length?
          res.end('you deleted ' + params.title + "\n" + 'new length ' + result.total);

          console.log(records.getAll());       
          break;



        default:
          serveStaticFile(res, '/public/404.html', 'text/html',404);
          break;
      }
    }).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....'); */