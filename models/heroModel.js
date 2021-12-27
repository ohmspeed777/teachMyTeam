const mongoose = require('mongoose');

const hero = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hero must have a name'],
  },
  atk: {
    type: Number,
    min: 100,
  },
  speed: {
    type: Number,
    max: 555,
  },
  role: {
    type: [String],
  },
  def: {
    type: Number,
    default: 100
  },
  skill: {
    passive: {
      type: String
    },
    ultimate: {
      type: String
    },
    first: String,
    second: String
  },
  createDate: {
    type: Date,
    default: new Date()
  }
});

const Hero = mongoose.model('hero', hero)

module.exports = Hero
