import './App.css'
import React, {useState} from 'react'
import DecksService from './services/Decks'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const DeckAdd = ({setCreate, setIsPositive, setShowMessage, setMessage }) => {

const [newDeckId, setNewDeckId] = useState('')
const [newDeckName, setNewDeckName] = useState('')
const [newDeckFormat, setNewDeckFormat] = useState('')
const [newLoginId, setNewLoginId] = useState('')

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan deck-olio, joka poimii stateistä datan
  var newDeck = {
    deckId: newDeckId,
    deckName: newDeckName,
    deckFormat: newDeckFormat,
    loginId: newLoginId
  }

  // uuden deckin lisääminen
  DecksService.create(newDeck)
  .then(response => {
    if (response.status === 200) {
      setMessage("Added new Deck: " + newDeck.deckName)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setCreate(false)
      // Yllä oleva pois, jos setTimeoutin kautta määritellään setCreate falseksi
    }
  })
  .catch(error => {
    setMessage(error)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
}


  return (
    <div id="addNew">        
        <h2>Create a new deck</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>deck_id: </label>
              <input type='text' value={newDeckId} placeholder='id pitäisi tulla automaattisesti tietokannasta' maxLength="5" minLength="1"
                  onChange={({target}) => setNewDeckId(target.value)} disabled />
          </div>
          <div>
              <label>Deck's name: </label>
              <input type='text' value={newDeckName} placeholder='Deck name'
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
                  value={newLoginId} onChange={({target}) => setNewLoginId(target.value)} required />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setCreate(false)} />

        </form>

    </div>
  )
}

export default DeckAdd