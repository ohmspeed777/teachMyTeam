const { number } = require('joi');
const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   hero: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'hero',
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'user',
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   amount: {
//     type: Number,
//     min: 1,
//     required: true,
//   },
//   createAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   paid: {
//     type: Boolean,
//     default: false
//   }
// });

const orderSchema = new mongoose.Schema({
  heroes: [
    {
      hero: {
        type: mongoose.Schema.ObjectId,
        ref: 'hero',
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        min: 1,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
});
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
