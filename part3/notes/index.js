const express = require("express")
const app = express()
app.use(express.json())


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

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

