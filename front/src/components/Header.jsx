const Header = ({ onQuizClick, onAddClick }) => {
    return (
        <div className="app-header">
            <span className="app-title">GRIMOIRE</span>

            <div className="header-actions">
                <button className="btn btn-primary" onClick={onQuizClick}>
                    Start Quiz
                </button>

                <button className="btn btn-secondary" onClick={onAddClick}>
                    Add Snippet
                </button>
            </div>
        </div>
    );
};

export default Header;