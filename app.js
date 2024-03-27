const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
// const mongoose  = require('mongoose');
const router = require('./routes/index.js');
// let fs = require('fs');
const keys = require('./config/config.js');
const cors = require('cors');
const session  = require('cookie-session');
const socketHelper = require("./helpers/socket.helper.js");
const app = express();
require("./config/db.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '500mb',extended:true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(({ 
	name: 'session',
    keys: [keys.session.cookieKey,keys.session.cookieKey],
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours 
})));

app.use('/v1', router);
let server = http.createServer(app);
const io = require("socket.io")(server, {
  serveClient: false,
  pingTimeout: 6000000,
  pingInterval: 30000,
  cookie: false,
});
// socketHelper.SocketInit(io);

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data); // Broadcasting message to all clients
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('404', {title: " Sorry, page not found"});
});

// mongoose.connect(keys.mongodb.dbstring,{ useNewUrlParser: true },()=>{
//   console.log("Connected to mongoDB");
// });

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
