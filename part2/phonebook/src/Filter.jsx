const Filter = ({ onChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      Filter:
      <input onChange={onChange} />
    </form>
  )

}

export default Filter
