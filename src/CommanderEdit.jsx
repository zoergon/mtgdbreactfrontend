import './App.css'
import React, {useState, useEffect} from 'react'
import AllCardsService from './services/AllCards'
import CommandersService from './services/Commanders'
import DecksService from './services/Decks'
import DecksList from './DecksList'
import ResultList from './components/ResultList.js'
// import DropdownResultList from './components/DropdownResultList.js'
import SearchBar from './components/SearchBar.js'
import Dropdown from "./Dropdown"


const CommanderEdit = ({ setEdit, setIsPositive, setShowMessage, setMessage, editCommander }) => {

// newCommanderin statet
const [newIndexId, setNewIndexId] = useState(editCommander.indexId)
const [newDeckId, setNewDeckId] = useState(editCommander.deckId)
const [newDeckName, setNewDeckName] = useState(editCommander.deckName)
const [newId, setNewId] = useState(editCommander.id)
const [newName, setNewName] = useState(editCommander.name)
const [newCount, setNewCount] = useState(editCommander.count)
const [newLoginId, setNewLoginId] = useState(editCommander.loginId)

// Dropdown-listan statet
// const [allData,setAllData] = useState([])
// const [filteredData,setFilteredData] = useState(allData)
const [listItems, setListItems] = useState([])
const [searchResults, setSearchResults] = useState([])

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

// Dropdown-valikkoon data GetAll
// const [searchValue, setSearchValue]  = useState('')
// const [select, setSelected]  = useState('')
// const [optionList, setOptionList] = useState([])
// useEffect(() => {
//     AllCardsService.getAll()
//   .then(data => {
//     console.log(data)
//     setOptionList(data)
// })
//   .catch(error => console.log(error))
// },[]
// )

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

// react-select dropdown-valikko
// const options = [optionList]
// console.log(options)
//   // [{ value: "jack", label: "Jack" },
//   // { value: "john", label: "John" },]

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

const handleChange = e => {
  let filterResults = listItems.filter(card => {
    return card.name.toLowerCase().includes(e.target.value.toLowerCase())
  })
  setSearchResults(filterResults)
}

useEffect(() => {
  AllCardsService.getAll().then(
    result => {
      setListItems(result)      
      setSearchResults(result)
    }
  )
}, [])

const options = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "cyan", label: "Cyan" },
  { value: "magenta", label: "Magenta" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" }
]

if (listItems.length > 0) {
  return (

  // return (
    <div id="edit">

      <SearchBar handleChange={handleChange} />
      {/* <ResultList searchResults={searchResults} /> */}
      {/* <DropdownResultList searchResults={searchResults} /> */}
      <Dropdown placeHolder="Select..." options={options} />

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
} else {
  return (
    <div>
      <SearchBar handleChange={handleChange} />
      <p>*** now loading ***</p>
    </div>
  )
}

}

export default CommanderEdit