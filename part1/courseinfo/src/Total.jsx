const Total = ({parts}) => {
    const exercises = parts.reduce((acc, val) => acc + val.exercises, 0) 
    return (
        <p>Number of exercises {exercises}</p>
    )
}


export default Total
