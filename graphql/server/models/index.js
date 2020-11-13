const mongoose = require('mongoose');
const { Schema } = mongoose;

const sportSchema = new Schema({
  name: String,
  type: String,
  rules: [String]
});
const playerSchema = new Schema({
  name: String,
  gender: String,
  sportId: String
});

const sportModel = mongoose.model('Sport', sportSchema);
const playerModel = mongoose.model('Player', playerSchema);

module.exports = {
  sportModel,
  playerModel
};
