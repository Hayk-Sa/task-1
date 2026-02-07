import { memo } from "react";

function ProductCard({ product }) {
    const { name, brand, category, price = 0, rating = 0, imageUrl } = product;

    return (
        <article className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={imageUrl}
                    alt={`${name} product image`}
                    loading="lazy"
                />
            </div>

            <div className="product-content">
                <h3 className="product-title">{name}</h3>
                <p className="product-brand">
                    {brand} • {category}
                </p>
                <p className="product-rating">⭐ {rating.toFixed(1)}</p>
                <p className="product-price">${price.toFixed(2)}</p>
            </div>
        </article>
    );
}

export default memo(ProductCard, (prev, next) => prev.product === next.product);
