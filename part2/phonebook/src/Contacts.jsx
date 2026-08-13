const Contacts = ({ contacts, onDelete }) => {
  return (
    <div>
      {contacts.map((c) => (
        <p key={c.id}>{c.name}: {c.number}
          <button onClick={() => { if (confirm(`Are you sure you want to delete ${c.name}?`)) onDelete(c.id) }}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Contacts
