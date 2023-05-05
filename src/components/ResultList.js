export default function ResultList(props) {
    return (
        <div className='ResultList'>
            <ul>
                {props.searchResults.map(function (resultCards) {
                    return <li key={resultCards.id}>
                        {resultCards.name} | {resultCards.setName}
                    </li>
                })}
            </ul>
        </div>
    )
}