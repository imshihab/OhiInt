import { motion } from "framer-motion";
import Icon from "./Icon";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const headerContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
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

const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.25,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

export default function Services({ data }) {
    return (
        <div className="bg-secondary/30 overflow-hidden">
            <div className="container-custom">
                <motion.div
                    className="text-center mb-16"
                    variants={headerContainerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.span
                        variants={headerItemVariants}
                        className="text-accent text-sm font-light tracking-[0.2em] uppercase inline-block"
                    >
                        {data.badge}
                    </motion.span>

                    <motion.h2
                        variants={headerItemVariants}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-primary mt-3 mb-6"
                    >
                        {data.heading}
                    </motion.h2>

                    <motion.div
                        variants={headerItemVariants}
                        className="flex justify-center"
                    >
                        <motion.div
                            className="divider"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: 1.2,
                                ease: EASE_OUT_EXPO,
                                delay: 0.4,
                            }}
                            style={{ originX: 0.5, originY: 0.5 }}
                        />
                    </motion.div>

                    <motion.p
                        variants={headerItemVariants}
                        className="text-gray-600 font-light mt-6 max-w-2xl mx-auto"
                    >
                        {data.description}
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {data.items.map((s, i) => (
                        <motion.div
                            key={s.title}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                borderColor: "rgba(31, 58, 95, 0.35)",
                                transition: {
                                    type: "spring",
                                    stiffness: 240,
                                    damping: 18,
                                },
                            }}
                            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 will-change-transform hover:shadow-2xl"
                        >
                            {/* Glow halo on hover */}
                            <motion.div
                                aria-hidden
                                className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary/10 blur-2xl"
                                initial={{ opacity: 0, scale: 0.6 }}
                                whileHover={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    ease: EASE_OUT_EXPO,
                                }}
                            />

                            {/* Icon tile */}
                            <motion.div
                                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 overflow-hidden relative"
                                whileHover={{
                                    backgroundColor: "#1f3a5f",
                                    scale: 1.08,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 18,
                                    },
                                }}
                            >
                                <motion.span
                                    className="text-primary group-hover:text-white"
                                    whileHover={{ color: "#ffffff" }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Icon name={s.icon} size={24} />
                                </motion.span>
                            </motion.div>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-semibold tracking-tight text-primary">
                                {s.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-6 text-sm leading-7 text-gray-600">
                                {s.description}
                            </p>

                            {/* Link */}
                            <motion.a
                                href={s.href}
                                whileHover={{ x: 4 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 320,
                                    damping: 20,
                                }}
                                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary"
                            >
                                Learn More
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{
                                        duration: 1.6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Icon name="arrow_forward" size={18} />
                                </motion.span>
                            </motion.a>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                        duration: 1,
                        ease: EASE_OUT_EXPO,
                        delay: 0.3,
                    }}
                >
                    <motion.a
                        href={data.viewAllCta.href}
                        whileHover={{
                            backgroundColor: "#1f3a5f",
                            color: "#ffffff",
                            scale: 1.04,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 18,
                        }}
                        className="btn border border-primary bg-transparent text-primary inline-block"
                    >
                        {data.viewAllCta.text}
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}
