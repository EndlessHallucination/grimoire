const FilterBar = ({ searchTerm, setSearchTerm, tagsArr, selectedTag, setSelectedTag }) => {

    const handleChange = (event) => {
        setSelectedTag(event.target.value)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
            />

            <label htmlFor="tags">Choose a tag: </label>

            <select
                id="tags"
                value={selectedTag || ""}
                onChange={handleChange}>
                <option value="">Show All</option>
                {tagsArr.map(tag =>
                    <option key={tag} value={tag}>{tag}</option>
                )}
            </select>
        </div >
    )
}
export default FilterBar