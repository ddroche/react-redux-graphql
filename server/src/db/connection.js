const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/nodeGraphQL')

const connection = mongoose.connection

connection.on('close', () => {
  console.log('MongoDB connection closed')
  process.exit(0)
})

module.exports = mongoose