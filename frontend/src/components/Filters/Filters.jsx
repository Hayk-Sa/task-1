import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import SelectField from "../../UI/SelectField";
import PriceRange from "../../UI/PriceRange";
import "./Filters.css";
import FiltersHeader from "../../UI/FiltersHeader";

const RATING_OPTIONS = [3, 3.5, 4, 4.5, 5];

function Filters({
    filtersMeta,
    values,
    onChange,
    onReset,
    loading,
    limit,
    onLimitChange,
    mobileOpen = false,
    onMobileClose,
}) {
    const [localPrice, setLocalPrice] = useState({
        min: values.minPrice,
        max: values.maxPrice,
    });

    const debouncedMin = useDebounce(localPrice.min, 500);
    const debouncedMax = useDebounce(localPrice.max, 500);

    useEffect(() => {
        setLocalPrice({ min: values.minPrice, max: values.maxPrice });
    }, [values.minPrice, values.maxPrice]);

    useEffect(() => {
        if (!filtersMeta) return;

        const min = debouncedMin || 0;
        const max = debouncedMax || filtersMeta.priceRange.max;

        if (min !== values.minPrice) onChange("minPrice", min);
        if (max !== values.maxPrice) onChange("maxPrice", max);
    }, [debouncedMin, debouncedMax]);

    useEffect(() => {
        if (!mobileOpen || !onMobileClose) return;
        const handleClickOutside = (e) => {
            if (!e.target.closest(".filters-panel")) onMobileClose();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileOpen, onMobileClose]);

    if (!filtersMeta) return null;

    const handlePriceChange = (field, raw) => {
        if (raw === "") {
            setLocalPrice((p) => ({ ...p, [field]: "" }));
            return;
        }
        const val = +raw;
        setLocalPrice((p) => {
            const otherField = field === "min" ? "max" : "min";
            const otherVal = p[otherField];
            if (field === "min" && otherVal !== "" && val > +otherVal)
                return { ...p, min: otherVal };
            if (field === "max" && otherVal !== "" && val < +otherVal)
                return { ...p, max: otherVal };
            return { ...p, [field]: val };
        });
    };

    return (
        <aside className={`filters-panel ${mobileOpen ? "mobile-open" : ""}`}>
            <FiltersHeader
                title="Filters"
                onReset={onReset}
                loading={loading}
                onMobileClose={onMobileClose}
            />

            <div className="filters-form">
                <SelectField
                    id="category"
                    label="Category"
                    value={values.category}
                    disabled={loading}
                    options={filtersMeta.categories}
                    onChange={(val) => onChange("category", val)}
                    placeholder="All categories"
                />

                <SelectField
                    id="brand"
                    label="Brand"
                    value={values.brand}
                    disabled={loading}
                    options={filtersMeta.brands}
                    onChange={(val) => onChange("brand", val)}
                    placeholder="All brands"
                />

                <PriceRange
                    label="Price range"
                    minValue={localPrice.min}
                    maxValue={localPrice.max}
                    onMinChange={(val) => handlePriceChange("min", val)}
                    onMaxChange={(val) => handlePriceChange("max", val)}
                    min={filtersMeta.priceRange.min}
                    max={filtersMeta.priceRange.max}
                    disabled={loading}
                />

                <SelectField
                    id="minRating"
                    label="Minimum rating"
                    value={values.minRating}
                    disabled={loading}
                    options={RATING_OPTIONS.map((r) => ({
                        value: r,
                        label: `${r}+`,
                    }))}
                    onChange={(val) => onChange("minRating", val)}
                    placeholder="Any rating"
                />

                <SelectField
                    id="limit"
                    label="Items per page"
                    value={limit}
                    disabled={loading}
                    options={[10, 20, 30, 50]}
                    onChange={(val) => onLimitChange(+val)}
                />
            </div>
        </aside>
    );
}

export default Filters;
