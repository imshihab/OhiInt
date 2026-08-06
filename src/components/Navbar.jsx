import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Icon from "./Icon";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const navVariants = {
    hidden: { y: -24, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.05 },
    },
};

const desktopLinksContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const desktopLinkVariants = {
    hidden: { opacity: 0, y: -14, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: EASE_OUT_EXPO },
    },
};

const ctaVariants = {
    hidden: { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 } },
};

const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
    },
    show: {
        opacity: 1,
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        transition: {
            duration: 0.6,
            ease: EASE_OUT_EXPO,
            when: "beforeChildren",
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        transition: {
            duration: 0.4,
            ease: EASE_OUT_EXPO,
            when: "afterChildren",
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

const mobileHeaderVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const mobileLinkVariants = {
    hidden: { opacity: 0, x: -28, filter: "blur(6px)" },
    show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: EASE_OUT_EXPO },
    },
    exit: { opacity: 0, x: -16, transition: { duration: 0.25 } },
};

const mobileFooterVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
    exit: { opacity: 0, y: 16, transition: { duration: 0.25 } },
};

export default function Navbar({ data }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleNavComplete = () => {
        window.dispatchEvent(new CustomEvent("navbar-animation-complete"));
    };

    const linkHover = prefersReducedMotion
        ? {}
        : { scale: 1.06, transition: { type: "spring", stiffness: 320, damping: 18 } };

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate="show"
                className={`fixed inset-x-0 top-0 w-full overflow-x-hidden z-40 flex items-center h-26 transition-all duration-700 ease-out ${
                    scrolled ? "bg-white shadow-sm" : "bg-transparent"
                }`}
            >
                <div className="nav-container w-full">
                    <div className="flex items-center justify-between w-full min-w-0">
                        <motion.a
                            href="/"
                            className="shrink-0 block"
                            whileHover={{ opacity: 0.85 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                            <motion.img
                                src={data?.logo}
                                alt={data?.logoAlt || "Logo"}
                                className={`max-w-full h-14 xs:h-16 md:h-18 custom:h-16 lg:h-20 w-auto object-contain will-change-transform ${
                                    scrolled ? "" : "brightness-0 invert"
                                }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.9,
                                    ease: EASE_OUT_EXPO,
                                    delay: 0.15,
                                }}
                            />
                        </motion.a>

                        <motion.div
                            className="hidden lg:flex flex-1 items-center justify-center gap-6 lg:gap-9 min-w-0 overflow-hidden"
                            variants={desktopLinksContainerVariants}
                            initial="hidden"
                            animate="show"
                            onAnimationComplete={handleNavComplete}
                        >
                            {data?.links?.map((link) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    variants={desktopLinkVariants}
                                    whileHover={linkHover}
                                    whileTap={{ scale: 0.96 }}
                                    className={`relative whitespace-nowrap text-sm text-center font-light tracking-wider uppercase transition-colors duration-300 hover:opacity-100 ${
                                        scrolled ? "text-primary" : "text-white"
                                    }`}
                                >
                                    {link.title}
                                    <motion.span
                                        className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-px w-0 bg-current"
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                                    />
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            className="hidden lg:flex items-center shrink-0"
                            variants={ctaVariants}
                            initial="hidden"
                            animate="show"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                            <a
                                href={data?.cta?.href}
                                className={`text-xs py-3 px-6 lg:px-8 whitespace-nowrap transition-all duration-300 ${
                                    scrolled
                                        ? "text-primary hover:bg-primary hover:text-white"
                                        : "text-white hover:bg-white hover:text-primary"
                                }`}
                            >
                                {data?.cta?.text}
                            </a>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden shrink-0">
                            <motion.button
                                onClick={() => setMobileOpen(true)}
                                className={`p-2 ${
                                    scrolled ? "text-primary" : "text-white"
                                }`}
                                aria-label="Open menu"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                            >
                                <Icon name="menu" size={24} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="fixed inset-0 w-screen overflow-x-hidden z-50 lg:hidden bg-white"
                    >
                        <div className="flex flex-col h-full">
                            <motion.div
                                variants={mobileHeaderVariants}
                                className="flex items-center justify-between p-6 border-b border-gray-100"
                            >
                                <img
                                    src={data?.logo}
                                    alt={data?.logoAlt || "Logo"}
                                    className="h-12 w-auto max-w-full object-contain"
                                />

                                <motion.button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 text-primary rounded-lg hover:bg-gray-100"
                                    aria-label="Close menu"
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                                >
                                    <Icon name="close" size={24} />
                                </motion.button>
                            </motion.div>

                            <div className="flex-1 px-6 py-8 overflow-y-auto">
                                <div className="space-y-2">
                                    {data?.links?.map((link) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            variants={mobileLinkVariants}
                                            onClick={() => setMobileOpen(false)}
                                            whileHover={{ x: 6 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 320,
                                                damping: 22,
                                            }}
                                            className="block px-4 py-4 text-lg rounded-lg text-primary hover:bg-gray-50"
                                        >
                                            {link.title}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                variants={mobileFooterVariants}
                                className="p-6 border-t border-gray-100"
                            >
                                <a
                                    href={data?.cta?.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full py-4 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors"
                                >
                                    {data?.cta?.text}
                                </a>

                                {data?.phone && (
                                    <div className="mt-6 flex justify-center">
                                        <a
                                            href={`tel:${data.phone.replace(/\s+/g, "")}`}
                                            className="flex items-center gap-2 text-gray-500 hover:text-primary"
                                        >
                                            <Icon name="language" size={18} />
                                            <span>{data.phone}</span>
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}