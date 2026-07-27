import Content from "./Content.jsx"
import Header from "./Header.jsx"
import Total from "./Total.jsx"

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3] 

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1, part2, part3]}/>
      <Total total={parts.reduce((acc, val) => acc + val.exercises, 0)}/> 
    </div>
  )
}

export default App