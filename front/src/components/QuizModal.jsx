import { useState } from "react";

const QuizModal = ({ snippet, onClose, onNext }) => {
    const { id, code, explanation } = snippet;

    const [attempt, setAttempt] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [revealed, setRevealed] = useState(false);

    const handleCheck = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/quiz/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ attempt }),
            });

            const data = await res.json();
            setEvaluation(data.evaluation);
        } catch (err) {
            console.error("Evaluation failed:", err);
        }
    };

    const handleReveal = () => {
        setRevealed(true);
    };

    const resetAndNext = () => {
        setAttempt("");
        setEvaluation(null);
        setRevealed(false);

        if (onNext) {
            onNext();
        }
    };

    const handleClose = () => {
        setAttempt("");
        setEvaluation(null);
        setRevealed(false);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Quiz</h2>

                {/* only hide explanation before any interaction */}
                {!evaluation && (
                    <p className="snippet-explanation">
                        {explanation}
                    </p>
                )}

                <textarea
                    className="form-textarea code-input"
                    value={attempt}
                    onChange={(e) => setAttempt(e.target.value)}
                    placeholder="Write the code from memory..."
                />

                {/* PRE-CHECK ACTIONS */}
                {!evaluation && (
                    <div className="modal-actions">
                        <button className="btn btn-primary" onClick={handleCheck}>
                            Check
                        </button>

                        {onNext && (
                            <button className="btn" onClick={resetAndNext}>
                                Skip
                            </button>
                        )}
                    </div>
                )}

                {/* VERDICT (appears when evaluation exists) */}
                {evaluation && (
                    <div className="quiz-result">
                        <p className={`quiz-match ${evaluation?.match ? "correct" : "incorrect"}`}>
                            {evaluation?.match ? "Correct" : "Not quite"}
                        </p>

                        {!evaluation?.match && evaluation?.hint && (
                            <p className="quiz-hint">
                                Hint: {evaluation.hint}
                            </p>
                        )}

                        {/* Reveal is now explicit and separate */}
                        {!revealed && (
                            <button className="btn" onClick={handleReveal}>
                                Reveal Code
                            </button>
                        )}

                        {revealed && (
                            <pre className="snippet-code">
                                {code}
                            </pre>
                        )}
                    </div>
                )}

                {/* ALWAYS AVAILABLE EXIT */}
                <div className="modal-actions">
                    <button className="btn" onClick={handleClose}>
                        Close
                    </button>

                    {/* Next depends on evaluation, not reveal */}
                    {evaluation && onNext && (
                        <button className="btn btn-primary" onClick={resetAndNext}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizModal;