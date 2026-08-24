require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./models.js")
morgan.token("body", (req, _) => JSON.stringify(req.body))
const app = express()

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


app.get("/api/info", (_, resp) => {
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

app.get("/api/persons", (_, resp) => {
  Person.find({})
    .then((res) => resp.json(res))
    .catch((err) => resp.json({ error: err.toString() }))
})

app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id
  Person.findById(id)
    .then((res) => {
      if (res) return resp.json(res.toJSON())

      resp.status(404)
        .json({ error: `Could not find user with id of ${id}.` })
    })
    .catch((err) => {
      if (err instanceof CastError) return resp.status(400)
        .json({ error: `Invalid id type.` })

      console.error(err)
      resp.status(500)
        .json({ error: `An error occurred whilst fetching that person.` })
    })

})

app.delete("/api/persons/:id", (req, resp) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then((_) => resp.status(204).end())
    .catch((err) => {
      console.error(err)
      resp.status(500).end()
    })
})

app.post("/api/persons", (req, resp) => {

  const body = req.body

  if ((isEmpty(body))
    || (typeof body?.name !== "string")
    || (typeof body?.number !== "string")
  ) return resp.status(400).json({ error: "Invalid request body." })


  const { name, number } = body

  // TODO: Make sure comparison does not depend on capitalization
  Person.exists({ name: name })
    .then((res) => {
      if (res !== null) return resp.status(403)
        .json({ error: `Phonebook already contains person named: ${name}` })

      new Person({ name, number }).save()
        .then((res) => resp.json(res))
        .catch((err) => resp.status(500).json({ error: err.toString() }))
    })

})

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


function isEmpty(obj) {
  return Object.keys(obj).length === 0
}
