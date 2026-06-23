import SnippetCard from "./SnippetCard"

const SnippetList = ({ snippets = [], deleteSnippet }) => {
    return (
        <div className="snippet-grid">
            {
                snippets.map(snippet =>
                    <SnippetCard
                        key={snippet.id}
                        id={snippet.id}
                        name={snippet.name}
                        code={snippet.code}
                        explanation={snippet.explanation}
                        tags={snippet.tags}
                        deleteSnippet={() => deleteSnippet(snippet.id)}
                    />
                )
            }
        </div>
    )
}

export default SnippetList