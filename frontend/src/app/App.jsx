import { useCallback, useState } from "react";
import Filters from "../components/Filters/Filters";
import ProductsGrid from "../components/Products/ProductsGrid";
import ProductsPagination from "../components/Products/ProductsPagination";
import { useFilters } from "../hooks/useFilters";
import { useProducts } from "../hooks/useProducts";
import "./App.css";

const INITIAL_FILTERS = {
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
};

function App() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const { filtersMeta, loading: filtersLoading, error: filtersError } = useFilters();

    const {
        products,
        pagination,
        loading: productsLoading,
        error: productsError,
    } = useProducts({
        page,
        limit,
        filters,
    });

    const loading = filtersLoading || productsLoading;
    const error = filtersError || productsError;

    const currentPage = pagination.page ?? 1;
    const totalPages = pagination.totalPages ?? 1;
    const totalItems = pagination.total ?? 0;

    const handleLimitChange = useCallback((value) => {
        setLimit(value);
        setPage(1);
    }, []);

    const handleFilterChange = useCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    }, []);

    const handleResetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setPage(1);
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Shop Premium Products</h1>
                <p>Explore our curated collection of electronics, footwear, and clothing with smart filtering</p>
            </header>

            <main className="layout">
                <button 
                    className="mobile-filter-toggle"
                    onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                    {mobileFiltersOpen ? "✕ Close Filters" : "☰ Filters"}
                </button>

                <Filters
                    filtersMeta={filtersMeta}
                    loading={loading}
                    values={filters}
                    limit={limit}
                    onLimitChange={handleLimitChange}
                    onChange={handleFilterChange}
                    onReset={handleResetFilters}
                    mobileOpen={mobileFiltersOpen}
                    onMobileClose={() => setMobileFiltersOpen(false)}
                />

                <section className="products-section">
                    {error && <div className="error-banner">{error}</div>}

                    <div className="products-header">
                        <div>
                            <h2>Products</h2>
                            <p className="products-meta">
                                {loading
                                    ? "Loading products..."
                                    : `Showing page ${currentPage} of ${totalPages} (${totalItems} items)`}
                            </p>
                        </div>
                    </div>

                    <ProductsGrid products={products} loading={loading} />

                    <ProductsPagination
                        page={currentPage}
                        totalPages={totalPages}
                        loading={loading}
                        onPageChange={setPage}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;
