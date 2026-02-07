import "./Products.css";

function ProductsPagination({
    page = 1,
    totalPages = 1,
    loading,
    onPageChange,
}) {
    const canGoPrev = page > 1;
    const canGoNext = page < totalPages;

    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" aria-label="Products pages">
            <button
                type="button"
                disabled={!canGoPrev || loading}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </button>

            <div className="page-indicators">
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === page;
                    return (
                        <button
                            key={pageNum}
                            type="button"
                            className={`page-dot ${isActive ? "active" : ""}`}
                            onClick={() => onPageChange(pageNum)}
                            disabled={loading}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                disabled={!canGoNext || loading}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </nav>
    );
}

export default ProductsPagination;
