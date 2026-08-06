import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const imageColumnVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.55,
            delayChildren: 0.15,
        },
    },
};

const mainImageVariants = {
    hidden: { opacity: 0, x: -120, scale: 1.08, filter: "blur(10px)" },
    show: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1.8, ease: EASE_OUT_EXPO },
    },
};

const secondaryImageVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1.6, ease: EASE_OUT_EXPO },
    },
};

const textColumnVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.28,
            delayChildren: 0.4,
        },
    },
};

const textItemVariants = {
    hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 1.5, ease: EASE_OUT_EXPO },
    },
};

const featuresContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.22, delayChildren: 0.15 },
    },
};

const featureItemVariants = {
    hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 1.3, ease: EASE_OUT_EXPO },
    },
};

export default function About({ data }) {
    return (
        <div className="bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image column — slides in from the LEFT */}
                    <motion.div
                        className="relative h-75 sm:h-100 md:h-125 order-2 md:order-1"
                        variants={imageColumnVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.div
                            variants={mainImageVariants}
                            whileHover={{ scale: 1.03 }}
                            transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 20,
                            }}
                            className="w-full h-full overflow-hidden will-change-transform"
                        >
                            <motion.img
                                alt="Blue Logistics team in meeting"
                                className="w-full h-full object-cover"
                                src={data.mainImage}
                                initial={{ scale: 1.12 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 3.6,
                                    ease: EASE_OUT_EXPO,
                                }}
                            />
                        </motion.div>

                        <motion.div
                            variants={secondaryImageVariants}
                            whileHover={{
                                y: -6,
                                scale: 1.04,
                                transition: {
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 16,
                                },
                            }}
                            className="absolute -bottom-6 -right-4 sm:-right-6 w-32 sm:w-40 h-24 sm:h-28 shadow-lg hidden sm:block will-change-transform overflow-hidden"
                        >
                            <img
                                alt="The Blue Logistics team is celebrating."
                                className="w-full h-full object-cover"
                                src={data.secondaryImage}
                            />
                        </motion.div>

                        {/* Decorative accent that draws in once the images land */}
                        <motion.div
                            aria-hidden
                            className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-accent/60 hidden md:block"
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: 1.5,
                                ease: EASE_OUT_EXPO,
                                delay: 0.9,
                            }}
                        />
                    </motion.div>

                    {/* Text column — slides in from the RIGHT */}
                    <motion.div
                        className="order-1 md:order-2"
                        variants={textColumnVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.span
                            variants={textItemVariants}
                            className="text-accent text-sm font-light tracking-[0.2em] uppercase inline-block"
                        >
                            {data.badge}
                        </motion.span>
                        <motion.h2
                            variants={textItemVariants}
                            className="heading-2 text-primary mt-3 mb-6"
                        >
                            {data.heading}
                        </motion.h2>
                        <motion.p
                            variants={textItemVariants}
                            className="text-gray-600 font-light leading-relaxed mb-8"
                        >
                            {data.description}
                        </motion.p>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
                            variants={featuresContainerVariants}
                        >
                            {data.features.map((f) => (
                                <motion.div
                                    key={f.title}
                                    variants={featureItemVariants}
                                    whileHover={{
                                        x: 4,
                                        borderColor:
                                            "var(--color-accent, currentColor)",
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 18,
                                        },
                                    }}
                                    className="border-l-2 border-accent pl-4 will-change-transform"
                                >
                                    <h4 className="text-primary font-medium mb-1">
                                        {f.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm font-light">
                                        {f.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.a
                            variants={textItemVariants}
                            whileHover={{ x: 6 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                            }}
                            className="inline-flex items-center text-primary font-light tracking-wider uppercase text-sm hover:text-accent transition-colors"
                            href={data.cta.href}
                        >
                            {data.cta.text}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-2 w-4 h-4"
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </motion.svg>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
