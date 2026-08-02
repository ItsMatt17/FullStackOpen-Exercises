import StatisticLine from './StatisticLine.jsx'

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad

  if (total() === 0) {
    return (<p>No feedback given</p>)
  }

  return (
    <div>

      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"total"} value={total()} />
          <StatisticLine text={"average"} value={total() === 0 ? 0 : (good - bad) / total()} />
          <StatisticLine text={"positive"} value={(total() === 0 ? 0 : (good) / total()) * 100} />
        </tbody>
      </table>

    </div>
  )

}

export default Statistics
