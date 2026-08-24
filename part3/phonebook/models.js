const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then((_) => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error(`Exception occurred attempting to conntect to MongoDB ${err}`))


const personSchema = new mongoose.Schema({ name: String, number: String })

personSchema.set('toJSON', {
  transform: (_, obj) => {
    obj.id = obj._id
    delete obj._id
    delete obj.__v
  }
})

module.exports = mongoose.model(`Person`, personSchema)
