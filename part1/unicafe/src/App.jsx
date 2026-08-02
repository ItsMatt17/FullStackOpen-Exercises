import { useState } from 'react'
import Button from "./Button.jsx"
import Statistics from './Statistics.jsx'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)



  return (
    <div>

      <h2> Handle Feedback </h2>
      <Button onClick={handleGood} content={"good"} />
      <Button onClick={handleNeutral} content={"neutral"} />
      <Button onClick={handleBad} content={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>

  )

}

export default App
