import React, { useState, useEffect } from 'react'
import AllCardsService from './services/AllCards'
import CommandersService from './services/Commanders'
import CompanionsService from './services/Companions'
import MainDecksService from './services/MainDecks'
import MaybeboardsService from './services/Maybeboards'
import SideboardsService from './services/Sideboards'
import TokensService from './services/Tokens'
import { Modal, Button, Form } from 'react-bootstrap'
import './components/modal.css'
import DropdownCardEdit from "./components/DropdownCardEdit.js"

// Parent: DeckContents.jsx
// DeckContentsin modal-ikkunan sisällä olevan taulukon TableDeckContents Edit-buttonilla aukaistu päällekkäinen modal-ikkuna
// Yhden kortin muokkaaminen, eli version vaihtaminen editCard-statessa tulleen row-datan perusteella
// Dropdown, josta voidaan valita ja asettaa uusi versio kortille

const ModalCardEdit = ({ isShowModalCardEdit, invokeModalCardEdit, setEdit, editCard, img, setImg, servicer,
    reload, reloadNow, setIsPositive, setShowMessage, setMessage }) => {

    const [optionList, setOptionList] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
    const [selected, setSelected] = useState([]) // Dropdownin valinta

    const [newIndexId, setNewIndexId] = useState(editCard.indexId)
    const [newDeckId, setNewDeckId] = useState(editCard.deckId)
    const [newId, setNewId] = useState("") // Haetun kortin id
    const [newName, setNewName] = useState("") // Haetun kortin nimi    
    const [newCount, setNewCount] = useState(editCard.count)
    const [newLoginId, setNewLoginId] = useState(editCard.loginId)

    const [imgUris, setImgUris] = useState("") // Haetun kortin imageUris

    var imageUri = ""
    var query = editCard.name
    // var servicerChild = servicer

    // Modal-ikkunan aukaiseminen ja sulkeminen
    const initModal = () => {
        return invokeModalCardEdit(!isShowModalCardEdit)
    }   

    // Hakee editoitavan kortin nimellä kaikki vastaavuudet
    // ja sijoitetaan optionList-stateen hakutulokset näytettäväksi Dropdownissa
    useEffect(() => {
        if (query !== "") // Ei hae tyhjällä stringillä
          AllCardsService.getName(query)
        .then(data => {
          // console.log("getName", data)
          setOptionList(data)
        },)
        .catch(error => console.log(error))
      },[query, reload]
      )

    const newDropdownId = (value) => {
        value.map(option => setNewId(option.id))
        var imgUrit = value.map((option) => option.imageUris)
        if (imgUrit != "") {
            var imageUris = JSON.parse(imgUrit) // Parseroidaan             
            imageUri = imageUris.normal // Parseroidusta imageUrista valitaan normal-kuvalinkki            
            fetchImage(imageUri)
          }
    }

    // // Hakee imageUrlin mukaisella linkillä kuvan Scryfallin apista
    const fetchImage = async (imageUri) => {        
        console.log("imageUri", imageUri)
        const res = await fetch(imageUri)
        const imageBlob = await res.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImg(imageObjectURL)
    }

    // onSubmit tapahtumankäsittelijä-funktio
    const handleSubmit = (event) => {
        if (newId !== "")        
        if (servicer !== "") {
            if (servicer === "Commander") {servicer = CommandersService}
            if (servicer === "Companion") {servicer = CompanionsService}
            if (servicer === "Main deck") {servicer = MainDecksService}
            if (servicer === "Sideboard") {servicer = SideboardsService}
            if (servicer === "Maybeboard") {servicer = MaybeboardsService}
            if (servicer === "Tokens") {servicer = TokensService}
        }
        // estää oletusarvoisen käyttäytymisen
        event.preventDefault()
        // luodaan newCard-olio, joka poimii stateistä datan
        var newCard = {
            indexId: parseInt(newIndexId),
            deckId: parseInt(newDeckId),
            id: newId,
            count: parseInt(newCount),
            loginId: parseInt(newLoginId)
        }        
    
        // Kortin update
        servicer.update(newCard)
        .then(response => {
        if (response.status === 200) {
            setMessage("Updated the card: " + editCard.name)
            reloadNow(!reload)
            setIsPositive(true)
            setShowMessage(true)
    
            setTimeout(() => {
            setShowMessage(false)
            }, 5000)
    
            setEdit(false)
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
    <div id="edit" className='container'>
        <Modal
        size='xl'        
        show={isShowModalCardEdit}>
            <Modal.Header className='modalHeader' closeButton onClick={initModal}>
                <Modal.Title>Change the version of a card</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalContent'>
                <Form id="cardEdit" onSubmit={handleSubmit}>
                    <Form.Group>
                        <div className='floatContainer'>        
                            <div className="floatChildModalCardEdit">
                                <h1 style={{ color: "whitesmoke" }}>{editCard.name}</h1><br/>
                                <h2 style={{ color: "whitesmoke" }}>{editCard.setName}</h2><br/>
                                <DropdownCardEdit setNewId={setNewId} setNewName={setNewName}
                                selected={selected} setSelected={setSelected} isSearchable isMulti 
                                placeHolder={editCard.setName} options={optionList} onChange={(value) => newDropdownId(value)} />
                            </div>

                            <div className="floatChildModalCardEditImage">
                                <img style={{ height: '100%', width: '100%', paddingLeft: '0rem', paddingTop: '0rem', paddingRight: '0rem' }} src={img}></img>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Button variant='primary' type='submit' value='Save'>Save</Button>
                    </Form.Group>
                </Form>                
            </Modal.Body>
            <Modal.Footer className='modalFooter'>                
                <Button variant="danger" onClick={initModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCardEdit