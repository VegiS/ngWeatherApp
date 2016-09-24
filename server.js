// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
    

// set our port
var port = process.env.PORT || 80; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));    

// routes ==================================================
//require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080

app.get('/api/ip', function(req, res) {
            // use mongoose to get all nerds in the database        
           require('dns').lookup(require('os').hostname(), function (err, add, fam) {
               // var ip = "{'ip':'"+ add +"'}";
                console.log('return IP address: ' + add);
                res.json(add); 
            })
        });


app.listen(port,function() {
        console.log('Server listening on port ' + port);
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
               // var ip = "{'ip':'"+ add +"'}";
                console.log('return IP address: ' + add);
            })
        });               



// expose app           
exports = module.exports = app;  