import './App.css'
import React, { useState, useEffect } from 'react'
import AllCardsService from './services/AllCards'
import { TableAllCardData } from "./components/TableAllCardData"

// parent: AllCardsList.jsx
//
// Hakee yhden kortin id:n perusteella kaiken datan taulukkoon näytettäväksi -> TableAllCardDataHC
// Kortin kuvan fetchiin saatava id tulee tätä kautta

const OneCardContents = ({ query, imgUris, setIsPositive, setShowMessage, setMessage }) => {

const [card, setCard] = useState([]) // id:llä haettu yksi kortti
// const [imgUri, setImgUri] = useState([]) // id:llä haettu yksi kortti
// const [showCards, setShowCards] = useState(false)
const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state

useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  AllCardsService.getOneCardById(query) //query = id
  .then(data => {
    // console.log("getOneCardById", data)
    setCard(data)    
    // console.log("AFTER", card)
})
  .catch(error => console.log(error))
},[reload]
)

  return (
    <>
      {card.length > 0 ? (
        <div className='table'><br/>              
            <TableAllCardData tbodyData={card} imgId={query} imgUris={imgUris} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />
        </div>
      ) : (
        <span>
          <em className='subRowDataInfo'>There is no data.</em><br/>
        </span>
      )}
    </>
  )
}

export default OneCardContents