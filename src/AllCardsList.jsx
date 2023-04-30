import './App.css'
import React, {useState, useEffect} from 'react'
import AllCardsService from './services/AllCards'
import AllCard from './AllCard'

const AllCardsList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [allCards, setAllCards] = useState([])
const [showAllCards, setShowAllCards] = useState(false)
const [reload, reloadNow] = useState(false)
const [search, setSearch] = useState("")

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    AllCardsService.getAll()
  .then(data => {
    setAllCards(data)
  })
},[reload]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

//hakukentän funktio
const handleSearchInputChange = (event) => {
    setShowAllCards(true)
    setSearch(event.target.value.toLowerCase())
}

  return (
    <>        
        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowAllCards(!showAllCards)}>All cards</nobr>        
        
        </h1>

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {
          <input placeholder="Search by card name" value={search} onChange={handleSearchInputChange} />
        }

        {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          showAllCards && allCards && allCards.map(c => 
            {
              const lowerCaseName = c.name.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <AllCard key={c.Id} allCard={c} reloadNow={reloadNow} reload={reload}
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

export default AllCardsList