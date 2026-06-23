import { useState } from "react";

export default function AddSnippetModal({ refetch }) {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', code: '', explanation: '', tags: [] })
    const [tagInput, setTagInput] = useState("");

    function addTag() {
        if (!tagInput.trim()) return;

        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, tagInput.trim()]
        }));

        setTagInput("");
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/snippets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json()
            setFormData({ name: '', code: '', explanation: '', tags: [] })
            setIsOpen(false)

            refetch();
        } catch (error) {
            console.error(error)
        }


    }
    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={() => setIsOpen(true)}>
                Add Snippet
            </button>
            {isOpen && (
                <div
                    className="modal-overlay"
                    onClick={() => setIsOpen(false)}>
                    <div className="modal-panel"
                        onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close"
                            onClick={() => setIsOpen(false)}>
                            &times;
                        </button>
                        <h3 className="modal-title">Create Snippet</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label className="form-label" htmlFor="name">Snippet Name</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label className="form-label" htmlFor="code">Code</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    id="code"
                                    name="code"
                                    required
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label className="form-label" htmlFor="explanation">Explanation</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    id="explanation"
                                    name="explanation"
                                    required
                                    value={formData.explanation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label className="form-label" htmlFor="tags">Tags</label>
                                <div className="tag-input-row">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="tags"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                    />

                                    <button
                                        className="btn"
                                        type="button"
                                        onClick={addTag}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="snippet-tags">
                                    {formData.tags.map((tag, index) => (
                                        <span className="tag-pill" key={index}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">
                                Add Snippet
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}