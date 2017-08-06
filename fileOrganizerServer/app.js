var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');
var cors = require('cors');
var app = express();
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var originsWhitelist = [
  'http://localhost/test1/'    //this is my front-end url for development

];

var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    console.log("esto es origin"+origin);
    console.log("esto es isWhii"+isWhitelisted)
    callback(null, isWhitelisted);
  },
  credentials:true
}

//here is the magic
app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://10.131.137.219");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});

app.use(session({
  secret: 'secreto',
  resave: true,
  saveUnitialized: true,
  store: new MongoStore({
    url: config.db,
    autoReconnect: true
  })
}))

app.use(passport.initialize());
app.use(passport.session());

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
