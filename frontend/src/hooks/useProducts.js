import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../services/products.api";

export function useProducts({ page, limit, filters }) {
    const [rawProducts, setRawProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchProducts({ page, limit, filters });

                setRawProducts(data.data);
                setPagination(data.pagination);
            } catch {
                setError("Unable to load products");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [page, limit, filters]);

    const products = useMemo(() => {
        return rawProducts.map((product) => ({ ...product }));
    }, [rawProducts]);

    return { products, pagination, loading, error };
}
