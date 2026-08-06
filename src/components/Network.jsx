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
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
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

// ---------- Left column (image + cities) ----------
const leftColumnVariants = {
    hidden: { opacity: 0, x: -70, filter: "blur(10px)" },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 1.5, ease: EASE_OUT_EXPO },
    },
};

const imageKenBurns = {
    hidden: { scale: 1.12 },
    show: {
        scale: 1,
        transition: { duration: 6, ease: EASE_OUT_EXPO },
    },
};

const citiesContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.55,
        },
    },
};

const cityVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.92, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
};

// ---------- Right column (routes) ----------
const routesContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.25,
        },
    },
};

const routeVariants = {
    hidden: { opacity: 0, x: 70, filter: "blur(10px)" },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 1.2, ease: EASE_OUT_EXPO },
    },
};

// ---------- Component ----------
export default function Network({ data }) {
    return (
        <div className="bg-white relative overflow-hidden">
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
                        className="text-accent text-xs md:text-sm tracking-[0.25em] uppercase font-medium"
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

                    <motion.p
                        variants={headerItemVariants}
                        className="mt-6 max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-8 font-light"
                    >
                        {data.description}
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                    {/* LEFT — image + cities */}
                    <motion.div
                        variants={leftColumnVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <div className="relative overflow-hidden rounded-3xl shadow-xl group">
                            {/* Ken-Burns inner image */}
                            <motion.img
                                variants={imageKenBurns}
                                src={data.image}
                                alt="Commercial port"
                                className="w-full h-80 md:h-105 object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />

                            {/* Soft accent halo on hover */}
                            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/40 transition-all duration-500" />
                        </div>

                        <motion.div
                            variants={citiesContainerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8"
                        >
                            {data.cities.map((city) => (
                                <motion.div
                                    key={city}
                                    variants={cityVariants}
                                    whileHover={{
                                        y: -3,
                                        transition: {
                                            duration: 0.25,
                                            ease: "easeOut",
                                        },
                                    }}
                                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-3 hover:border-accent/50 hover:bg-white hover:shadow-md transition-colors duration-300"
                                >
                                    <div className="w-3 h-3 rounded-full bg-accent shrink-0" />

                                    <span className="text-sm md:text-base text-gray-700 font-medium">
                                        {city}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — routes */}
                    <motion.div
                        variants={routesContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-6"
                    >
                        {data.routes.map((r, i) => (
                            <motion.div
                                key={i}
                                variants={routeVariants}
                                whileHover={{
                                    y: -4,
                                    transition: {
                                        duration: 0.3,
                                        ease: EASE_OUT_EXPO,
                                    },
                                }}
                                className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-primary/20 hover:shadow-xl transition-colors duration-300 overflow-hidden"
                            >
                                {/* Hover glow halo */}
                                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />

                                <div className="relative flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <motion.div
                                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-accent/10 transition-colors duration-500"
                                            whileHover={{ rotate: 6 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: EASE_OUT_EXPO,
                                            }}
                                        >
                                            <Icon
                                                name={r.icon}
                                                size={22}
                                                className="text-primary transition-colors duration-300 group-hover:text-accent"
                                            />
                                        </motion.div>

                                        <div>
                                            <div className="flex items-center gap-3 text-lg font-semibold text-primary">
                                                <span>{r.from}</span>

                                                <motion.span
                                                    className="inline-flex"
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 4 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: EASE_OUT_EXPO,
                                                    }}
                                                >
                                                    <Icon
                                                        name="arrow_forward"
                                                        size={18}
                                                        className="text-accent"
                                                    />
                                                </motion.span>

                                                <span>{r.to}</span>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {r.mode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-6 ml-16 flex flex-wrap gap-8">
                                    <div className="flex items-center gap-2 text-gray-500 group-hover:text-primary transition-colors duration-300">
                                        <Icon name="schedule" size={16} />
                                        <span className="text-sm">
                                            {r.duration}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500 group-hover:text-primary transition-colors duration-300">
                                        <Icon name="sync" size={16} />
                                        <span className="text-sm">
                                            {r.frequency}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
