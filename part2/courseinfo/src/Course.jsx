import Header from "./Header.jsx"
import Total from "./Total.jsx"
import Content from "./Content.jsx"


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course 
