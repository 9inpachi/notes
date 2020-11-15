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
  sports: [mongoose.Types.ObjectId]
});

const Sport = mongoose.model('Sport', sportSchema, 'sports');
const Player = mongoose.model('Player', playerSchema, 'players');

module.exports = {
  Sport,
  Player
};
