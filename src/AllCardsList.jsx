import './App.css'
import React, {useState, useEffect} from 'react'
import AllCardsService from './services/AllCards'
import AllCard from './AllCard'
import { TableAllCards } from "./components/TableAllCards"

const AllCardsList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [allCards, setAllCards] = useState([])
const [showAllCards, setShowAllCards] = useState(false)
const [reload, reloadNow] = useState(false)
const [search, setSearch] = useState("")
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    AllCardsService.getAll()
  .then(data => {
    console.log(data)
    setAllCards(data)
  })
  .catch(error => console.log(error))
},[reload]
)

//hakukentän funktio
// const handleSearchInputChange = (event) => {
//     setShowAllCards(true)
//     setSearch(event.target.value.toLowerCase())
// }

if (allCards.length > 0) {
  return (
    <>
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowAllCards(!showAllCards)}>Show all cards</nobr>        
        </h1>

        {showAllCards &&
        <div className='table'>
            <TableAllCards tbodyData={allCards} setQuery={setQuery} />
        </div>}

        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        {/* <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowAllCards(!showAllCards)}>All cards</nobr>
        </h1> */}

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {/* {
          <input placeholder="Search cards by name" value={search} onChange={handleSearchInputChange} />
        } */}

        {/* {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          showAllCards && allCards && allCards.map(c => 
            {
              const lowerCaseName = c.name.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <AllCard key={c.id} allCard={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />
            )
              }
            }
            )
        } */}

    </>
  )
} else {
  return (
    <div>      
      <p>*** now loading ***</p>
    </div>
  )
}
}

export default AllCardsList