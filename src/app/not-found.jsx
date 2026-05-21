"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <span className="text-9xl font-black text-indigo-100 dark:text-indigo-900/20">404</span>
                <div className="-mt-16 sm:-mt-24">
                    <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Page Not Found</h1>
                    <p className="mt-4 text-lg text-muted-foreground">The lesson you&apos;re looking for doesn&apos;t seem to be in our curriculum.</p>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl transition-all hover:bg-indigo-700"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                    <Link
                        href="/tutors"
                        className="flex items-center gap-2 rounded-2xl border bg-card px-8 py-4 font-bold text-foreground transition-all hover:bg-muted"
                    >
                        <Search size={20} />
                        Search Tutors
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
