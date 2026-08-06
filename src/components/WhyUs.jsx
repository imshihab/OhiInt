import { motion } from "framer-motion";

const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const imageVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function WhyUs({ data }) {
    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <span className="text-accent text-sm font-light tracking-[0.2em] uppercase">
                            {data.badge}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-primary mt-3 mb-8">
                            {data.heading}
                        </h2>
                        <div className="space-y-6">
                            {data.items.map((item, i) => (
                                <motion.div
                                    key={item.number}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={itemVariants}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0 mt-1 bg-linear-to-br from-blue-950 via-blue-800 to-blue-600">
                                        <span className="text-white font-bold text-sm">
                                            {item.number}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-primary font-medium mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 font-light text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageVariants}
                        className="relative h-87.5 sm:h-112.5 md:h-125"
                    >
                        <img
                            alt="Tracking device"
                            className="w-full h-full object-cover"
                            src={data.image}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
