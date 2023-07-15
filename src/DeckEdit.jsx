import './App.css'
import React, {useState, useEffect} from 'react'
import DecksService from './services/Decks'
import FormatsService from './services/Formats'
import DropdownFormats from './components/DropdownFormats.js'

import { Modal, Button, Form } from 'react-bootstrap'

// parent: DecksList.jsx
// TableDecks.js Settings-buttonin aukaisema deckin tietojen editointiin modal-ikkuna

const ModalDeckEdit = ({ isShowDeckSettings, invokeModalDeckSettings, setEdit, setIsPositive, setShowMessage, setMessage, editDeck }) => {

const [newDeckId, setNewDeckId] = useState(editDeck.deckId)
const [newName, setNewName] = useState(editDeck.name)
const [newFormatId, setNewFormatId] = useState(editDeck.formatId)
const [newLoginId, setNewLoginId] = useState(editDeck.loginId)

const [optionList, setOptionList] = useState([]) // Backendiltä saadut formaatit
const [selected, setSelected] = useState([])
const [query, setQuery] = useState(editDeck.formatId) // query useEffectille = olemassa oleva formatId
const [newFormatName, setNewFormatName] = useState(editDeck.format.formatName)
const [newId, setNewId] = useState("") // dropdown käyttää tätä
const [reload, reloadNow] = useState(false)

// DeckEdit.jsx modalin (deck's settings) aukaiseminen ja sulkeminen
const initModal = () => {
  // return invokeModal(!false)
  return invokeModalDeckSettings(!isShowDeckSettings)
}

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan newDeck-olio, joka poimii stateistä datan
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
    setOptionList(data) // saatu data sijoitetaan optionListiin
})
  .catch(error => console.log(error))
},[query, reload]
)

  return (
    // <div id="edit" className='container'>
    <div id="edit">
      <Modal show={isShowDeckSettings}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Deck's settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="settings" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>deck_id: </Form.Label>
                <Form.Control type='number' value={newDeckId} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Deck's name: </Form.Label>
                <Form.Control type='text' placeholder='Deck Name'
                    value={newName} onChange={({target}) => setNewName(target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Format: </Form.Label>
              <DropdownFormats
                newId={newId} setNewId={setNewId}
                newFormatName={newFormatName} setNewFormatName={setNewFormatName}
                selected={selected} setSelected={setSelected}
                isSearchable isMulti
                placeHolder={newFormatName} options={optionList}
                // onChange={(value) => console.log("X onChange: ", value)} 
                onChange={(value) => value.map((option) => (setNewFormatId(option.formatId)))} />
            </Form.Group>
            {/* <div>
                <label>Format: </label>
                <input type='text' placeholder='Format'
                    value={newFormatId} onChange={({target}) => setNewFormatId(target.value)} />
            </div> */}
            <Form.Group>
                <Form.Label>login_id: </Form.Label>
                <Form.Control type='number' placeholder='login_id'
                    value={newLoginId} onChange={({target}) => setNewLoginId(target.value)} />
            </Form.Group>
            <Form.Group>
              <Button variant='primary' type='submit' value='Save'>Save</Button>

            {/* <input type='button' value='Cancel' onClick={() => setEdit(false)} /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal => setEdit(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalDeckEdit