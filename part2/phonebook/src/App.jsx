import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([{ name: 'Arto Hellas', number: '123-456-7890' }])
  const [newContactName, setNewContactName] = useState('')
  const [newContactNumber, setNewContactNumber] = useState('')

  const createContact = (e) => {
    e.preventDefault()

    if (!contacts.every((contact) => contact.name !== newContactName)) alert(`${newContactName} is already in your phonebook!`)
    else {
      setContacts(contacts.concat({ name: newContactName, number: newContactNumber }))
      setNewContactName('')
      setNewContactNumber('')
    }
  }


  return (

    <div>
      <h2>Phonebook</h2>
      <form onSubmit={createContact}>
        <div>
          name: <input value={newContactName} onChange={(e) => setNewContactName(e.target.value)} />
          number: <input value={newContactNumber} onChange={(e) => setNewContactNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {contacts.map((c) => (<p key={c.name}>{c.name}: {c.number}</p>))}
      </div>
    </div>
  )
}

export default App
