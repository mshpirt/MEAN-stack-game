// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path		   = require('path');
var favicon 	   = require('serve-favicon');
var logger 		   = require('morgan');
var session 	   = require('express-session');
var MongoStore 	   = require('connect-mongostore')(session);
var cookieParser   = require('cookie-parser');

// express route definitions
var playerfetcher = require('./routes/playerfetcher');
var playerfetcherRandom = require('./routes/playerfetcherRandom');
var load = require('./routes/load');
var newgame = require('./routes/newgame');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// use a favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// logger
app.use(logger('dev'));

//parse cookies
app.use(cookieParser());

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
app.use(express.static(__dirname + '/public')); 

// store session in mongodb
var conf = {
  db: {
    db: 'login',
    host: 'ds035683.mongolab.com',
    port: 35683,  // optional, default: 27017
    username: 'dipwood', // optional
    password: 'apptest123', // optional
    collection: 'users' // optional, default: sessions
  },
  secret: '076ee61d63aa10a125ea872411e433b9'
};

app.use(session(
  {
  secret: 'secret1',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  store: new MongoStore(conf.db),
  /*
  store: new MongoStore(
    {
    db: 'login',
    host: '127.0.0.1',
    port: '27017',
    autoRemove: 'disabled',
    collection: 'users',
    w:1,
    }), 
  */
  name: 'managersession',
  // unset: 'destroy',
  cookie: { maxAge: 2629746000 }
  }));

// error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// routes ==================================================
// require('./app/routes')(app); // configure our routes
app.use('/load', load);
app.use('/newgame', newgame);
app.use('/playerfetcher', playerfetcher);
app.use('/playerfetcherRandom', playerfetcherRandom);
app.get('/*', function(req, res){
    // res.render('index'); //
    res.sendFile(__dirname + '/public/index.html');
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
module.exports = app;                         
