import { useEffect, useState } from "react"
import Course from "./Course.jsx"
import axios from "axios"

const App = () => {
  // const courses = [{
  //   name: 'Half Stack application development',
  //   parts: [
  //     {
  //       name: 'Fundamentals of React',
  //       exercises: 10
  //     },
  //     {
  //       name: 'Using props to pass data',
  //       exercises: 7
  //     },
  //     {
  //       name: 'State of a component',
  //       exercises: 14
  //     },
  //     {
  //       name: 'Redux',
  //       exercises: 11
  //     }
  //   ]
  // },
  // {
  //   name: 'Node.js',
  //   id: 2,
  //   parts: [
  //     {
  //       name: 'Routing',
  //       exercises: 3,
  //       id: 1
  //     },
  //     {
  //       name: 'Middlewares',
  //       exercises: 7,
  //       id: 2
  //     }
  //   ]
  // }
  // ]

  let [courses, setCourses] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((resp) => setCourses(resp.data))

  }, [])



  return (
    <div>
      {courses.map((c) => <Course key={c.name} name={c.name} course={c} />)}
    </div>



  )

}

export default App
