import SnippetCard from "./SnippetCard"

const SnippetList = ({ snippets = [] }) => {
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
                    />
                )
            }
        </div>
    )
}

export default SnippetList