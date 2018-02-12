const { Schema } = require('mongoose')

const Cat = new Schema({
  name: String,
  color: String,
  age: Number,
  weight: Number,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
})

module.exports = Cat
