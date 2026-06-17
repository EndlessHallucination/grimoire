const SnippetCard = ({ id, name, code, explanation, tags, deleteSnippet }) => {
    return (
        <div>
            <h2>{name}</h2>
            {<p>{code}</p>}
            <p>{explanation}</p>
            <p>{tags.map(t =>
                <span
                    key={t}>
                    {t}
                </span>
            )}</p>

            <button onClick={deleteSnippet}>Delete Snippet</button>
        </div>
    )
}
export default SnippetCard