import AddSnippetModal from "./components/AddSnippetModal";
import SnippetList from "./components/SnippetList";
import useSnippets from "./hooks/useSnippets";

const App = () => {
    const { data, loading, error, refetch } = useSnippets()
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return (
        <div>
            <SnippetList snippets={data} />
            <AddSnippetModal refetch={refetch} />
        </div>
    )
}
export default App