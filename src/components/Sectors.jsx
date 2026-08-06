import { motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const headerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
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
            staggerChildren: 0.1,
            delayChildren: 0.25,
        },
    },
};

const sectorVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.9, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

export default function Sectors({ data }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="relative overflow-hidden py-20 text-white">
            {/* Decorative ambient glow that drifts */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
                animate={
                    prefersReducedMotion
                        ? {}
                        : {
                              x: [0, 60, -40, 0],
                              y: [0, -30, 40, 0],
                              scale: [1, 1.1, 0.95, 1],
                          }
                }
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
                animate={
                    prefersReducedMotion
                        ? {}
                        : {
                              x: [0, -50, 30, 0],
                              y: [0, 40, -20, 0],
                              scale: [1, 0.95, 1.1, 1],
                          }
                }
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="container-custom relative">
                <motion.div
                    className="text-center mb-12"
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <motion.span
                        variants={headerItemVariants}
                        className="text-white/60 text-base font-light tracking-[0.2em] uppercase inline-block"
                    >
                        {data.badge}
                    </motion.span>
                    <motion.h2
                        variants={headerItemVariants}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-3 mb-6"
                    >
                        {data.heading}
                    </motion.h2>
                    <motion.div
                        variants={headerItemVariants}
                        className="flex justify-center"
                    >
                        <motion.div
                            className="h-px w-24 bg-linear-to-r from-transparent via-white/60 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: 1.4,
                                ease: EASE_OUT_EXPO,
                                delay: 0.5,
                            }}
                            style={{ originX: 0.5 }}
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {data.items.map((item) => (
                        <motion.div
                            key={item.label}
                            variants={sectorVariants}
                            whileHover={{
                                y: -8,
                                transition: {
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 16,
                                },
                            }}
                            className="text-center group cursor-pointer will-change-transform"
                        >
                            <motion.div
                                className="relative w-14 h-14 mx-auto mb-3 flex items-center justify-center"
                                whileHover="hover"
                            >
                                {/* Orbital ring that draws on hover */}
                                <motion.div
                                    aria-hidden
                                    className="absolute inset-0 rounded-full border border-white/30"
                                    initial={{ scale: 1, opacity: 0 }}
                                    variants={{
                                        hover: {
                                            scale: 1.25,
                                            opacity: 1,
                                            transition: { duration: 0.5, ease: EASE_OUT_EXPO },
                                        },
                                    }}
                                />
                                {/* Soft halo */}
                                <motion.div
                                    aria-hidden
                                    className="absolute inset-0 rounded-full bg-white/0"
                                    variants={{
                                        hover: {
                                            backgroundColor: "rgba(255,255,255,0.15)",
                                            transition: { duration: 0.5 },
                                        },
                                    }}
                                />
                                {/* Icon tile */}
                                <motion.div
                                    className="relative w-14 h-14 rounded-full bg-white/10 flex items-center justify-center overflow-hidden"
                                    variants={{
                                        hover: {
                                            backgroundColor: "rgba(255,255,255,0.25)",
                                            transition: { duration: 0.4 },
                                        },
                                    }}
                                >
                                    <motion.span
                                        className="text-white/80"
                                        variants={{
                                            hover: {
                                                scale: 1.15,
                                                color: "#ffffff",
                                                transition: { type: "spring", stiffness: 320, damping: 18 },
                                            },
                                        }}
                                    >
                                        <Icon
                                            name={item.icon}
                                            size={24}
                                            filled={false}
                                        />
                                    </motion.span>
                                </motion.div>
                            </motion.div>

                            <motion.p
                                className="text-white/70 text-base font-light"
                                variants={{
                                    hover: { color: "#ffffff" },
                                }}
                            >
                                {item.label}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
