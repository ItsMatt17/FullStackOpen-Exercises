import Filter from './Filter'
import Contacts from "./Contacts.jsx"
import ContactForm from "./ContactForm.jsx"
import Notification from "./Notification.jsx"

import { useEffect, useState } from 'react'
import contactService from './services/contactService.js'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newContactName, setNewContactName] = useState('')
  const [newContactNumber, setNewContactNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const createNotification = (msg, isError, delay) => {
    setNotification({ msg, isError })
    // So I don't overwrite other notifs 
    setTimeout(() => {
      setNotification((notif) => notif?.msg === msg ? null : notif)
    }, delay)
  }

  useEffect(() => {
    contactService
      .getAll()
      .then((c) => setContacts(c))
      .catch()
  }, [])


  const clearInput = () => {
    setNewContactName('')
    setNewContactNumber('')
  }


  const createContact = () => {
    let newContact = { name: newContactName, number: newContactNumber }
    contactService
      .create(newContact)
      .then((c) => {
        setContacts(contacts.concat(c))
        createNotification(`Contact for ${newContact.name} was successfully created!`, false, 5000)
      })
      .catch((err) => {
        const msg = err?.response?.data?.error ?? `Could not create contact for ${newContact.name}!`
        createNotification(msg, true, 5000)
      })
      .finally(clearInput)
  }


  const updateContact = (contact) => {
    const update = confirm(`${contact.name} is already in your phonebook, do you want to update their number?`)
    if (!update) return clearInput()
    const updatedContact = { ...contact, number: newContactNumber }
    contactService
      .update(contact.id, updatedContact)
      .then((c) => {
        setContacts(contacts.map((c) => c.id === contact.id ? updatedContact : c))
        createNotification(`Contact for ${c.name} was successfully updated!`, false, 5000)
        clearInput()
      })
      .catch((err) => {
        const msg = err?.response?.data?.error ?? `Could not update contact for ${updatedContact.name}!`
        createNotification(msg, true, 5000)
      })
      .finally(clearInput)
  }

  const deleteContact = (id) => {
    const contact = contacts.find(c => c.id === id)
    contactService
      .del(id)
      .then(() => setContacts(contacts.filter((c) => c.id !== id)))
      .catch((err) => {
        const msg = err?.response?.data?.error ?? `There was an error whilst trying to delete the contact for ${contact.name}!`
        createNotification(msg, true, 5000)
      })
      .finally(clearInput)
  }

  const contactFormSubmit = (e) => {
    e.preventDefault()

    const contact = contacts.find((contact) => contact.name === newContactName)
    const exists = contact !== undefined
    if (!exists) createContact()
    else updateContact(contact)

  }

  const getFilteredContacts = () => {
    return filter ? contacts
      .filter((c) =>
        (c.name.toLowerCase().includes(filter.toLowerCase())))
      : contacts
  }

  const onFilterChange = (e) => setFilter(e.target.value)

  return (

    <div>
      <Notification notif={notification} />
      <h2>Phonebook</h2>
      <Filter onChange={onFilterChange} />
      <h2>add new </h2>
      <ContactForm
        onSubmit={contactFormSubmit}
        newContactName={newContactName}
        newContactNumber={newContactNumber}
        onNameChange={(e) => setNewContactName(e.target.value)}
        onNumberChange={(e) => setNewContactNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Contacts contacts={[...getFilteredContacts()]} onDelete={deleteContact} />
    </div>
  )

}
export default App

