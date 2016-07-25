
var express = require('express'),
    app = express(),
    http = require( "http" ).createServer( app ),
    io = require( "socket.io" )( http ),
    mongoose = require('mongoose'),
    exphbs  = require('express-handlebars'),
    User = {
        Twitter: require('./models/user/TwitterOath')
    };

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(require('less-middleware')(
    __dirname + 'public/style/less', // source
    { dest: __dirname + 'public/style/css' }, // options
    {}, // parser
    { compress: 'auto' } // complier
));

app.use('/public/styles', express.static(__dirname + '/assets/dist/styles'));
app.use('/public/js', express.static(__dirname + '/assets/dist/js'));
app.use('/public/img', express.static(__dirname + '/assets/images'));


var PORT = process.env.PORT || 8000;
var MONGOOSE_PORT =
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL  || 
  'mongodb://localhost:27017;';

// CONFIG
mongoose.connect(MONGOOSE_PORT, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + MONGOOSE_PORT + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + MONGOOSE_PORT);
  }
});


//routes
app.get('/', function (req, res) { 
    res.render('home'); 
});

app.get("/requesttoken", function(req, res) {
    User.Twitter(req, res);
});

http.listen(PORT, function(){
    console.log("Listening on 127.0.0.1/8000");
});