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