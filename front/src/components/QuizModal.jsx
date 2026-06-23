import { useState } from "react";

const QuizModal = ({ id, code, explanation, isOpen, onClose }) => {
    const [attempt, setAttempt] = useState("");
    const [revealed, setRevealed] = useState(false);
    const [evaluation, setEvaluation] = useState(null);

    if (!isOpen) return null;

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
            setRevealed(true);
        } catch (err) {
            console.error("Evaluation failed:", err);
        }
    };

    const handleClose = () => {
        setAttempt("");
        setRevealed(false);
        setEvaluation(null);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Quiz</h2>

                {!revealed &&
                    <p className="snippet-explanation">{explanation}</p>
                }

                <textarea
                    className="form-textarea"
                    value={attempt}
                    onChange={(e) => setAttempt(e.target.value)}
                    placeholder="Write the code from memory..."
                    disabled={revealed}
                />

                {!revealed && (
                    <button
                        className="btn btn-primary"
                        onClick={handleCheck}
                    >Check</button>
                )}

                {revealed && (
                    <div className="quiz-result">
                        <p className={`quiz-match ${evaluation?.match ? "correct" : "incorrect"}`}>
                            {evaluation?.match ? "Correct" : "Not quite"}
                        </p>
                        {!evaluation?.match && evaluation?.hint && (
                            <p className="quiz-hint">Hint: {evaluation.hint}</p>
                        )}
                        <pre className="snippet-code">{code}</pre>
                    </div>
                )}

                <button className="btn"
                    onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default QuizModal;