import Part from "./Part.jsx"

const Content = ({ parts }) => {
  const [part1, part2, part3] = parts

  return (
    <div>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </div>
  )
}

export default Content
