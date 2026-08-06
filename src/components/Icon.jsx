const Icon = ({ name, size = 24, className = "", filled = true }) => {
    return (
        <span
            className={`material-symbols-rounded ${className}`}
            style={{
                fontSize: size,
                // Toggle between filled and outlined icon style
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}`,
            }}
        >
            {name}
        </span>
    );
};

export default Icon;
