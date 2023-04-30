import './App.css'
import React, {useState, useEffect} from 'react'
import CommandersService from './services/Commanders'
import Commander from './Commander'

const CommandersList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [commanders, setCommanders] = useState([])
const [showCommanders, setShowCommanders] = useState(false)
const [reload, reloadNow] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    CommandersService.getAll()
  .then(data => {
    console.log(data)
    setCommanders(data)
  })
  .catch(error => console.log(error))
},[reload]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

//hakukentän funktio
const handleSearchInputChange = (event) => {
    setShowCommanders(true)
    setSearch(event.target.value.toLowerCase())
}

  return (
    <>        
        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowCommanders(!showCommanders)}>Commanders</nobr>        
        
        </h1>

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {
          <input placeholder="Search commanders by name" value={search} onChange={handleSearchInputChange} />
        }

        {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          showCommanders && commanders && commanders.map(c => 
            {
              const lowerCaseName = c.id.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <Commander key={c.indexId} commander={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />
            )
              }
            }
            )
        }

    </>
  )
}

export default CommandersList