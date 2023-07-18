import './App.css'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import './components/modal.css'
import DecksService from './services/Decks'
import FormatsService from './services/Formats'
import DropdownFormats from './components/DropdownFormats.js'

const ModalDeckAdd = ({ setCreate, setIsPositive, setShowMessage, setMessage, isShowAddDeck, invokeModalAddDeck, reload, reloadNow }) => {

const [newName, setNewName] = useState('')
const [newFormatId, setNewFormatId] = useState('')
const [newLoginId, setNewLoginId] = useState('')

const [optionList, setOptionList] = useState([]) // Backendiltä saadut formaatit
const [selected, setSelected] = useState([])
const [newId, setNewId] = useState('') // dropdown käyttää tätä
const [newFormatName, setNewFormatName] = useState('')

// Modal-ikkunan aukaiseminen ja sulkeminen
const initModal = () => {
  return invokeModalAddDeck(!isShowAddDeck)
}

// Dropdown-valikkoon valittavissa olevat formaatit
useEffect(() => {

  const token = localStorage.getItem('token')
      FormatsService
            .setToken(token)

    FormatsService.getAll()
  .then(data => {    
    setOptionList(data) // saatu data sijoitetaan optionListiin
})
  .catch(error => console.log(error))
},[reload]
)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {  
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan deck-olio, joka poimii stateistä datan
  var newDeck = {
    // deckId: newDeckId,
    name: newName,
    formatId: parseInt(newFormatId),
    loginId: parseInt(newLoginId)
  }

  // uuden deckin lisääminen
  DecksService.create(newDeck)
  .then(response => {
    if (response.status === 200) {
      setMessage("Added a new Deck: " + newDeck.name)
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

const handleClose = () => {
  setCreate(false)
  initModal()
}

  return (
    <div id="edit" className='container'>
        <Modal
        size='xl'        
        show={isShowAddDeck}>
            <Modal.Header className='modalHeader' closeButton onClick={initModal}>
                <Modal.Title>Create a new deck</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalContent'>
                <Form id="addDeck" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Deck's name: </Form.Label>
                        <Form.Control type='text' value={newName} placeholder='Deck name'
                            onChange={({target}) => setNewName(target.value)} required />
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
                    <Form.Group>
                        <Form.Label>login_id: </Form.Label>
                        <Form.Control type='number' placeholder='login_id'
                            value={newLoginId} onChange={({target}) => setNewLoginId(target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Button variant='primary' type='submit' value='Save'>Save</Button>
                    </Form.Group>
                </Form>                
            </Modal.Body>
            <Modal.Footer className='modalFooter'>                
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    </div>
  )
}

export default ModalDeckAdd