import { FiLoader } from "react-icons/fi";

const Loader = ({ label = "Loading...", size = 48, className = "" }) => {
    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center gap-4 ${className}`}
            role="status"
            aria-live="polite"
        >
            <div className="relative">
                {/* Soft pulsing glow behind the icon */}
                <div
                    className="absolute inset-0 rounded-full bg-accent/30 blur-xl loader-pulse"
                    style={{ width: size, height: size }}
                />
                {/* Spinning icon */}
                <FiLoader
                    className="relative text-accent loader-spin"
                    style={{ width: size, height: size }}
                    aria-hidden="true"
                />
            </div>

            {/* Bouncing dots under the label for extra liveliness */}
            <div className="flex items-center gap-2">
                <span
                    className="h-2 w-2 rounded-full bg-accent loader-dot"
                    style={{ animationDelay: "0s" }}
                />
                <span className="h-2 w-2 rounded-full bg-accent loader-dot loader-dot-2" />
                <span className="h-2 w-2 rounded-full bg-accent loader-dot loader-dot-3" />
            </div>

            <span className="text-sm font-medium text-gray-500 tracking-wide">
                {label}
            </span>
        </div>
    );
};

export default Loader;
