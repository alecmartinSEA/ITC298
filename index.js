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
        /*case '/add' :
          console.log(records.getAll()); 
          let grab = records.addRecords(params.title);
          res.writeHead(200, {'content-Type' : 'text/plain'});
          res.end('You Added ' + params.title +  JSON.stringify(grab));
          console.log(records.getAll()); 
          break;
        */
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
          let len = records.delete(params.title);
          res.writeHead(200, {'content-Type' : 'text/plain'});
          res.end('you deleted ' + params.title + "\n" + 'new length ' + records.length + records.count);
          console.log(records.getAll());       
          break;



        default:
          serveStaticFile(res, '/public/404.html', 'text/html',404);
          break;
      }
    }).listen(3000);
    console.log('Server started on localhost:3000; press Ctrl-C to terminate....');