import { Link } from "react-router";
import { motion } from "framer-motion";
import Icon from "../components/Icon";

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

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: EASE_OUT_EXPO },
    },
};

const numberVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 1.4, ease: EASE_OUT_EXPO },
    },
};

export default function NotFound() {
    return (
        <section className="min-h-screen bg-linear-to-br from-blue-950 via-blue-800 to-blue-600 relative overflow-hidden text-white flex items-center">
            {/* Decorative blurred orbs */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="container-custom relative z-10 py-24 text-center"
            >
                {/* 404 number */}
                <motion.h1
                    variants={numberVariants}
                    className="text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none text-white/95 tracking-tight"
                >
                    404
                </motion.h1>

                {/* Badge */}
                <motion.span
                    variants={itemVariants}
                    className="inline-block mt-4 text-accent text-xs md:text-sm font-medium tracking-[0.25em] uppercase"
                >
                    Page not found
                </motion.span>

                {/* Heading */}
                <motion.h2
                    variants={itemVariants}
                    className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                >
                    Oops! This route doesn't exist.
                </motion.h2>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="mx-auto my-8 h-px w-20 bg-white/40"
                />

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="mx-auto max-w-2xl text-base md:text-lg leading-8 text-white/80 font-light"
                >
                    The page you're looking for may have been moved, renamed, or
                    never existed. Check the address or head back to the home
                    page.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
                >
                    <motion.div
                        whileHover={{
                            y: -3,
                            scale: 1.03,
                            transition: { duration: 0.25, ease: EASE_OUT_EXPO },
                        }}
                        whileTap={{
                            scale: 0.97,
                            transition: { duration: 0.12 },
                        }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center bg-white px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary transition-colors duration-300 hover:bg-gray-100 md:px-9 md:py-4 md:text-sm"
                        >
                            <Icon
                                name="arrow_back"
                                size={16}
                                className="mr-2 h-4 w-4"
                            />
                            Back to home
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}