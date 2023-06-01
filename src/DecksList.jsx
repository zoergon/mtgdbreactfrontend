import './App.css'
import React, { useState, useEffect, useMemo } from 'react'
import DecksService from './services/Decks'
import Deck from './Deck'
import DeckAdd from './DeckAdd'
import DeckEdit from './DeckEdit'
import MainDecksListDeckId from './MainDecksListDeckId'
import Table from "./Table"
import { TableDecksExpandable } from "./components/TableDecksExpandable"

const DecksList = ({ setIsPositive, setShowMessage, setMessage }) => {

// Komponentin tilan määritys
const [aDeck, setADeck] = useState([]) // Tätä ei luultavasti tarvitse
const [decks, setDecks] = useState([]) // Backendiltä tuleva data
const [showDecks, setShowDecks] = useState(false) // MainDeckien näyttämistä varten. (Nimeä paremmin muiden osioiden myötä.)
const [reload, reloadNow] = useState(false) // State reloadia varten
const [searchName, setSearchName] = useState("") // Vanha hakukenttä
const [searchFormat, setSearchFormat] = useState("") // Vanha hakukenttä
const [create, setCreate] = useState(false) // Create-tilan määritys (Add)
const [edit, setEdit] = useState(false) // Edit-tilan määritys
const [editDeck, setEditDeck] = useState(false)
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana (deckId) MainDecksien hakuun
const [deckName, setDeckName] = useState("") // Deckin nimi child-taulukoille näytettäväksi

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
// const handleSearchNameInputChange = (event) => {
//     setShowDecks(true)
//     setSearchName(event.target.value.toLowerCase())
// }

// Format-hakukentän funktio
// const handleSearchFormatInputChange = (event) => {
//   setShowDecks(true)
//   setSearchFormat(event.target.value.toLowerCase())
// }

//edit-funktio
const updateDeck = (deck) =>  {
  setEditDeck(deck)
  setEdit(true)
}

// Tämä on ollut alunperin vain Deck.jsx:ssä. En tiedä tarvitaanko sitä vastaisuudessa, joten käytännöllisempi se olisi tässä.
const deleteDeck = (deck) => {
  let answer = window.confirm(`Are you sure you want to permanently remove the deck: ${deck.name}?`)

  if(answer === true) {
      
  DecksService.remove(deck.deckId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed the deck: ${deck.name}.`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          // Ilmoituksen piilotus
          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
            reloadNow(!reload)
      }
  })
  .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollaa ylös ruudun

      setTimeout(() => {
        setShowMessage(false)
      }, 6000)
    })

  } // Jos poisto perutaan, annetaan ilmoitus onnistuneesta perumisesta.
  else {
      setMessage('Canceled the deletion of the deck.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
  }
}

// Tarkistaa onko data haettu backendistä decks-stateen.
// Jollei ole, antaa sillä välin 'now loading' -paragrafin ilmoitukseksi.
if (decks.length > 0) {
  return (
    <>        

        <div className='table'>            
            {!create && <button className="button" onClick={() => setCreate(true)}>Create a new deck</button>}{' '}
            {/* {!edit && <button className="button" onClick={() => setEdit(true)}>Edit the selected deck</button>}{' '} */}
            <TableDecksExpandable edit={edit} setEdit={setEdit} create={create} setCreate={setCreate} editDeck={editDeck} deck={aDeck} reloadNow={reloadNow} reload={reload}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    updateDeck={updateDeck} deleteDeck={deleteDeck} tbodyData={decks} showDecks={showDecks} setShowDecks={setShowDecks} setQuery={setQuery} setDeckName={setDeckName} />
            {/* {!create && !edit && showDecks && decks &&
            <TableDecks deck={deck} reloadNow={reloadNow} reload={reload}
                      setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                      updateDeck={updateDeck} tbodyData={decks}/>
            } */}
        </div>

        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        {/* <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowDecks(!showDecks)}>Decks</nobr>         */}
        
        {/* jos create = false */}
        {/* {!create && <button className="button" onClick={() => setCreate(true)}>Add new</button>}
        </h1> */}

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}        
        {/* {!create && !edit &&
          <input placeholder="Search decks by name" value={searchName} onChange={handleSearchNameInputChange} />
        }     
        {!create && !edit &&
          <input placeholder="Search decks by format" value={searchFormat} onChange={handleSearchFormatInputChange} />
        } */}

        {create && <DeckAdd setCreate={setCreate}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {edit && <DeckEdit setEdit={setEdit}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        editDeck={editDeck}
        />}

        {showDecks && <MainDecksListDeckId query={query} setQuery={setQuery} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} deckName={deckName} />}

        {/* {
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

export default DecksList