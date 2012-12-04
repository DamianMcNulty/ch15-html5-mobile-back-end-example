// web.js

var express = require('express');

var app = express.createServer(express.logger());

app.get(
    '/', function(request, response) {
    
        var pg = require('pg');
           
        // Connect to the DB
        pg.connect(
            process.env.DATABASE_URL, function(err, client) {
    
                if (err) {
                    // Output error to console if can't connect
                    console.log(err);
                       
                } else {
                   
                    // Get all employees
                    client.query(
                        'SELECT id, name, email FROM employees', 
                        function(err, result) {
    
                            // Return cross-origin JSON response
                            response.writeHead(200, {
                                'Content-Type': 'application/json', 
                                'Access-Control-Allow-Origin': '*'
                            });
    
                            response.write(JSON.stringify(result));
                            response.end();
                        }
                    );
                }
            }
        )
    }
);

// Initiate web server
var port = process.env.PORT || 5000;
app.listen(
   port, function() {
       console.log("Node.js server listening on " + port);
   }
);