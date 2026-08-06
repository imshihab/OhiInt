import { motion } from "framer-motion";
import Icon from "./Icon";
import SocialIcon from "./SocialIcons";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
    },
};

export default function Footer({ data }) {
    return (
        <footer className="gradient-bg text-white">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="container-custom py-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <motion.div variants={slideUpVariants} className="lg:col-span-1">
                        <img
                            alt="Footer logo"
                            className="h-14 w-auto object-contain mb-4 brightness-0 invert"
                            src={data.logo}
                        />
                        <p className="text-white/60 font-light mb-6">{data.tagline}</p>
                        <div className="flex space-x-4">
                            <a
                                href={data.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                            >
                                <SocialIcon name="facebook" size={18} />
                            </a>
                            <a
                                href={data.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                            >
                                <SocialIcon name="instagram" size={18} />
                            </a>
                        </div>
                    </motion.div>

                    {data.columns.map((col, i) => (
                        <motion.div key={i} variants={slideUpVariants}>
                            <h4 className="text-sm font-medium tracking-wider uppercase mb-4">
                                {col.heading}
                            </h4>
                            {col.isContact ? (
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href={`tel:${col.phone.replace(/\s/g, "")}`}
                                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light text-sm"
                                        >
                                            <Icon name="phone" filled={false} size={16} />
                                            {col.phone}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`mailto:${col.email}`}
                                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-light text-sm"
                                        >
                                            <Icon name="mail" filled={false} size={16} />
                                            {col.email}
                                        </a>
                                    </li>
                                    <li>
                                        <div className="flex items-start gap-3 text-white/60 font-light text-sm">
                                            <Icon name="location_on" size={16} filled={false} className="shrink-0 mt-0.5" />
                                            <span>
                                                {col.addressLine1}
                                                <br />
                                                {col.addressLine2}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.text}>
                                            <a
                                                className="text-white/60 hover:text-white transition-colors font-light text-sm"
                                                href={link.href}
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={slideUpVariants}
                    className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
                >
                    <div className="max-w-md w-full">
                        <h4 className="text-lg font-serif font-light mb-4">
                            {data.newsletter.heading}
                        </h4>
                        <p className="text-white/60 mb-6 text-sm font-light">
                            {data.newsletter.description}
                        </p>
                        <form
                            className="flex flex-col sm:flex-row gap-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                placeholder={data.newsletter.placeholder}
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors text-sm"
                                type="email"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-colors text-sm tracking-wider uppercase font-light cursor-pointer"
                            >
                                {data.newsletter.button}
                            </button>
                        </form>
                    </div>
                    <a
                        href={data.complaintsBookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity shrink-0"
                    >
                        <img
                            alt={data.complaintsBookAlt}
                            className="h-16 w-auto object-contain brightness-0 invert"
                            src={data.complaintsBookImage}
                        />
                    </a>
                </motion.div>
            </motion.div>

            <div className="bg-black/20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
                    className="container-custom py-6"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <p className="text-white/50 text-sm font-light">© {data.copyright}</p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
