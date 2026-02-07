import { useEffect, useState } from "react";
import { fetchFilters } from "../services/products.api";

export function useFilters() {
    const [filtersMeta, setFiltersMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchFilters();
                setFiltersMeta(data);
            } catch {
                setError("Unable to load filters");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { filtersMeta, loading, error };
}
