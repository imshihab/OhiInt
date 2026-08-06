import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -20 },
    show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
};

// Parses strings like "25+", "15,000+", "120+", "98%" into { value, suffix }.
// If the number can't be parsed, returns null so we just render the original string.
function parseStat(raw) {
    if (typeof raw !== "string") return null;
    const match = raw.match(/^([\d,]+)(.*)$/);
    if (!match) return null;
    const numeric = parseInt(match[1].replace(/,/g, ""), 10);
    if (Number.isNaN(numeric)) return null;
    return { value: numeric, suffix: match[2] || "", original: raw };
}

function AnimatedNumber({ value, suffix, original }) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (latest) => {
        // Re-add commas for thousands
        const intPart = Math.floor(latest);
        return intPart.toLocaleString("en-US");
    });
    const [display, setDisplay] = useState(prefersReducedMotion ? value.toLocaleString("en-US") : "0");

    useEffect(() => {
        const unsub = rounded.on("change", (v) => setDisplay(v));
        return unsub;
    }, [rounded]);

    useEffect(() => {
        if (!inView) return;
        if (prefersReducedMotion) {
            motionValue.set(value);
            return;
        }
        const controls = animate(motionValue, value, {
            duration: 1.6,
            ease: EASE_OUT_EXPO,
        });
        return controls.stop;
    }, [inView, value, motionValue, prefersReducedMotion]);

    // If parsing failed earlier, fallback
    if (original == null) return original;

    return (
        <span ref={ref} className="inline-flex items-baseline">
            <span>{display}</span>
            <span>{suffix}</span>
        </span>
    );
}

export default function Stats({ data }) {
    return (
        <section className="py-12 md:py-16 bg-white border-y border-gray-100 overflow-hidden">
            <motion.div
                className="container-custom"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {data.map((stat, i) => {
                        const parsed = parseStat(stat.number);
                        return (
                            <motion.div
                                key={stat.label}
                                variants={cardVariants}
                                whileHover={{
                                    y: -6,
                                    transition: { type: "spring", stiffness: 280, damping: 18 },
                                }}
                                className="text-center will-change-transform"
                            >
                                <motion.div
                                    variants={iconVariants}
                                    whileHover={{
                                        rotate: [0, -10, 10, -6, 6, 0],
                                        transition: { duration: 0.8 },
                                    }}
                                    className="inline-block"
                                >
                                    <Icon
                                        name={stat.icon}
                                        size={24}
                                        className="text-accent mx-auto mb-3"
                                    />
                                </motion.div>
                                <p className="text-3xl md:text-4xl font-serif gradient-text mb-1">
                                    {parsed ? (
                                        <AnimatedNumber
                                            value={parsed.value}
                                            suffix={parsed.suffix}
                                            original={parsed.original}
                                        />
                                    ) : (
                                        stat.number
                                    )}
                                </p>
                                <p className="text-gray-500 text-sm font-light">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
