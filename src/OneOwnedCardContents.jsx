import './App.css'
import React, { useState, useEffect } from 'react'
import OwnedCardsService from './services/OwnedCards'
import { TableOwnedCardData } from "./components/TableOwnedCardData"

// parent: OwnedCardsList.jsx
//
// Hakee yhden kortin id:n perusteella kaiken datan taulukkoon näytettäväksi -> TableAllCardDataHC
// Kortin kuvan fetchiin saatava id tulee tätä kautta

const OneOwnedCardContents = ({ query, imgUris, setIsPositive, setShowMessage, setMessage }) => {

const [card, setCard] = useState([]) // id:llä haettu yksi kortti
// const [imgUri, setImgUri] = useState([]) // id:llä haettu yksi kortti
// const [showCards, setShowCards] = useState(false)
const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state
// const [searchName, setSearchName] = useState("")
// const [searchFormat, setSearchFormat] = useState("")
// const [create, setCreate] = useState(false)
// const [edit, setEdit] = useState(false)
// const [editCard, setEditCard] = useState(false)
// const [loading, setLoading] = useState(true) // Mahdollinen loading-tekstin näyttö statella

// useEffect(() => {
//     MainDecksService.getAll()
//   .then(data => {
//     console.log(data)
//     setCards(data)
//   })
//   .catch(error => console.log(error))
// },[create, edit, reload]
// )

// const [optionList, setOptionList] = useState([]) // Backendistä saatu data sijoitetaan tänne
// const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana (deckId)

// const handleFetch = (query) => {
//   MainDecksService.getByDeckId(query).then((res) => {
//     setCards(res.data)
//     // setLoading(false)
//   }).catch(error => console.log(error))}
  

// useEffect(() => {
//   if (query !== "")
//   handleFetch(query)
// })

useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  OwnedCardsService.getById(query) //query = id
  .then(data => {    
    // console.log("getById", data)
    setCard(data.map(e => e.idNavigation))    
    // console.log("AFTER", card)
})
  .catch(error => console.log(error))
},[reload]
)

  return (
    <>
      {card.length > 0 ? (
        <div className='table'><br/>              
            <TableOwnedCardData tbodyData={card} imgId={query} imgUris={imgUris} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
        </div>
      ) : (
        <span>
          <em className='subRowDataInfo'>There is no data.</em><br/>
        </span>
      )}
    </>
  )
}

export default OneOwnedCardContents