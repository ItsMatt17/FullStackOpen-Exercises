import { useState } from 'react'
import Button from "./Button.jsx"

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


      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>

  )

}

export default App
