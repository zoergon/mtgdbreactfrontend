import React, { useState, useEffect } from 'react'
import AllCardsService from './services/AllCards'
import { Modal, Button } from 'react-bootstrap'
import './components/modal.css'
import DropdownCardEdit from "./components/DropdownCardEdit.js"

// Parent: DeckContents.jsx
// DeckContentsin modal-ikkunan sisällä olevan taulukon TableDeckContents Edit-buttonilla aukaistu päällekkäinen modal-ikkuna
// Yhden kortin muokkaaminen, eli version vaihtaminen editCard-statessa tulleen row-datan perusteella
// Dropdown, josta voidaan valita ja asettaa uusi versio kortille

const ModalCardEdit = ({ isShowModalCardEdit, invokeModalCardEdit, query, editCard, setIsPositive, setShowMessage, setMessage }) => {

    const [optionList, setOptionList] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
    const [selected, setSelected] = useState([]) // Dropdownin valinta
    const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state

    const [newId, setNewId] = useState("") // Haetun kortin id
    const [newName, setNewName] = useState("") // Haetun kortin nimi
    const [imgUris, setImgUris] = useState("") // Haetun kortin imageUris

    const [img, setImg] = useState() // Kortin kuvalinkki

    // const imgUris = ""
    var imageUri = ""
    var query = editCard.name

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

    // // Hakee imageUrlin mukaisella linkillä kuvan Scryfallin apista
    const fetchImage = async () => {        
        console.log("imageUri", imageUri)
        const res = await fetch(imageUri)
        const imageBlob = await res.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImg(imageObjectURL)
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
                <div className='float-container'>        
                    <div className="float-child-modalCardEdit">
                        <h1 style={{ color: "whitesmoke" }}>{editCard.name}</h1><br/>
                        <h2 style={{ color: "whitesmoke" }}>{editCard.setName}</h2><br/>
                        <DropdownCardEdit newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} imgUris={imgUris} setImgUris={setImgUris} imageUri={imageUri} fetchImage={fetchImage}
                        selected={selected} setSelected={setSelected} isSearchable isMulti 
                        placeHolder={editCard.setName} options={optionList} onChange={(value) => value.map((option) => (setNewId(option.id)))} />
                    </div>

                    <div className="float-child-modalCardEditImage">
                        <img style={{ height: '100%', width: '100%', paddingLeft: '0rem', paddingTop: '0rem' }} src={img}></img>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button variant="danger" onClick={initModal}>
                    Close
                </Button>
                <Button variant="dark" onClick={initModal}>
                    Store
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalCardEdit