import { ColumnFilter } from './ColumnFilter'

export const COLUMNS = [
    {
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
]