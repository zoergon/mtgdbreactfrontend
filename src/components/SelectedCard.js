export default function SelectedCard(props) {
    return (
        <div className='SelectedCard'>
            <ul>
                {props.selected.map(function (resultCards) {
                    return <li key={resultCards.id}>
                        {resultCards.name} | {resultCards.setName}
                    </li>
                })}
            </ul>
        </div>
    )
}