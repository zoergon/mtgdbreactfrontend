import './App.css'
import React, {useState} from 'react'
import AllCardsService from './services/AllCards'
import CommandersService from './services/Commanders'
import DecksService from './services/Decks'

const CommanderAdd = ({setCreate, setIsPositive, setShowMessage, setMessage }) => {

const [newDeckId, setNewDeckId] = useState('')
const [newId, setNewId] = useState('')
const [newCount, setNewCount] = useState('')
const [newLoginId, setNewLoginId] = useState('')

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {  
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan commander-olio, joka poimii stateistä datan
  var newCommander = {
    deckId: parseInt(newDeckId),
    id: newId,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

  // uuden commanderin lisääminen
  CommandersService.create(newCommander)
  .then(response => {
    if (response.status === 200) {
      setMessage("Added a new Commander: " + newCommander.id)
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
        <h2>Add a new commander</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>deck_id: </label>
              <input type='number' value={newDeckId} placeholder='deck_id' maxLength="5" minLength="1"
                  onChange={({target}) => setNewDeckId(target.value)} required />
          </div>
          <div>
              <label>id: </label>
              <input type='text' value={newId} placeholder='id'
                  onChange={({target}) => setNewId(target.value)} required />
          </div>
          {/* <div>
              <label>Commander's name: </label>
              <input type='text' value={newName} placeholder='Commander name'
                  onChange={({target}) => setNewName(target.value)} required />
          </div> */}
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

          <input type='button' value='Cancel' onClick={() => setCreate(false)} />

        </form>

    </div>
  )
}

export default CommanderAdd