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

import ModalLogin from './Login'
import { Modal, Button, Form } from 'react-bootstrap'
import './components/modal.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@popperjs/core"

// BrowserRouter aliasoitu Routeriksi
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import DatabaseAndCollection from './DatabaseAndCollection';

const App = () => {

const [isShowModalLogin, invokeModalLogin] = useState(true) // ModalLogin (Login.jsx) aukaiseminen ja sulkeminen

const [showWelcome, setShowWelcome] = useState(true) // Näytetäänkö etusivun tervehdys teksti

const [showMessage, setShowMessage] = useState(false) // Näytetäänkö ilmoitus
const [message, setMessage] = useState('') // Ilmoitukseen asetettava teksti
const [isPositive, setIsPositive] = useState(false) // Näytetäänkö positiivinen vai negatiivinen viesti

const [showAllCards, setShowAllCards] = useState(true) // AllCardsin avaamista varten statet
const [showOwnedCards, setShowOwnedCards] = useState(true) // OwnedCardsin avaamista varten statet
const [showDecks, setShowDecks] = useState(true) // Deckkien avaamista varten statet

const [newLoginId, setNewLoginId] = useState(0) // käyttäjätunnuksen id

const [loggedInUser, setLoggedInUser] = useState('')
const [loggedInLoginId, setLoggedInLoginId] = useState('')
const [accesslevelId, setAccesslevelId] = useState('3')

const [reload, reloadNow] = useState(false)

// Modal-ikkunan aukaiseminen ja sulkeminen
// const initModal = () => {
//   return invokeModalLogin(!isShowModalLogin)
// }

// Käyttäjän "uudelleen sisään kirjaaminen" local storagesta (backend)
useEffect(() => {
  setShowWelcome(true)
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
}, [])

// LoginId:n hakeminen local storagesta (backend)
useEffect(() => {
  let storedLoginId = localStorage.getItem("loginId")
  // console.log("storedLoginId", storedLoginId)
  if (storedLoginId !== null) {
    setLoggedInLoginId(parseInt(storedLoginId)) // Käyttäjätunnuksen loginId kaikkiin ko. käyttäjän omien sisältöjen hakuihin
    setNewLoginId(parseInt(storedLoginId)) // Käyttäjätunnuksen loginId kaikkiin postauksiin, updateihin
  }
}, [])

// Accesslevelin hakeminen local storagesta (backend)
useEffect(() => {
  let storedAccesslevelId = localStorage.getItem("accesslevelId")
  if (storedAccesslevelId !== null) {
    setAccesslevelId(storedAccesslevelId) // Minne kaikkialle käyttäjätunnuksen accesslevelId:llä on pääsy
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
    {!loggedInUser && <ModalLogin isShowModalLogin={isShowModalLogin} invokeModalLogin={invokeModalLogin}
    setMessage={setMessage} setIsPositive={setIsPositive}  setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

    {/* Jos on loggedin: */}
    { loggedInUser &&

      <Router>

        {/* nämä linkit vaihtelevat osoiterivin tekstiä selaimessa */}
        <Navbar className="navbar" bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href={'/'} className='nav-link'>Home</Nav.Link>            
            <Nav.Link href={'/DatabaseAndCollection'} className='nav-link'>Database & Collection</Nav.Link>
            <Nav.Link href={'/Decks'} className='nav-link'>Decks</Nav.Link>
            <Nav.Link href={'/AllCards'} className='nav-link'>Only Database</Nav.Link>
            <Nav.Link href={'/OwnedCards'} className='nav-link'>Only Collection</Nav.Link>
            {/* <Nav.Link href={'/Commanders'} className='nav-link'>Commanders</Nav.Link> */}
            {/* <Nav.Link href={'/Companions'} className='nav-link'>Companions</Nav.Link> */}
            {/* <Nav.Link href={'/MainDecks'} className='nav-link'>MainDecks</Nav.Link> */}
            {/* <Nav.Link href={'/MainDecks'} className='nav-link'>MainDecksDeckId</Nav.Link> */}
            {/* <Nav.Link href={'/Maybeboards'} className='nav-link'>Maybeboards</Nav.Link> */}
            {/* <Nav.Link href={'/Sideboards'} className='nav-link'>Sideboards</Nav.Link> */}
            {/* <Nav.Link href={'/Tokens'} className='nav-link'>Tokens</Nav.Link> */}
            {accesslevelId === '1' && <Nav.Link href={'/Logins'} className='nav-link'>Logins</Nav.Link>}
            <Nav.Link id='loggedIn' >{loggedInUser}</Nav.Link>
            <button onClick={() => logout()}>Logout</button>
          </Nav>
        </Navbar>

        <h1>MtG:db</h1>

        {showWelcome && <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ width: '40%' }}>          
          <br/><br/>Welcome {loggedInUser} to Mtg:db pages!<br/><br/>

            In the navbar you will find correct links for each sections.<br/><br/><br/>

            Here you can browse Magic: the Gathering collectable card game's whole database of all cards made so far. Or at least updated to our own database. 
            Data is from Scryfall's own database and currently updated manually by admin.<br/><br/>

            You can create and manage your own personal collection, by adding cards from our database to your collection. You are able to keep track of amount of each owned card in your collection.<br/><br/>

            There is also deck managing page for creating and managing your own decks for the game. There you can brew new decks or deal with your brewed ones.<br/><br/>
            You can choose your own deck's format from the ready made list. 
            All the different versions of cards from our database are available for tinkering your decks for what suits best for your taste. All the different boards for the deck are set up for the filling. 
            Including prefered tokens for the deck.<br/><br/>

            And nothing prevents you to make even a your own cube here!<br/><br/><br/><br/>

            Please notice! Pages are still underconstruction. This is the alpha version.<br/><br/>

            <br/><br/>

            -admin<br/><br/>
          </p>
        </ div>}
        
        {showMessage && <Message message={message} isPositive={isPositive} /> }

        {/* {showAllCards && <AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> } */}

        {/* {showOwnedCards && <OwnedCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> } */}

        {/* {showDecks && <DecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /> } */}

        {/* sen mukaan mitä routessa lukee, niin renderöidään sen mukainen komponentti */}
        <Switch>
          {/* <Route path="/AllCards"> element={<AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}</Route> */}
          <Route path="/AllCards"> <AllCardsList loggedInLoginId={loggedInLoginId} newLoginId={newLoginId}  accesslevelId={accesslevelId}
          setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} reload={reload} reloadNow={reloadNow} /></Route>
          <Route path="/OwnedCards"> <OwnedCardsList loggedInLoginId={loggedInLoginId} newLoginId={newLoginId} accesslevelId={accesslevelId}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} reload={reload} reloadNow={reloadNow} /></Route>
          <Route path="/DatabaseAndCollection"> <DatabaseAndCollection loggedInLoginId={loggedInLoginId} newLoginId={newLoginId} accesslevelId={accesslevelId}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} reload={reload} reloadNow={reloadNow} /></Route>
          <Route path="/Decks"> <DecksList loggedInLoginId={loggedInLoginId} newLoginId={newLoginId} accesslevelId={accesslevelId}
          setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} /></Route>
          {/* <Route path="/Commanders"> <CommandersList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Companions"> <CompanionsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/MainDecks"> <MainDecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/MainDecks"> <MainDecksListDeckId setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Maybeboards"> <MaybeboardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Sideboards"> <SideboardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Tokens"> <TokensList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {accesslevelId === '1' && <Route path="/Logins"> <LoginsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setShowWelcome={setShowWelcome} /></Route>}
        </Switch>

      </Router>

    }

    </div>
  );
}

export default App;
