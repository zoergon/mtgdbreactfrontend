import './App.css'
import React, {useState} from 'react'
import DecksService from './services/Decks'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const DeckEdit = ({setEdit, setIsPositive, setShowMessage, setMessage, editDeck }) => {

const [newDeckId, setNewDeckId] = useState(editDeck.deckId)
const [newDeckName, setNewDeckName] = useState(editDeck.deckName)
const [newDeckFormat, setNewDeckFormat] = useState(editDeck.format)
const [newLoginId, setNewLoginId] = useState(editDeck.loginId)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newDeck = {
    deckId: newDeckId,
    deckName: newDeckName,
    deckFormat: newDeckFormat,
    loginId: newLoginId
  }

  // Deckin update
  DecksService.update(newDeck)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated the deck: " + newDeck.deckName)
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
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })

}


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
              <input type='text' value={newDeckName} placeholder='Deck Name'
                  onChange={({target}) => setNewDeckName(target.value)} required />
          </div>
          <div>
              <label>Format: </label>
              <input type='text' placeholder='Format'
                  value={newDeckFormat} onChange={({target}) => setNewDeckFormat(target.value)} />
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