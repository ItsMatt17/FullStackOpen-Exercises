

const CountryInfo = ({ data }) => {
  if (!data) return <p>Seems this country has no data!</p>

  return (
    <div>
      <h1>{data.name.common}</h1>
      <p>
        Capitals:
        <ul>
          {data.capital.map(c => <li key={c}>{c}</li>)}
        </ul>
      </p>
      <p>Area: {data.area} </p>
      <h2>Languages</h2>
      <ul>
        {data.languages.map((_, v) => <li key={v}>{v}</li>)}
      </ul>

      <img src={data.flag.png} />

    </div>


  )

}

export default CountryInfo
