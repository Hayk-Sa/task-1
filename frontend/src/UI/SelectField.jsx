function SelectField({
    id,
    label,
    value,
    options,
    onChange,
    disabled,
    placeholder,
}) {
    return (
        <div className="filter-group">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value ?? opt} value={opt.value ?? opt}>
                        {opt.label ?? opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;
