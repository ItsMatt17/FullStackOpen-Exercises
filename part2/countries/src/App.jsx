import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (countries.length === 0) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((resp) => setCountries(resp.data.map((c) => c.name.common)))
        .catch((err) => console.log(err))
    }

    if ()



  }, [countries])


  return (
    <div>
      <form>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

      </form>

    </div>

  )
}

export default App
