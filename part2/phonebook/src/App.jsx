import { useState } from 'react'
import Filter from './Filter'
import Contacts from "./Contacts.jsx"
import ContactForm from "./ContactForm.jsx"

const App = () => {
  const [contacts, setContacts] = useState([{ name: 'Arto Hellas', number: '123-456-7890' }])
  const [newContactName, setNewContactName] = useState('')
  const [newContactNumber, setNewContactNumber] = useState('')
  const [filter, setFilter] = useState('')

  const createContact = (e) => {
    e.preventDefault()

    if (!contacts.every((contact) => contact.name !== newContactName)) alert(`${newContactName} is already in your phonebook!`)
    else {
      setContacts(contacts.concat({ name: newContactName, number: newContactNumber }))
      setNewContactName('')
      setNewContactNumber('')
    }
  }

  const getFilteredContacts = () => {
    return filter ? contacts.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase())) : contacts
  }

  const onFilterChange = (e) => setFilter(e.target.value)

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
      <Contacts contacts={[...getFilteredContacts()]} />
    </div>
  )
}

export default App

