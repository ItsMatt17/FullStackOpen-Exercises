const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.get("/api/info", (_, resp) => {
  resp.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
    </div>`
  )
})

app.get("/api/persons", (_, resp) => resp.json(persons))

app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)

  if (person) return resp.json(person)

  resp.status(404)
  resp.json({ error: `Could not find user with id of ${id}` })
})

app.delete("/api/persons/:id", (req, resp) => {
  console.log("here")
  id = req.params.id
  persons = persons.filter((p) => p.id !== id)

  resp.status(204).end()
})

app.post("/api/persons", (req, resp) => {

  const body = req.body

  if ((isEmpty(body))
    || (typeof body?.name !== "string")
    || (typeof body?.number !== "string")
  ) return resp.status(400).json({ error: "Invalid request body." })


  const { name, number } = body

  if (persons.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
    return resp.status(400)
      .json({ error: `Phonebook already contains person named: ${name}` })
  }

  const person = {
    id: generateId(),
    name,
    number
  }

  if (persons.find((p) => p.id === person.id)) {
    console.log(`User ID of ${person.id} matched with another person!`)
  }

  persons.push(person)
  resp.json(person)
})

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))



function generateId() {
  return new String(Math.floor(1000 * Math.random()))
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}
