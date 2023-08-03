import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import AllCardsList from './AllCardsList'
import OwnedCardsList from './OwnedCardsList'

// Parent AllCardsList.jsx:lle & OwnedCardsList.jsx:lle
//
// Avautuu App.js:n navigointi palkin kautta linkistä
//
// Näyttää AllCardsList.jsx:n & OwnedCardsList.jsx:n päällekkäin samalla sivulla mielekkäämpää käyttöä varten.
// Mahdollistaa kortin lisäyksen jälkeen OwnedCardsListin refreshin suorittamisen suoraan.

const DatabaseAndCollection = ({ loggedInLoginId, newLoginId, accesslevelId, setIsPositive, setShowMessage, setMessage, setShowWelcome, reload, reloadNow }) => {

const [showAllCardsList, setShowAllCardsList] = useState(false)
const [showOwnedCardsList, setShowOwnedCardsList] = useState(false)
// const [reloadDC, reloadNowDC] = useState(false)

useEffect(() => {
  setShowWelcome(false)
})

// useRef refresh-buttonille
// const buttonRef = useRef(null)

// reload-staten kääntely
// function reloadHandler(event) {
//   reloadNowDC(!reloadDC)
// }

  return (
    <>
        {!showAllCardsList && <div><h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowAllCardsList(!showAllCardsList)}>Click here to begin loading the Database</nobr>
        </h1>
        
        <p><br/>
          Loading the Database will take for a while.<br/><br/>
        </p>

        </div>
        }

        {showAllCardsList && <div>
          <AllCardsList loggedInLoginId={loggedInLoginId} newLoginId={newLoginId} accesslevelId={accesslevelId} 
          setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} reload={reload} reloadNow={reloadNow} />
        </div>}
        
        {!showOwnedCardsList && <div><h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowOwnedCardsList(!showOwnedCardsList)}>Click here to begin loading the Collection</nobr>
        </h1>

        <p><br/>
          Loading the Collection shouldn't take for so long.<br/><br/>
        </p>
        
        </div>
        }

        {showOwnedCardsList && <div>
          <OwnedCardsList loggedInLoginId={loggedInLoginId} newLoginId={newLoginId} accesslevelId={accesslevelId} 
          setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} reload={reload} reloadNow={reloadNow} />
        </div>}

        <div>
          <p>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </p>
        </div>

    </>
  )
}

export default DatabaseAndCollection