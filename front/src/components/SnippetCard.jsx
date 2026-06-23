import { useState } from "react";
import QuizModal from "./QuizModal";

const SnippetCard = ({ id, name, code, explanation, tags, deleteSnippet }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="snippet-card">
            <h2 className="snippet-name">{name}</h2>
            <pre className="snippet-code">{code}</pre>
            <p className="snippet-explanation">{explanation}</p>
            <ul className="snippet-tags">
                {tags.map((t) => <li key={t} className="tag-pill">{t}</li>)}
            </ul>

            <div className="snippet-actions">
                <button className="btn" onClick={() => setIsOpen(true)}>QUIZ</button>
                <button className="btn btn-danger" onClick={deleteSnippet}>DELETE</button>
            </div>

            {isOpen && (
                <QuizModal
                    id={id}
                    code={code}
                    explanation={explanation}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SnippetCard;