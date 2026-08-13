import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => (
  axios
    .get(baseUrl)
    .then((resp) => resp.data)
)

const update = (id, newObj) => (
  axios
    .put(`${baseUrl}/${id}`, newObj)
    .then((resp) => resp.data)
)

const create = (obj) => (
  axios
    .post(baseUrl, obj)
    .then((resp) => resp.data)
)

const del = (id) => (
  axios
    .delete(`${baseUrl}/${id}`)
    .then((resp) => resp.data)
)

export default { getAll, update, create, del }
