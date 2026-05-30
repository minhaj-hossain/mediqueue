import { motion } from 'framer-motion'


const TutorHeader = () => {
    return (
        <div className="mb-20 text-left">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 mb-4"
            >
                The Expert Directory
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black tracking-tight text-foreground leading-none"
            >
                Find your <span className="text-teal-600">mentor.</span>
            </motion.h1>
            <p className="mt-8 text-xl text-foreground/40 font-medium max-w-2xl leading-relaxed">
                Every session is a deliberate step toward mastery. Browse our curated directory of elite educators.
            </p>
        </div>
    );
};

export default TutorHeader;