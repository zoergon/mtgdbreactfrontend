import './App.css'
import React, {useState, useEffect} from 'react'
import AllCardsService from './services/AllCards'
import AllCard from './AllCard'
import { TableAllCards } from "./components/TableAllCards"
import { TableAllCardData } from "./components/TableAllCardData"

const AllCardsList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [allCards, setAllCards] = useState([])
const [showAllCards, setShowAllCards] = useState(false)
const [reload, reloadNow] = useState(false)
// const [search, setSearch] = useState("")
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana

// UseEffect ajetaan aina alussa kerran
useEffect(() => {
    AllCardsService.getAll()
  .then(data => {
    console.log(data)
    setAllCards(data)
  })
  .catch(error => console.log(error))
},[reload]
)

//hakukentän funktio
// const handleSearchInputChange = (event) => {
//     setShowAllCards(true)
//     setSearch(event.target.value.toLowerCase())
// }

// Nämä Expandable-mallista
// XXX - tästä saakka
const details = React.useMemo(
  () => [
    {
      Header: "index_id",
      accessor: "indexId",
      width: 50
    },
    {
      Header: "Card",
      accessor: "name",
      width: 125
    },
    {
      Header: 'Count',
      accessor: 'count',
      width: 80,
    },
    {
      // Header: "Sample Group Details",
      Header: "deck_id",
      // accessor: "groupDetails",
      accessor: "deckId",
      width: 100
    },
  //   {
  //     // samaa tasoa kuin MainDecks muut rivit, viimeisen kahden rivin tiedot alkuperäisessä yhdistetty tällä tavoin yhteen
  //     Header: "System",
  //     accessor: (d) => {
  //       return d.systemNumber + " " + d.systemName;
  //     },
  //     width: 200
  //   }
  ],
  []
);

// alkuperäisessä row.original.groupDetails = aktuaalinen subRow datassa
// TableDecksin expandable subRowiin lähetetään tämä = renderRowSubComponent={subTable}
// TableDecksin mappaaman row-datan mukaisesti = row.original.mainDecks = Entity Frameworkin fk:n mukaisesti mappaama taulu tietokannassa
// ts. jos kyseisellä rivillä eli deckillä on kortteja = .length > 0
// -> <AllDeckContents tekee queryn mukaisen haun backendistä ja taulun niistä, details-muuttujassa määritettyjen headereitten ja accessorien mukaisesti
const subTable = React.useCallback(
  ({ row }) =>
    // row.original.groupDetails.length > 0 ? (
    // row.original.mainDecks.length > 0 ? (
      (
      // <TableDeckContents
      <TableAllCardData
        query={row.original.id}
        // setQuery={setQuery}
        // columns={details}
        // data={row.original.groupDetails}
        data={row.original.id}
        // headerColor="grey"
      />
      ),
    // ) : (
    //   "No Data"
    // ),
  [details]
);

// Alkuperäisessä: export const data = { data: { getGroupedSamplingStationBySystemId: [{ systemId: 1289, jne....}]}}
const expandedRows = React.useMemo(() => {
  // if (data?.data) {
  // if (MainDecksList?.decks) {
  if (allCards?.id) {
    let arr;
    let c = allCards;
    if (c.id.length > 0) {
      arr = c.Id.map((sid, ind) => {
        return { [ind]: true };
      });
    }
    return arr;
  }
}, []);
// XXX - tänne saakka Expandable-mallista

// if (allCards.length > 0) {
  return (
    <>
        {allCards.length > 0 ? (
          <div>
            <h1><nobr style={{ cursor: 'pointer'}}
            onClick={() => setShowAllCards(!showAllCards)}>Show all cards</nobr>        
            </h1>
          
            {showAllCards &&
            <div className='table'>
                <TableAllCards tbodyData={allCards} setQuery={setQuery} renderRowSubComponent={subTable} expandRows expandedRowObj={expandedRows} />
            </div>}
          </div>

        ) : (
          <span>
            <em>...searching for the data...</em>
          </span>
        )}

        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        {/* <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowAllCards(!showAllCards)}>All cards</nobr>
        </h1> */}

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {/* {
          <input placeholder="Search cards by name" value={search} onChange={handleSearchInputChange} />
        } */}

        {/* {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          showAllCards && allCards && allCards.map(c => 
            {
              const lowerCaseName = c.name.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <AllCard key={c.id} allCard={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />
            )
              }
            }
            )
        } */}

    </>
  )
// } else {
//   return (
//     <div>      
//       <p>*** now loading ***</p>
//     </div>
//   )
// }
}

export default AllCardsList