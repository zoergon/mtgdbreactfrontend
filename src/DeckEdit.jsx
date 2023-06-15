import './App.css'
import React, {useState} from 'react'
import DecksService from './services/Decks'
import Dropdown from './components/Dropdown.js'

const DeckEdit = ({setEdit, setIsPositive, setShowMessage, setMessage, editDeck }) => {

const [newDeckId, setNewDeckId] = useState(editDeck.deckId)
const [newName, setNewName] = useState(editDeck.name)
const [newFormat, setNewFormat] = useState(editDeck.formatId)
const [newLoginId, setNewLoginId] = useState(editDeck.loginId)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newDeck = {
    deckId: parseInt(newDeckId),
    name: newName,
    formatId: parseInt(newFormat),
    loginId: parseInt(newLoginId)
  }

  // Deckin update
  DecksService.update(newDeck)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated the deck: " + newDeck.name)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setEdit(false)
      // Yllä oleva pois, jos setTimeoutin kautta määritellään setEdit falseksi
    }
  })
  .catch(error => {
    console.log(newDeck)
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
}

const [optionList, setOptionList] = useState([]) // Backendiltä saadut kategoriat
const [query, setQuery] = useState("") // Backendille lähtevä hakusana
// Dropdown-valikkoon data .getAll
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
    FormatsService.getFormat(query)
  .then(data => {
    console.log("getFormat", data)
    setOptionList(data)
})
  .catch(error => console.log(error))
},[query, reload]
)



  return (
    <div id="edit">        
        <h2>Update the deck</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>deck_id: </label>
              <input type='number' value={newDeckId} disabled />
          </div>
          <div>
              <label>Deck's name: </label>
              <input type='text' placeholder='Deck Name'
                  value={newName} onChange={({target}) => setNewName(target.value)} required />
          </div>
          <div>
            <Dropdown
              newId={newId} setNewId={setNewId}
              newName={newName} setNewName={setNewName}
              selected={selected} setSelected={setSelected}
              isSearchable isMulti
              placeHolder={query} options={optionList}
              onChange={(value) => console.log("X onChange: ", value)} />
          </div>
          <div>
              <label>Format: </label>
              <input type='number' placeholder='Format'
                  value={newFormat} onChange={({target}) => setNewFormat(target.value)} />
          </div>
          <div>
              <label>login_id: </label>
              <input type='number' placeholder='login_id'
                  value={newLoginId} onChange={({target}) => setNewLoginId(target.value)} />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setEdit(false)} />

        </form>

    </div>
  )
}

export default DeckEdit