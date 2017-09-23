var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var target = require('./models/target');
var mongoose = require('mongoose');

// MongoDB연동
mongoose.connect('mongodb://localhost:27017/GlobalSW');
var db = mongoose.connection;
db.on('error', function(){
  console.log('Connection Faild!!');
});
db.once('open', function(){
  console.log('MongoDB Connected!!');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('Html'));

var router = require('./routes')(app, target);

var port = process.env.PORT || 80;
var server = app.listen(port, function(){
  console.log("Server is running...");
  console.log("10.80.161.30");
});
