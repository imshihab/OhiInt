import { motion } from "framer-motion";
import Icon from "./Icon";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

// ---------- Container ----------
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.05,
        },
    },
};

// ---------- Header items (heading, divider, description) ----------
const headerItemVariants = {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: EASE_OUT_EXPO },
    },
};

// Divider scales open from the center
const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.2 },
    },
};

// ---------- Buttons ----------
const buttonContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.45,
        },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

export default function CTA({ data }) {
    return (
        <div className="relative overflow-hidden py-16 md:py-24 lg:py-32">
            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="container-custom relative z-10"
            >
                <div className="mx-auto max-w-4xl text-center text-white">
                    <motion.h2
                        variants={headerItemVariants}
                        className="text-3xl font-light leading-tight md:text-4xl lg:text-5xl"
                    >
                        {data.heading}
                    </motion.h2>

                    <motion.div
                        variants={dividerVariants}
                        className="mx-auto my-6 h-px w-20 bg-white/40 md:my-8 origin-center"
                    />

                    <motion.p
                        variants={headerItemVariants}
                        className="mx-auto mb-8 max-w-2xl text-base leading-7 text-white/80 md:mb-10 md:text-lg lg:text-xl"
                    >
                        {data.description}
                    </motion.p>

                    <motion.div
                        variants={buttonContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
                    >
                        {/* Primary button */}
                        <motion.a
                            variants={buttonVariants}
                            href={data.primaryButton.href}
                            whileHover={{
                                y: -3,
                                scale: 1.03,
                                transition: {
                                    duration: 0.25,
                                    ease: EASE_OUT_EXPO,
                                },
                            }}
                            whileTap={{
                                scale: 0.97,
                                transition: { duration: 0.12 },
                            }}
                            className="group inline-flex items-center rounded-none bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:bg-gray-100 md:px-9 md:py-4 md:text-sm"
                        >
                            {data.primaryButton.text}

                            <motion.span
                                className="ml-3 inline-flex"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{
                                    duration: 0.3,
                                    ease: EASE_OUT_EXPO,
                                }}
                            >
                                <Icon
                                    name="arrow_right_alt"
                                    size={16}
                                    className="h-4 w-4"
                                />
                            </motion.span>
                        </motion.a>

                        {/* Secondary button */}
                        <motion.a
                            variants={buttonVariants}
                            href={`tel:${data.secondaryButton.tel}`}
                            whileHover={{
                                y: -3,
                                scale: 1.03,
                                transition: {
                                    duration: 0.25,
                                    ease: EASE_OUT_EXPO,
                                },
                            }}
                            whileTap={{
                                scale: 0.97,
                                transition: { duration: 0.12 },
                            }}
                            className="group inline-flex items-center border border-white/50 px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-primary md:px-9 md:py-4 md:text-sm"
                        >
                            <Icon
                                name="phone"
                                size={16}
                                className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                            />
                            {data.secondaryButton.text}
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
