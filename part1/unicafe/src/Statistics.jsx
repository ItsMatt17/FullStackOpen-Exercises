
const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad

  if (total() === 0) {
    return (<p>No feedback given</p>)
  }


  return (
    <>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>total: {total()}</p>
      <p>average: {total() === 0 ? 0 : (good - bad) / total()}</p>
      <p>positive: {(total() === 0 ? 0 : (good) / total()) * 100}%</p>
    </>
  )

}

export default Statistics
