import { useState } from "react";
import AddSnippetModal from "./components/AddSnippetModal";
import FilterBar from "./components/FilterBar";
import SnippetList from "./components/SnippetList";
import QuizSession from "./components/QuizSession";
import useSnippets from "./hooks/useSnippets";
import Header from "./components/Header";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);
    const [isQuizSessionOpen, setIsQuizSessionOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const { data, loading, error, refetch, deleteSnippet } = useSnippets();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredSnippets = data.filter(snippet => {
        const matchesSearch =
            snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snippet.explanation.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTag = selectedTag
            ? snippet.tags.some(t => t === selectedTag)
            : true;

        return matchesSearch && matchesTag;
    });

    const tagsArr = Array.from(
        new Set(data.map(snippet => snippet.tags).flat())
    );



    return (
        <div className="app">
            <Header
                onQuizClick={() => setIsQuizSessionOpen(true)}
                onAddClick={() => setIsAddOpen(true)}
            />

            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                tagsArr={tagsArr}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
            />

            <SnippetList
                snippets={filteredSnippets}
                deleteSnippet={deleteSnippet}
            />

            <AddSnippetModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} refetch={refetch} />

            <QuizSession
                isOpen={isQuizSessionOpen}
                onClose={() => setIsQuizSessionOpen(false)}
                snippets={filteredSnippets}
            />
        </div>
    );
};

export default App;