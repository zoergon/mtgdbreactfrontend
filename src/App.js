import React, {useState, useEffect} from 'react'
import './App.css';
import AllCardsList from './AllCardsList'
import CommandersList from './CommandersList'
import DecksList from './DecksList'
import MainDecksList from './MainDecksList'
import MainDecksListDeckId from './MainDecksListDeckId'
import Message from './Message'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import 'bootstrap/dist/css/bootstrap.min.css'

// BrowserRouter aliasoitu Routeriksi
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

//App-komponentin tila
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)

return (
  <div className="App">

      <Router>

        {/* nämä linkit vaihtelevat osoiterivin tekstiä selaimessa */}
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href={'/'} className='nav-link'>Home</Nav.Link>
            <Nav.Link href={'/AllCards'} className='nav-link'>All cards</Nav.Link>
            <Nav.Link href={'/OwnedCards'} className='nav-link'>Owned cards</Nav.Link>
            <Nav.Link href={'/Decks'} className='nav-link'>Decks</Nav.Link>
            <Nav.Link href={'/Commanders'} className='nav-link'>Commanders</Nav.Link>
            <Nav.Link href={'/Companions'} className='nav-link'>Companions</Nav.Link>
            <Nav.Link href={'/MainDecks'} className='nav-link'>MainDecks</Nav.Link>
            <Nav.Link href={'/MainDecks'} className='nav-link'>MainDecksDeckId</Nav.Link>
            <Nav.Link href={'/Maybeboards'} className='nav-link'>Maybeboards</Nav.Link>
            <Nav.Link href={'/Sideboards'} className='nav-link'>Sideboards</Nav.Link>
            <Nav.Link href={'/Tokens'} className='nav-link'>Tokens</Nav.Link>
            <Nav.Link href={'/Logins'} className='nav-link'>Logins</Nav.Link>
          </Nav>
        </Navbar>

        <h2>MtGdb</h2>

        {showMessage && <Message message={message} isPositive={isPositive} /> }

        {/* sen mukaan mitä routessa lukee, niin renderöidään sen mukainen komponentti */}
        <Switch>
          {/* <Route path="/AllCards"> element={<AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}</Route> */}
          <Route path="/AllCards"> <AllCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          {/* <Route path="/OwnedCards"> <OwnedCardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          <Route path="/Decks"> <DecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          <Route path="/Commanders"> <CommandersList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          {/* <Route path="/Companions"> <CompanionsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          <Route path="/MainDecks"> <MainDecksList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          <Route path="/MainDecks"> <MainDecksListDeckId setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route>
          {/* <Route path="/Maybeboards"> <MaybeboardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Sideboards"> <SideboardsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Tokens"> <TokensList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
          {/* <Route path="/Logins"> <LoginsList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} /></Route> */}
        </Switch>

      </Router>

    </div>
  );
}

export default App;
