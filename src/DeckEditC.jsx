import './App.css'
import React, {useState, useEffect} from 'react'
import DecksService from './services/Decks'
import FormatsService from './services/Formats'
import DropdownFormats from './components/DropdownFormats.js'

// kopio alkuperäisestä DeckEdit.jsx:stä
// ilman modalformia

const DeckEdit = ({setEdit, setIsPositive, setShowMessage, setMessage, editDeck }) => {

const [newDeckId, setNewDeckId] = useState(editDeck.deckId)
const [newName, setNewName] = useState(editDeck.name)
const [newFormatId, setNewFormatId] = useState(editDeck.formatId)
const [newLoginId, setNewLoginId] = useState(editDeck.loginId)

const [optionList, setOptionList] = useState([]) // Backendiltä saadut kategoriat
const [selected, setSelected] = useState([])
const [query, setQuery] = useState(editDeck.formatId) // query useEffectille = olemassa oleva formatId
const [newFormatName, setNewFormatName] = useState(editDeck.format.formatName)
const [newId, setNewId] = useState("") // tarvitseeko tätä? voiko käyttää olemassa olevaa editDeck.formatId:tä alunperin -> vaihdot?
const [reload, reloadNow] = useState(false)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newDeck = {
    deckId: parseInt(newDeckId),
    name: newName,
    formatId: parseInt(newFormatId),
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


// const [query, setQuery] = useState("") // Backendille lähtevä hakusana
// Dropdown-valikkoon valittavissa olevat formaatit
useEffect(() => {
  // if (query !== "") // Ei hae tyhjällä stringillä
    // FormatsService.getFormat(query)
    FormatsService.getAll()
  .then(data => {
    console.log("getFormat", data)
    setOptionList(data) // saatu data sijoitetaan optionListiin
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
            <label>Format: </label>
            <DropdownFormats
              newId={newId} setNewId={setNewId}
              newFormatName={newFormatName} setNewFormatName={setNewFormatName}
              selected={selected} setSelected={setSelected}
              isSearchable isMulti
              placeHolder={newFormatName} options={optionList}
              // onChange={(value) => console.log("X onChange: ", value)} 
              onChange={(value) => value.map((option) => (setNewFormatId(option.formatId)))} />
          </div>
          {/* <div>
              <label>Format: </label>
              <input type='text' placeholder='Format'
                  value={newFormatId} onChange={({target}) => setNewFormatId(target.value)} />
          </div> */}
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