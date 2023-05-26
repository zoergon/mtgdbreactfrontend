import { ColumnFilter } from './ColumnFilter'
import DecksService from '../services/Decks'
import DeckEdit from '../DeckEdit'
import DecksList from '../DecksList'

export const COLUMNS =  [
    {
        id: 'deckId', // luultavimmin voi poistaa
        Header: 'deckId',
        Footer: 'deckId',
        accessor: 'deckId',
        // Filter: ColumnFilter,
        // disableFilters: true
    },
    {
        Header: 'Deck',
        Footer: 'Deck',
        accessor: 'name',        
    },
    {
        Header: 'Format',
        Footer: 'Format',
        accessor: 'format',
    },
    {
        Header: 'loginId',
        Footer: 'loginId',
        accessor: 'loginId',
    },
    {
        width: 100,
        Header: ('Manage'),
        // accessor: 'action',
        Cell: row =>
          row.isSelected ? (
            <div className="d-flex justify-content-center">
              <DeckEdit
                buttonLabel={('Edit')}
                // selected={[row.original.acronym, row.original.name]}
                selected={[row.original.deckId]}
              />
              {/* <SellingModal buttonLabel={('Delete')} /> */}
            </div>
          ) : (
            <div>                
              <button className="button" >{('Edit')}</button>
              {/* <button className="btn btn-success mx-1" >{('Edit')}</button> */}
              {/* <button className="btn btn-danger mx-1">{('Delete')}</button> */}
            </div>
          ),
      },
]