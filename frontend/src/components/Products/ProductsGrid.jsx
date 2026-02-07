import ProductCard from "./ProductsCard";
import "./Products.css";

function ProductsGrid({ products = [], loading }) {
    if (!loading && products.length === 0) {
        return (
            <div className="products-grid">
                <p className="empty-state">
                    No products match your filters. Try adjusting them.
                </p>
            </div>
        );
    }

    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}

            {loading && (
                <div className="loading-overlay">
                    <div className="spinner" />
                    <span>Loading products...</span>
                </div>
            )}
        </div>
    );
}

export default ProductsGrid;
