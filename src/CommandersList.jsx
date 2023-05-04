import './App.css'
import React, {useState, useEffect} from 'react'
import CommandersService from './services/Commanders'
import Commander from './Commander'
import CommanderAdd from './CommanderAdd'
import CommanderEdit from './CommanderEdit'

const CommandersList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [commanders, setCommanders] = useState([])
const [showCommanders, setShowCommanders] = useState(false)
const [reload, reloadNow] = useState(false)
const [searchName, setSearchName] = useState("")
const [searchDeckName, setSearchDeckName] = useState("")
const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false)
const [editCommander, setEditCommander] = useState(false)

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    CommandersService.getAll()
  .then(data => {
    console.log(data)
    setCommanders(data)
  })
  .catch(error => console.log(error))
},[create, edit, reload]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

// Nimi-hakukentän funktio
const handleSearchNameInputChange = (event) => {
    setShowCommanders(true)
    setSearchName(event.target.value.toLowerCase())
}
// Format-hakukentän funktio
const handleSearchDeckNameInputChange = (event) => {
  setShowCommanders(true)
  setSearchDeckName(event.target.value.toLowerCase())
}

// Edit-funktio
const updateCommander = (commander) =>  {
  setEditCommander(commander)
  setEdit(true)
}

  return (
    <>        
        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowCommanders(!showCommanders)}>Commanders</nobr>        
        
        {/* jos create = false */}
        {!create && <button className="button" onClick={() => setCreate(true)}>Add new</button>}
        </h1>

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {!create && !edit &&
          <input placeholder="Search commanders by name" value={searchName} onChange={handleSearchNameInputChange} />
        }                
        {!create && !edit &&
          <input placeholder="Search commanders by deck's name" value={searchDeckName} onChange={handleSearchDeckNameInputChange} />
        }

        {create && <CommanderAdd setCreate={setCreate}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        />}

        {edit && <CommanderEdit setEdit={setEdit}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        editCommander={editCommander}
        />}

        {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          !create && !edit && showCommanders && commanders && commanders.map(c => 
            {
              const lowerCaseName = c.name.toLowerCase()
              const lowerCaseDeckName = c.deckName.toLowerCase()
              if ((lowerCaseName.indexOf(searchName) > -1) && (lowerCaseDeckName.indexOf(searchDeckName) > -1) ) {
                return(
                <Commander key={c.indexId} commander={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                updateCommander={updateCommander}
                />
            )
              }
            }
            )
        }

    </>
  )
}

export default CommandersList