function FiltersHeader({ title, onReset, loading, onMobileClose }) {
    return (
        <div className="filters-header">
            <h2>{title}</h2>
            <div className="filters-header-actions">
                {onReset && (
                    <button
                        className="link-button"
                        onClick={onReset}
                        disabled={loading}
                    >
                        Reset
                    </button>
                )}
                {onMobileClose && (
                    <button
                        className="mobile-close-button"
                        onClick={onMobileClose}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export default FiltersHeader;
