const Contacts = ({ contacts }) => {
  return (
    <div>
      {contacts.map((c) => (<p key={c.name}>{c.name}: {c.number}</p>))}
    </div>
  )
}

export default Contacts
