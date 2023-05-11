import './App.css'
import React, {useState, useEffect} from 'react'
import AllCardsService from './services/AllCards'
import CommandersService from './services/Commanders'
import DecksService from './services/Decks'
import DecksList from './DecksList'
import ResultList from './components/ResultList.js'
import SearchBar from './components/SearchBar.js'
import Dropdown from "./components/Dropdown.js"
import SelectedCard from "./components/SelectedCard.js"


const CommanderEdit = ({ setEdit, setIsPositive, setShowMessage, setMessage, editCommander }) => {

// newCommanderin statet
const [newIndexId, setNewIndexId] = useState(editCommander.indexId)
const [newDeckId, setNewDeckId] = useState(editCommander.deckId)
const [newDeckName, setNewDeckName] = useState(editCommander.deckName)
const [newId, setNewId] = useState(editCommander.id)
const [newName, setNewName] = useState(editCommander.name)
const [newCount, setNewCount] = useState(editCommander.count)
const [newLoginId, setNewLoginId] = useState(editCommander.loginId)

const [selected, setSelected] = useState([])

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan newCommander-olio, joka poimii stateistä datan
  var newCommander = {
    indexId: newIndexId,
    deckId: parseInt(newDeckId),
    deckName: newDeckName,
    id: newId,
    name: newName,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

  // Commanderin update
  CommandersService.update(newCommander)
  .then(response => {
    if (response.status === 200) {
      setMessage("Updated the commander to: " + newCommander.id)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setEdit(false)
      // Yllä oleva pois, jos setTimeoutin kautta määritellään setEdit falseksi
    }
  })
  .catch(error => {
    console.log(newCommander)
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
}


const [optionList, setOptionList] = useState([]) // Backendistä saatu data sijoitetaan tänne
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana
// Dropdown-valikkoon data .getName
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
    AllCardsService.getName(query)
  .then(data => {
    console.log("getName", data)
    setOptionList(data)
})
  .catch(error => console.log(error))
},[query]
)

// class DataContainer extends React.Component {
//   state = {    
//     names: []
//   }
// }

// const fetchNames = (query) => {
//   fetch(
//     AllCardsService.get({query})
//   )
//   // .then((res) => res.json())
//   .then(data => {
//     console.log(data)
//     this.setState({
//       names: data.Search
//     })
// })

// function SearchBar(props) {
//   const query = React.useRef()

//   const handleSearch = (e) => {
//     e.preventDefault()
//     const queryVal = query.current.value
//     props.fetchNames(queryVal.trim())
//   }
// }
// }

// const handleChange = (selectedOption) => {
//   console.log("handleChange", selectedOption)
// }
// const loadOptions = (searchValue, callback) => {
//   setTimeout(() => {
//       const filteredOptions = options.filter((option) => 
//           option.label.toLowerCase().includes(searchValue.toLowerCase())
//       )
//       console.log("loadOptions", searchValue, filteredOptions)
//       callback(filteredOptions)
//   }, 2000)
//   // Callback time in ms
// }

// Tämä on osa ResultList/SearchBaria
// const handleChange = e => {
//   let filterResults = listItems.filter(card => {
//     return card.name.toLowerCase().includes(e.target.value.toLowerCase())
//   })
//   setSearchResults(filterResults)
// }

// useEffect(() => {
//   AllCardsService.getAll().then(
//     result => {
//       setListItems(result)      
//       setSearchResults(result)
//     }
//   )
// }, [])

// Commanderin haku <input> asettaa queryn, jota käytetään useEffectillä backendille pyyntöihin
const onQuery = (e) => {
  setQuery(e.target.value)
  // console.log("query: ", query)
}

// Callback child -> parent. Vaatii <Dropdown callback={callback}>
// const callback = payload => {
//     setSelected(payload)
//     console.log("callback:", selected)
// }


// if (listItems.length > 0) {
  return (

  // return (
    <div id="edit">

      {/* <SearchBar handleChange={handleChange} /> */}
      {/* <ResultList searchResults={searchResults} /> */}
      <div>
        <label>Commanderin haku: </label>
          <input type='text' value={query} onChange={onQuery} />          
          <Dropdown selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={query} options={optionList} onChange={(value) => console.log("X onChange: ", value)} />
          <label>Asetettu commander: </label>
          <SelectedCard selected={selected} />
      </div>
      
        {/* input = searchbar */}
        {/* datalist = haettu data optionListiin */}
        {/* <input list="data" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />
        <datalist id="data">{optionList.map((item) => (
            <option key={item.id} value={item.name}>
                {item.name}
            </option>))}
        </datalist> */}

        {/* hakee deckit dropdowniin */}
        {/* <select
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}
        >
            {optionList.map((item) => (
            <option key={item.deckId} value={item.name}>
                {item.name}
            </option>
            ))}
        </select> */}

        {/* useRef */}
        {/* <form onSubmit={handleSearch} className="search-bar">
          <label>Card: </label>
            <input
              className="search-bar"
              autoFocus={true}              
              ref={query}
              label="Search Names"
              placeholder="Card's name"
              // required={true}                      
            />
          <button type="submit">NAPPISAATANA</button>
        </form> */}

        <h2>Update the Commander</h2>        

        <form onSubmit={handleSubmit}>
          <div>
            <label>deck_id: </label>
              <input type='number' value={newDeckId} disabled />
          </div>
          <div>
            <label>Deck's name: </label>
              <input type='text' value={newDeckName} disabled />
          </div>
          <div>
              <label>id: </label>
              <input type='text' placeholder='id'
                  value={newId} onChange={({target}) => setNewId(target.value)} required />
          </div>
          <div>
              <label>Commander: </label>
              <input type='text' placeholder='Commander'
                  value={newName} onChange={({target}) => setNewName(target.value)} required />
          </div>
          <div>
              <label>Count: </label>
              <input type='number' placeholder='Count'
                  value={newCount} onChange={({target}) => setNewCount(target.value)} required />
          </div>
          <div>
              <label>login_id: </label>
              <input type='number' placeholder='login_id'
                  value={newLoginId} onChange={({target}) => setNewLoginId(target.value)} required />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setEdit(false)} />

        </form>

    </div>

)
// } else {
//   return (
//     <div>
//       <SearchBar handleChange={handleChange} />
//       <p>*** now loading ***</p>
//     </div>
//   )
// }

}

export default CommanderEdit