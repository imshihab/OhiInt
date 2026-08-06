import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const headingVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

const logoVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(4px)" },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
};

export default function Trust({ data }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="py-12 bg-white border-b border-gray-200 overflow-hidden">
            <motion.div
                className="container-custom"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.p
                    className="text-center text-gray-500 text-xs tracking-[0.2em] uppercase mb-8 font-light"
                    variants={headingVariants}
                >
                    {data.heading}
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {data.logos.map((name, i) => (
                        <motion.div
                            key={name}
                            variants={logoVariants}
                            whileHover={
                                prefersReducedMotion
                                    ? {}
                                    : {
                                          scale: 1.08,
                                          color: "var(--color-primary, #1f3a5f)",
                                          transition: {
                                              type: "spring",
                                              stiffness: 280,
                                              damping: 16,
                                          },
                                      }
                            }
                            whileTap={{ scale: 0.97 }}
                            className="text-gray-500 font-serif text-lg tracking-wider cursor-pointer will-change-transform"
                        >
                            {name}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
