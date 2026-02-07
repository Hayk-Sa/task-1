function PriceRange({
    label,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    min,
    max,
    disabled,
}) {
    return (
        <div className="filter-group">
            <label>{label}</label>
            <div className="range-row">
                <input
                    type="number"
                    value={minValue}
                    placeholder={min.toFixed(0)}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => onMinChange(e.target.value)}
                />
                <span className="range-separator">to</span>
                <input
                    type="number"
                    value={maxValue}
                    placeholder={max.toFixed(0)}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => onMaxChange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default PriceRange;
