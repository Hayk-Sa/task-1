export function buildProductsQuery({ page, limit, filters }) {
    const params = new URLSearchParams();

    Object.entries(filters ?? {}).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            params.set(key, value);
        }
    });

    if (page != null) params.set("page", page);
    if (limit != null) params.set("limit", limit);

    return params.toString();
}
