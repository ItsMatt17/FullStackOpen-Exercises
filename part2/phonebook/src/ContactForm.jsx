const ContactForm = ({ onSubmit, newContactName, newContactNumber, onNameChange, onNumberChange }) => {

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newContactName} onChange={onNameChange} />
        number: <input value={newContactNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default ContactForm
