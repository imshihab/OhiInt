import React from "react";

// --- BUTTON ---
export const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const base =
        "px-6 py-4 font-black uppercase tracking-wider transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-sm border-2 border-neo-black shadow-neo flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-neo-yellow text-neo-black",
        dark: "bg-neo-black text-white",
        outline: "bg-white text-neo-black",
        blue: "bg-neo-blue text-white",
        green: "bg-neo-green text-white",
        red: "bg-neo-red text-white",
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

// --- CARD ---
export const Card = ({ children, variant = "default", className = "", ...props }) => {
    const base = "border-2 border-neo-black p-6";
    const variants = {
        default: "bg-white shadow-neo",
        dark: "bg-neo-black text-white shadow-neo",
        yellow: "bg-neo-yellow text-neo-black shadow-neo",
        flat: "bg-transparent shadow-none p-0 border-none",
    };
    return (
        <div className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

// --- INPUT ---
export const Input = ({ className = "", ...props }) => (
    <input
        className={`w-full bg-white border-2 border-neo-black shadow-neo p-4 font-medium text-base outline-none focus:ring-0 focus:shadow-neo-hover transition-shadow placeholder:text-neo-black/40 ${className}`}
        {...props}
    />
);

// --- TEXTAREA ---
export const Textarea = ({ className = "", rows = 3, ...props }) => (
    <textarea
        rows={rows}
        className={`w-full bg-white border-2 border-neo-black shadow-neo p-4 font-medium text-base outline-none focus:ring-0 focus:shadow-neo-hover transition-shadow placeholder:text-neo-black/40 resize-y ${className}`}
        {...props}
    />
);

// --- TYPOGRAPHY ---
export const Title = ({ children, className = "" }) => (
    <h1
        className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none ${className}`}
    >
        {children}
    </h1>
);

export const Subtitle = ({ children, className = "" }) => (
    <p className={`text-base md:text-lg font-medium text-neo-black/80 ${className}`}>
        {children}
    </p>
);

// --- BADGE ---
export const Badge = ({ children, variant = "default", className = "" }) => {
    const variants = {
        default: "bg-neo-yellow text-neo-black",
        dark: "bg-neo-black text-white",
        blue: "bg-neo-blue text-white",
        green: "bg-neo-green text-white",
        red: "bg-neo-red text-white",
        gray: "bg-neo-gray text-neo-black",
    };
    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-neo-black ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};

// --- SIDEBAR ITEM ---
export const SidebarItem = ({ active, children, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`block w-full text-left px-4 py-3 mb-2 text-sm font-bold uppercase tracking-wider border-2 border-neo-black transition-transform active:translate-x-px active:translate-y-px ${active
            ? "bg-neo-yellow text-neo-black shadow-neo"
            : "bg-white text-neo-black hover:bg-neo-gray/30"
            } cursor-pointer ${className}`}
    >
        {children}
    </button>
);
