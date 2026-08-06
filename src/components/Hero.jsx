import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

function Particle({ style }) {
    return (
        <motion.div
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={style}
            animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.6, 1],
            }}
            transition={{
                duration: style.__duration,
                delay: style.__delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

function VideoBackdrop({ video }) {
    const sources = useMemo(() => {
        if (Array.isArray(video)) {
            return video.filter(Boolean);
        }
        if (typeof video === "string" && video.length > 0) {
            return [video];
        }
        return [];
    }, [video]);

    const [index, setIndex] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        setIndex((i) => (sources.length === 0 ? 0 : i % sources.length));
    }, [sources]);

    const handleEnded = () => {
        if (sources.length > 1) {
            setIndex((i) => (i + 1) % sources.length);
        }
    };

    if (sources.length === 0) {
        return (
            <motion.div
                className="absolute inset-0 bg-primary video-watermark-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
            />
        );
    }
    return (
        <motion.div
            className="absolute inset-0 bg-primary video-watermark-cover overflow-hidden"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
        >
            <AnimatePresence mode="sync">
                <motion.video
                    key={sources[index] + "-" + index}
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    playsInline
                    preload="auto"
                    muted
                    loop={sources.length === 1}
                    onEnded={handleEnded}
                    style={{ opacity: 0.7 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <source src={sources[index]} type="video/mp4" />
                </motion.video>
            </AnimatePresence>
        </motion.div>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.22,
            delayChildren: 0,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.6,
            ease: EASE_OUT_EXPO,
        },
    },
};

const ctaContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.28, delayChildren: 0.15 },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.3, ease: EASE_OUT_EXPO },
    },
};

const titleLeftVariants = {
    hidden: { opacity: 0, x: -80, filter: "blur(10px)", rotate: -3 },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        rotate: 0,
        transition: { duration: 1.7, ease: EASE_OUT_EXPO },
    },
};

const titleRightVariants = {
    hidden: { opacity: 0, x: 80, filter: "blur(10px)", rotate: 3 },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        rotate: 0,
        transition: { duration: 1.7, ease: EASE_OUT_EXPO, delay: 0.28 },
    },
};

export default function Hero({ data }) {
    const [seeds, setSeeds] = useState([]);
    const [navReady, setNavReady] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const generated = Array.from({ length: 12 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            offset: (Math.random() - 0.5) * 60,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 2,
        }));
        setSeeds(generated);
    }, []);

    useEffect(() => {
        const onNavDone = () => setNavReady(true);
        window.addEventListener("navbar-animation-complete", onNavDone);
        const fallback = setTimeout(() => setNavReady(true), 1500);
        return () => {
            window.removeEventListener("navbar-animation-complete", onNavDone);
            clearTimeout(fallback);
        };
    }, []);

    const particleStyles = useMemo(
        () =>
            seeds.map((p) => ({
                left: `${p.left}%`,
                top: `${p.top}%`,
                transform: `translateY(${p.offset}px)`,
                __duration: prefersReducedMotion ? 0 : p.duration,
                __delay: prefersReducedMotion ? 0 : p.delay,
            })),
        [seeds, prefersReducedMotion],
    );

    return (
        <div
            id="hero"
            className="relative h-screen w-full overflow-hidden bg-primary"
        >
            <VideoBackdrop video={data.video} />

            <div className="absolute inset-0 pointer-events-none">
                {particleStyles.map((style, i) => (
                    <Particle key={i} style={style} />
                ))}
            </div>

            <motion.div
                className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/50 to-primary/90 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1 }}
            />

            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
                variants={containerVariants}
                initial="hidden"
                animate={navReady ? "show" : "hidden"}
            >
                <motion.div
                    className="mb-4 sm:mb-6 md:mb-8"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                >
                    <motion.img
                        alt="hero logo"
                        className="h-16 sm:h-18 md:h-20 w-auto object-contain mx-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                        src={data.logo}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>

                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl custom:text-5xl lg:text-7xl xl:text-8xl font-serif font-light text-white mb-3 sm:mb-4 tracking-wider text-center px-4">
                    <motion.span
                        className="inline-block"
                        variants={titleLeftVariants}
                        initial="hidden"
                        animate={navReady ? "show" : "hidden"}
                    >
                        {data.titlePart1}
                    </motion.span>
                    <motion.span
                        className="inline-block ml-3 bg-linear-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
                        variants={titleRightVariants}
                        initial="hidden"
                        animate={navReady ? "show" : "hidden"}
                    >
                        {data.titlePart2}
                    </motion.span>
                </motion.h1>

                <motion.div
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 font-light tracking-[0.2em] sm:tracking-[0.3em] text-center uppercase px-4"
                    variants={itemVariants}
                >
                    {data.subtitle.map((item, i) => (
                        <span key={item}>
                            {i > 0 && (
                                <span className="text-white/40"> | </span>
                            )}
                            <span className="inline-block mx-2">{item}</span>
                        </span>
                    ))}
                </motion.div>

                <motion.p
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-8 sm:mb-10 md:mb-12 font-light text-center max-w-xl lg:max-w-2xl px-4"
                    variants={itemVariants}
                >
                    {data.description}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4"
                    variants={ctaContainerVariants}
                >
                    <motion.a
                        href={data.primaryCta.href}
                        className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-white text-primary font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm text-center"
                        variants={ctaVariants}
                        whileHover={{
                            scale: 1.06,
                            y: -2,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 18,
                        }}
                    >
                        {data.primaryCta.text}
                    </motion.a>
                    <motion.a
                        href={data.secondaryCta.href}
                        className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-transparent border border-white/50 text-white font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm backdrop-blur-sm text-center"
                        variants={ctaVariants}
                        whileHover={{
                            scale: 1.06,
                            backgroundColor: "rgba(255,255,255,1)",
                            color: "#000",
                            y: -2,
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 18,
                        }}
                    >
                        {data.secondaryCta.text}
                    </motion.a>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    variants={itemVariants}
                >
                    <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center mouse-scroll-container">
                        <motion.div
                            className="w-0.5 h-3 bg-white/70 rounded-full mt-2 scroll-mouse"
                            animate={
                                prefersReducedMotion
                                    ? {}
                                    : { y: [0, 14, 0], opacity: [1, 0, 1] }
                            }
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
