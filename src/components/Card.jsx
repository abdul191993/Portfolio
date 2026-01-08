import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export function Card({ title, subtitle, className, children }) {
    return (
        <motion.div
            className={cn(
                "relative overflow-hidden rounded-3xl bg-slate-900 border border-transparent p-6 transition-all duration-500 group",
                "hover:shadow-[0_10px_40px_-15px_rgba(255,1,79,0.3)] hover:-translate-y-1",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.005, 1],
                boxShadow: [
                    "0 0 0 0 rgba(0, 0, 0, 0)",
                    "0 0 40px 5px rgba(255, 1, 79, 0.3)",
                    "0 0 0 0 rgba(0, 0, 0, 0)"
                ]
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            transition={{
                default: { duration: 0.5 },
                scale: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                },
                boxShadow: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }
            }}
        >
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors font-sans">
                    {title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 font-mono uppercase tracking-wider">
                    {subtitle}
                </p>
                <div className="text-slate-300">
                    {children}
                </div>
            </div>

            {/* Background Gradient Effect - Reeni Style */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-all duration-500" />
        </motion.div>
    );
}
