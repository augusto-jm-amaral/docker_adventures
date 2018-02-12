const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI

console.log(`${MONGO_URI}`)

mongoose.connect(`${MONGO_URI}`)

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected on app termination')
    process.exit(0)
  })
})

const Cat = require('./Cat')

module.exports = {
  Cat: mongoose.model('Cat', Cat),
}
