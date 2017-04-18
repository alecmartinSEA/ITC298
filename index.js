var http = require('http'), fs = require('fs'), qs= require("querystring"), records = require('./lib/records');  


function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode= 200;
      fs.readFile(__dirname + path, function(err,data) {
        if(err) {
                  res.writeHead(500, {'Content-Type': 'text/plain' });
                  res.end('500- Internal Error');
      } else {
          res.writeHead(responseCode, {'Content-Type' : contentType});
          res.end(data);
      
        }

      });
    }
    
    http.createServer(function(req,res){
      var url = req.url.split("?")
      //console.log(params)
      var params =  qs.parse(url[1]); 
      var path = url[0].toLowerCase(); 
      switch(path) {
        case '':
                serveStaticFile(res, '/public/home.html', 'text/html');
                break;
        case '/about' :
                      serveStaticFile(res, '/public/about.html', 'text/html');
                      break;
       
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
          of items. For example "[BOOK TITLE] removed. N total books"*/
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
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');