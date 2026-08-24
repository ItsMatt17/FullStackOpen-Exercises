require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models.js')
morgan.token('body', (req, _) => JSON.stringify(req.body))
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/info', (_, resp) => {
  Person.find({}).then((res) => {
    resp.send(
      `<div>
        <p>Phonebook has info for ${res.length} people</p>
        <p>${new Date().toString()}</p>
      </div>`
    )
  }).catch((err) => {
    console.error(err)
    resp.send(
      `<div>
        <p> An error occurred </p> 
      </div>`
    )
  })
})

app.get('/api/persons', (_, resp, next) => {
  Person.find({})
    .then((res) => resp.json(res))
    .catch(next)
})

app.get('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((res) => {
      if (res) return resp.json(res.toJSON())
      resp.status(404)
        .json({ error: `Could not find user with id of ${id}.` })
    }).catch(next)

})

app.delete('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then((_) => resp.status(204).end())
    .catch(next)
})

app.post('/api/persons', (req, resp, next) => {
  const body = req.body

  if ((isEmpty(body))
    || (typeof body?.name !== 'string')
    || (typeof body?.number !== 'string')
  ) return resp.status(400).json({ error: 'Invalid request body.' })


  const { name, number } = body

  // TODO: Make sure comparison does not depend on capitalization
  Person.exists({ name: name })
    .then((res) => {
      if (res !== null) return resp.status(403)
        .json({ error: `Phonebook already contains person named: ${name}` })

      new Person({ name, number }).save()
        .then((res) => resp.json(res))
        .catch(next)
    })
})


app.put('/api/persons/:id', (req, resp, next) => {
  const body = req.body
  const id = req.params.id

  const { name, number } = body
  if ((!name && !number)
    || (typeof name !== 'string' && name)
    || (typeof number !== 'string' && number)
  ) return resp.status(400).json({ error: 'bad request body.' })


  Person.findById(id).then((res) => {

    if (res === null) return resp.status(404).end()

    res.name = name || res.name
    res.number = number || res.number

    return res.save().then((update) => resp.json(update))
  }).catch(next)

})


const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


function isEmpty(obj) {
  return obj === undefined || Object.keys(obj).length === 0
}

function errorHandler(error, req, resp, next) {
  console.error(error)

  if (error.name === 'CastError') return resp.status(400)
    .json({ error: 'mismatch id type.' })

  next(error)
}
