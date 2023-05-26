import './App.css'
import React, {useState} from 'react'
import MainDecksService from './services/MainDecks'

const MainDeckEdit = ({setEdit, setIsPositive, setShowMessage, setMessage, editCard }) => {

const [newIndexId, setNewIndexId] = useState(editCard.deckId) // Tätäkin tarvitaan! Vaikkei sitä päivitetä.
const [newDeckId, setNewDeckId] = useState(editCard.deckId)
const [newId, setNewId] = useState(editCard.id)
const [newCount, setNewCount] = useState(editCard.count)
const [newLoginId, setNewLoginId] = useState(editCard.loginId)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newCard = {
    indexId: parseInt(newIndexId),
    deckId: parseInt(newDeckId),
    id: newId,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

  // Kortin update
  MainDecksService.update(newCard)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated the card: " + newCard.id)
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
    console.log(newCard)
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
        <h2>Update the card</h2>        

        <form onSubmit={handleSubmit}>
        <div>
            <label>index_id: </label>
              <input type='number'
                  value={newDeckId} disabled />              
          </div>
          <div>
            <label>deck_id: </label>
              <input type='number' placeholder='deck_id'
                  value={newDeckId} onChange={({target}) => setNewDeckId(target.value)} required />              
          </div>
          <div>
              <label>id: </label>
              <input type='text' placeholder='id'
                  value={newId} onChange={({target}) => setNewId(target.value)} required />
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

          <input type='button' value='Cancel' onClick={() => setEdit(false)} />

        </form>

    </div>
  )
}

export default MainDeckEdit