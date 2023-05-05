export default function SearchBar(props) {

    // const baseUrl = "https://localhost:7120/api/decks"

    return (
        <div className='Search'>
            <form action='/' method='get'>
                <label htmlFor='header-search'>
                    <span className='visually-hidden'>Search for something</span>
                </label>
                <input
                className='SearchBar'
                type='text'
                id='header-search'
                placeholder='Search for something'
                name='Search Bar for something'
                onChange={props.handleChange}
                />
                <button className="SearchButton" type='button'>ETIPpÄ</button>
            </form>
        </div>
    )
}