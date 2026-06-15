const SnippetCard = ({ id, name, code, explanation, tags }) => {
    return (
        <div>
            <h2>{name}</h2>
            {/* <p>{code}</p> */}
            <p>{explanation}</p>
            <p>{tags.map(t =>
                <span
                    key={t}>
                    {t}
                </span>
            )}</p>
        </div>
    )
}
export default SnippetCard