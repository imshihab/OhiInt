import { motion } from "framer-motion";
import Icon from "./Icon";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

// ---------- Header ----------
const headerContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.05,
        },
    },
};

const headerItemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: EASE_OUT_EXPO },
    },
};

const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.25 },
    },
};

// ---------- Cards ----------
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: EASE_OUT_EXPO },
    },
};

// ---------- Star rating ----------
const starContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.45,
        },
    },
};

const starVariants = {
    hidden: { opacity: 0, scale: 0.4, rotate: -30 },
    show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.5, ease: EASE_OUT_EXPO },
    },
};

export default function Testimonials({ data }) {
    return (
        <div className="bg-secondary/30 relative overflow-hidden">
            <div className="container-custom relative">
                {/* Header */}
                <motion.div
                    variants={headerContainerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        variants={headerItemVariants}
                        className="text-accent text-xs md:text-sm font-medium tracking-[0.25em] uppercase"
                    >
                        {data.badge}
                    </motion.span>

                    <motion.h2
                        variants={headerItemVariants}
                        className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight"
                    >
                        {data.heading}
                    </motion.h2>

                    <motion.div
                        variants={dividerVariants}
                        className="divider mt-6 origin-center"
                    />
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
                >
                    {data.items.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            whileHover={{
                                y: -10,
                                transition: {
                                    duration: 0.3,
                                    ease: EASE_OUT_EXPO,
                                },
                            }}
                            className="group relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:border-primary/10 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover glow halo */}
                            <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/20" />

                            {/* Quote icon + rating */}
                            <div className="relative flex items-center justify-between mb-6">
                                <motion.div
                                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 group-hover:bg-primary transition-colors duration-500"
                                    whileHover={{
                                        rotate: [0, -8, 8, 0],
                                        transition: {
                                            duration: 0.6,
                                            ease: EASE_OUT_EXPO,
                                        },
                                    }}
                                >
                                    <Icon
                                        name="format_quote"
                                        size={30}
                                        className="text-primary group-hover:text-white transition-colors duration-300"
                                    />
                                </motion.div>

                                {/* Rating — staggered star reveal */}
                                <motion.div
                                    variants={starContainerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.4 }}
                                    className="flex gap-1"
                                >
                                    {[...Array(5)].map((_, index) => (
                                        <motion.span
                                            key={index}
                                            variants={starVariants}
                                            className="inline-flex"
                                        >
                                            <Icon
                                                name="star"
                                                filled
                                                size={16}
                                                className="text-yellow-400 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Testimonial */}
                            <p className="relative text-gray-600 text-base leading-8 font-light mb-8">
                                “{t.quote}”
                            </p>

                            {/* Author */}
                            <div className="relative border-t border-gray-100 pt-6 flex items-center justify-between">
                                <div>
                                    <h4 className="text-lg font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
                                        {t.name}
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {t.role}
                                    </p>
                                </div>

                                <span className="text-sm font-medium text-accent text-right">
                                    {t.company}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
