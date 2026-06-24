import { useEffect, useState } from "react";
import QuizModal from "./QuizModal";

const QuizSession = ({ isOpen, onClose, snippets }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            setIsFinished(false);
        }
    }, [isOpen, snippets]);

    if (!isOpen) return null;

    const currentSnippet = snippets[currentIndex];
    const isLast = currentIndex === snippets.length - 1;

    const goNext = () => {
        if (isLast) {
            setIsFinished(true);
            return;
        }
        setCurrentIndex(i => i + 1);
    };

    const exitQuiz = () => {
        onClose();
    };

    if (!currentSnippet && !isFinished) return null;

    // ✅ FINISHED STATE now uses proper modal structure
    if (isFinished) {
        return (
            <div className="modal-overlay" onClick={exitQuiz}>
                <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                    <h2 className="modal-title">Quiz Complete 🎉</h2>

                    <p>
                        You went through {snippets.length} snippets.
                    </p>

                    <div className="modal-actions">
                        <button className="btn btn-primary" onClick={exitQuiz}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <QuizModal
            snippet={currentSnippet}
            onNext={goNext}
            onClose={exitQuiz}
        />
    );
};

export default QuizSession;