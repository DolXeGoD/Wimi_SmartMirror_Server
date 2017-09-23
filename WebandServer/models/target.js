var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var targetPerson = mongoose.Schema({
  name: String,
  age: Number,
  crime: String,
  info: JSON,
  location: String,
  date: String,
  imagePath: String,
  newImagePath: String
});

module.exports = mongoose.model('targetperson', targetPerson);
