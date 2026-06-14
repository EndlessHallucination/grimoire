import useSnippets from "./hooks/useSnippets";

const App = () => {
    const { data, loading, error } = useSnippets()
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
export default App