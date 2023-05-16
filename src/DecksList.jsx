import './App.css'
import React, { useState, useEffect, useMemo } from 'react'
import DecksService from './services/Decks'
import Deck from './Deck'
import DeckAdd from './DeckAdd'
import DeckEdit from './DeckEdit'
import Table from "./Table"
import { TableDecks } from "./components/TableDecks"

const DecksList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [decks, setDecks] = useState([])
const [showDecks, setShowDecks] = useState(false)
const [reload, reloadNow] = useState(false)
const [searchName, setSearchName] = useState("")
const [searchFormat, setSearchFormat] = useState("")
const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false)
const [editDeck, setEditDeck] = useState(false)

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    DecksService.getAll()
  .then(data => {
    console.log(data)
    setDecks(data)
  })
  .catch(error => console.log(error))
},[create, edit, reload]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

// Nimi-hakukentän funktio
const handleSearchNameInputChange = (event) => {
    setShowDecks(true)
    setSearchName(event.target.value.toLowerCase())
}
// Format-hakukentän funktio
const handleSearchFormatInputChange = (event) => {
  setShowDecks(true)
  setSearchFormat(event.target.value.toLowerCase())
}

//edit-funktio
const updateDeck = (deck) =>  {
  setEditDeck(deck)
  setEdit(true)
}

// Tableen headingin backendistä haetusta decks-statesta
// const getHeadings = () => {
//     return Object.keys(decks[0])
// }

// Tarkistaa onko data haettu backendistä decks-stateen.
// Jollei ole, antaa sillä välin 'now loading' -paragrafin ilmoitukseksi.
if (decks.length > 0) {
  return (
    <>        

        <div className='table'>
            {/* <Table theadData={getHeadings()} tbodyData={decks}/> */}
            <TableDecks tbodyData={decks}/>
        </div>

        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowDecks(!showDecks)}>Decks</nobr>        
        
        {/* jos create = false */}
        {!create && <button className="button" onClick={() => setCreate(true)}>Add new</button>}
        </h1>

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}        
        {!create && !edit &&
          <input placeholder="Search decks by name" value={searchName} onChange={handleSearchNameInputChange} />
        }     
        {!create && !edit &&
          <input placeholder="Search decks by format" value={searchFormat} onChange={handleSearchFormatInputChange} />
        }

        {create && <DeckAdd setCreate={setCreate}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {edit && <DeckEdit setEdit={setEdit}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        editDeck={editDeck}
        />}

        {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // Ensimmäiset !create && !edit && - poistavat listauksen näkyvistä alta lisäystilassa(?)
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          !create && !edit && showDecks && decks && decks.map(d => 
            {
              const lowerCaseName = d.name.toLowerCase()
              const lowerCaseFormat = d.format.toLowerCase()
              if ((lowerCaseName.indexOf(searchName) > -1) && (lowerCaseFormat.indexOf(searchFormat) > -1) ) {
                return(
                <Deck key={d.deckId} deck={d} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                updateDeck={updateDeck}
                />
            )
              }
            }
            )
        }

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

export default DecksList