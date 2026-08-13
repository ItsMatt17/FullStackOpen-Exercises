import Filter from './Filter'
import Contacts from "./Contacts.jsx"
import ContactForm from "./ContactForm.jsx"
import { useEffect, useState } from 'react'
import contactService from './services/contactService.js'


const App = () => {
  const [contacts, setContacts] = useState([])
  const [newContactName, setNewContactName] = useState('')
  const [newContactNumber, setNewContactNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then((c) => setContacts(c))
  }, [])


  const createContact = (e) => {
    e.preventDefault()

    if (!contacts.every((contact) => contact.name !== newContactName)) {
      alert(`${newContactName} is already in your phonebook!`)
      return
    }

    let newContact = { name: newContactName, number: newContactNumber }
    contactService
      .create(newContact)
      .then((c) => setContacts(contacts.concat(c)))
  }

  const getFilteredContacts = () => {
    return filter ? contacts
      .filter((c) =>
        (c.name.toLowerCase().includes(filter.toLowerCase())))
      : contacts
  }

  const onFilterChange = (e) => setFilter(e.target.value)

  const onDelete = (id) => {
    contactService
      .del(id)
      .then(setContacts(contacts.filter((c) => c.id !== id)))
  }

  return (

    <div>
      <h2>Phonebook</h2>
      <Filter onChange={onFilterChange} />
      <h2>add new </h2>
      <ContactForm
        onSubmit={createContact}
        newContactName={newContactName}
        newContactNumber={newContactNumber}
        onNameChange={(e) => setNewContactName(e.target.value)}
        onNumberChange={(e) => setNewContactNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Contacts contacts={[...getFilteredContacts()]} onDelete={onDelete} />
    </div>
  )
}

export default App

