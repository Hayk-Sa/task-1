import { buildProductsQuery } from "../utils/buildProductsQuery";

const API_BASE_URL = "http://localhost:3001";

export async function fetchProducts({ page, limit, filters }) {
    const query = buildProductsQuery({ page, limit, filters });
    const res = await fetch(`${API_BASE_URL}/products?${query}`);
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
}

export async function fetchFilters() {
    const res = await fetch(`${API_BASE_URL}/filters`);
    if (!res.ok) throw new Error("Failed to load filters");
    return res.json();
}
