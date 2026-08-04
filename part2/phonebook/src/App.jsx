import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([{ name: 'Arto Hellas' }])
  const [newContact, setNewContact] = useState('')

  const createContact = (e) => {
    e.preventDefault()

    if (!contacts.every((contact) => contact.name !== newContact)) alert(`${newContact} is already in your phonebook!`)
    else {
      setContacts(contacts.concat({ name: newContact }))
      setNewContact('')
    }
  }


  return (

    <div>
      <h2>Phonebook</h2>
      <form onSubmit={createContact}>
        <div>
          name: <input value={newContact} onChange={(e) => setNewContact(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <li>
        {contacts.map((c) => (<ul key={c.name}>{c.name}</ul>))}
      </li>
    </div>
  )
}

export default App
