const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log("Invalid number of args")
  process.exit(1)
}

let [, , password, ...data] = process.argv
password = encodeURI(password)
const URL = `mongodb+srv://mattspycrafter_db_user:${password}@fullstackopen.hkz5ibx.mongodb.net/Phonebook?appName=FullStackOpen`

mongoose.connect(URL, { family: 4 })

const create = data.length >= 2;

const personSchema = new mongoose.Schema({ name: String, number: String })
const Person = mongoose.model("Person", personSchema)

if (!create) {
  Person.find({})
    .then((resp) => {
      resp.forEach(doc => { console.log(doc) });
      mongoose.connection.close()
    })

} else {
  const [name, number] = data
  const person = new Person({ name, number })

  person.save()
    .then((resp) => {
      console.log(`Errors: ${resp.errors}`)
      mongoose.connection.close()
    });
}
