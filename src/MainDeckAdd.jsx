import './App.css'
import React, {useState} from 'react'
import MainDecksService from './services/MainDecks'

const MainDeckAdd = ({ reload, reloadNow, setCreate, setIsPositive, setShowMessage, setMessage }) => {

const [newIndexId, setNewIndexId] = useState('') // Luultavasti ei tarvitse
const [newDeckId, setNewDeckId] = useState('')
const [newId, setNewId] = useState('')
const [newCount, setNewCount] = useState('')
const [newLoginId, setNewLoginId] = useState('')

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {  
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan deck-olio, joka poimii stateistä datan
  var newCard = {
    deckId: parseInt(newDeckId),
    id: newId,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

  // uuden cardin lisääminen
  MainDecksService.create(newCard)
  .then(response => {
    if (response.status === 200) {
      setMessage("Added a new Card: " + newCard.id)
      reloadNow(!reload)
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
        <h2>Add a new card</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>deck_id: </label>
              <input type='number' value={newDeckId} placeholder='deck_id' minLength="1"
                  onChange={({target}) => setNewDeckId(target.value)} required />
          </div>
          <div>
              <label>id: </label>
              <input type='text' value={newId} placeholder='id'
                  onChange={({target}) => setNewId(target.value)} required />
          </div>
          <div>
              <label>Count: </label>
              <input type='number' placeholder='Count'
                  value={newCount} onChange={({target}) => setNewCount(target.value)} />
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

export default MainDeckAdd