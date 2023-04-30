import './App.css'
import React, {useState, useEffect} from 'react'
import DecksService from './services/Decks'
import Deck from './Deck'
import DeckAdd from './DeckAdd'
import DeckEdit from './DeckEdit'

const DecksList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [decks, setDecks] = useState([])
const [showDecks, setShowDecks] = useState(false)
const [reload, reloadNow] = useState(false)
const [search, setSearch] = useState("")
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

//hakukentän funktio
const handleSearchInputChange = (event) => {
    setShowDecks(true)
    setSearch(event.target.value.toLowerCase())
}

//edit-funktio
const updateDeck = (deck) =>  {
  setEditDeck(deck)
  setEdit(true)
}

  return (
    <>        
        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowDecks(!showDecks)}>Decks</nobr>        
        
        {/* jos create = false */}
        {!create && <button className="button" onClick={() => setCreate(true)}>Add new</button>}
        </h1>

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {!create && !edit &&
          <input placeholder="Search decks by name" value={search} onChange={handleSearchInputChange} />
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
              if (lowerCaseName.indexOf(search) > -1) {
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
}

export default DecksList