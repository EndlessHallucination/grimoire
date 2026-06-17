import SnippetCard from "./SnippetCard"

const SnippetList = ({ snippets = [], deleteSnippet }) => {
    return (
        <div>
            {
                snippets.map(snippet =>
                    <SnippetCard
                        key={snippet.id}
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