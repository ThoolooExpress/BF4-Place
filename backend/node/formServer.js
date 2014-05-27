var multiparty = require('multiparty'),
    http = require('http'),
    util = require('util'),
    r = require('rethinkdb');
// Database Connection
var connection = null;
    r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
        try {
            if (err) throw err;
            connection = conn;
            if (connection)
                console.log('Database connection successful');
            else
                throw 'Connection Successful but Invalid';
        } catch(err) {
            console.log(err);
            console.log('Please ensure database is availible and restart.');
        }
    });
var server = http.createServer(function(req, res) {
    console.log('Request recieved');
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Response Logged');
        try {
            r.table('responses').insert(fields).run(connection, function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            });
        } catch(err) {
            console.log(err);
            res.writeHead(500, {'content-type': 'text/html'});
        res.end('<html><head><title>500: ERROR</title></head><body><b>500: INTERNAL SERVER ERROR</b></body></html>');
        }
    });
            
});
if(!server) throw 'Server not created!';
try {
    var port = 8000;
    server.listen(port);
} catch(err) {
    throw err+'\nHINT: Server unable to listen on port '+port+', this is probably because\n another program is using it.';
}

server.on('listening', function() {
    console.log('Listening asynchronolsey on port'+port+'\n');
});