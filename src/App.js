import React, {useState, useEffect} from 'react'
import './App.css';
import AllCardsList from './AllCardsList'
import CommandersList from './CommandersList'
import DecksList from './DecksList'
import LoginsList from './LoginsList'
import MainDecksList from './MainDecksList'
import MainDecksListDeckId from './MainDecksListDeckId'
import Message from './Message'
import OwnedCardsList from './OwnedCardsList'

import Login from './Login'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@popperjs/core"

// BrowserRouter aliasoitu Routeriksi
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

const [showMessage, setShowMessage] = useState(false) // Näytetäänkö ilmoitus
const [message, setMessage] = useState('') // Ilmoitukseen asetettava teksti
const [isPositive, setIsPositive] = useState(false) // Näytetäänkö positiivinen vai negatiivinen viesti

const [showAllCards, setShowAllCards] = useState(true) // AllCardsin avaamista varten statet
const [showOwnedCards, setShowOwnedCards] = useState(true) // OwnedCardsin avaamista varten statet
const [showDecks, setShowDecks] = useState(true) // Deckkien avaamista varten statet

const [loggedInUser, setLoggedInUser] = useState('')
const [accesslevelId, setAccesslevelId] = useState('3')

// Käyttäjän "uudelleen sisään kirjaaminen" local storagesta
useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
}, [])

// Accesslevelin hakeminen local storagesta
useEffect(() => {
  let storedAccesslevelId = localStorage.getItem("accesslevelId")
  if (storedAccesslevelId !== null) {
    setAccesslevelId(storedAccesslevelId)
  }
}, [])

// Logout-napin tapahtumakäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
  setAccesslevelId('3')
}

return (
  <div className="App">

    {/* Jollei ole loggedin: */}
    {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}  setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

    {/* Jos on loggedin: */}
    { loggedInUser &&

      <Router>

        {/* nämä linkit vaihtelevat osoiterivin tekstiä selaimessa */}
        <Navbar className="navbar" bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href={'/'} className='nav-link'>Home</Nav.Link>
            <Nav.Link href={'/AllCards'} className='nav-link'>All cards</Nav.Link>
            <Nav.Link href={'/OwnedCards'} className='nav-link'>Owned cards</Nav.Link>
            <Nav.Link href={'/Decks'} className='nav-link'>Decks</Nav.Link>
            {/* <Nav.Link href={'/Commanders'} className='nav-link'>Commanders</Nav.Link> */}
            {/* <Nav.Link href={'/Companions'} className='nav-link'>Companions</Nav.Link> */}
            {/* <Nav.Link href={'/MainDecks'} className='nav-link'>MainDecks</Nav.Link> */}
            {/* <Nav.Link href={'/MainDecks'} className='nav-link'>MainDecksDeckId</Nav.Link> */}
            {/* <Nav.Link href={'/Maybeboards'} className='nav-link'>Maybeboards</Nav.Link> */}
            {/* <Nav.Link href={'/Sideboards'} className='nav-link'>Sideboards</Nav.Link> */}
            {/* <Nav.Link href={'/Tokens'} className='nav-link'>Tokens</Nav.Link> */}
            {accesslevelId === '1' && <Nav.Link href={'/Logins'} className='nav-link'>Logins</Nav.Link>}
            <button onClick={() => logout()}>Logout</button>
          </Nav>
        </Navbar>

        <h1>MtG:db</h1>

        {showMessage && <Message message={message} isPositive={isPositive} /> }

        {/* {showAllCards && <AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> } */}

        {/* {showOwnedCards && <OwnedCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> } */}

        {/* {showDecks && <DecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> } */}

        {/* sen mukaan mitä routessa lukee, niin renderöidään sen mukainen komponentti */}
        <Switch>
          {/* <Route path="/AllCards"> element={<AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}</Route> */}
          <Route path="/AllCards"> <AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          <Route path="/OwnedCards"> <OwnedCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          <Route path="/Decks"> <DecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          {/* <Route path="/Commanders"> <CommandersList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Companions"> <CompanionsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/MainDecks"> <MainDecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/MainDecks"> <MainDecksListDeckId setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Maybeboards"> <MaybeboardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Sideboards"> <SideboardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Tokens"> <TokensList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {accesslevelId === '1' && <Route path="/Logins"> <LoginsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>}
        </Switch>

      </Router>

    }

    </div>
  );
}

export default App;
