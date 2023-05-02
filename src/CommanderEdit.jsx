import './App.css'
import React, {useState} from 'react'
import AllCardsService from './services/AllCards'
import CommandersService from './services/Commanders'
import DecksService from './services/Decks'

const CommanderEdit = ({setEdit, setIsPositive, setShowMessage, setMessage, editCommander }) => {

const [newIndexId, setNewIndexId] = useState(editCommander.indexId)
const [newDeckId, setNewDeckId] = useState(editCommander.deckId)
const [newId, setNewId] = useState(editCommander.id)
const [newCount, setNewCount] = useState(editCommander.count)
const [newLoginId, setNewLoginId] = useState(editCommander.loginId)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newCommander = {
    indexId: newIndexId,
    deckId: newDeckId,
    id: newId,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

  // Commanderin update
  CommandersService.update(newCommander)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated the commander to: " + newCommander.id)
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
    console.log(newCommander)
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
        <h2>Update the Commander</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>deck_id: </label>
              <input type='number' value={newDeckId} disabled />
          </div>
          <div>
              <label>id: </label>
              <input type='text' placeholder='id'
                  value={newId} onChange={({target}) => setNewId(target.value)} required />
          </div>
          <div>
              <label>Count: </label>
              <input type='number' placeholder='Count'
                  value={newCount} onChange={({target}) => setNewCount(target.value)} required />
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

export default CommanderEdit