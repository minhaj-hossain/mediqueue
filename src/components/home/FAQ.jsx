"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "How do I book a session?",
            answer: "Browse our elite tutor list, select a mentor that aligns with your goals, and secure your slot instantly. No complex funnels, just direct access."
        },
        {
            question: "Are the tutors verified?",
            answer: "Every educator on MediQueue undergoes a rigorous multi-stage verification process, including identity checks, academic credential validation, and peer reviews."
        },
        {
            question: "Can I cancel a booking?",
            answer: "You can manage and cancel bookings directly from your centralized dashboard. We recommend cancellations at least 24 hours in advance to respect mentor availability."
        },
        {
            question: "What is your satisfaction guarantee?",
            answer: "We offer a 100% excellence guarantee. If your interaction doesn't meet our standards, our success team will ensure you find a more suitable match immediately."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="bg-white py-40">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-accent mb-4">Support Hub</div>
                    <h2 className="text-5xl font-display font-black text-black">Common questions.</h2>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="overflow-hidden rounded-[2rem] border border-black/5 bg-white transition-all hover:premium-shadow">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-8 text-left transition-colors"
                            >
                                <span className="text-lg font-display font-black text-black">{faq.question}</span>
                                <ChevronDown
                                    className={`text-black/20 transition-transform duration-500 ${activeIndex === index ? "rotate-180 text-teal-accent" : ""}`}
                                    size={20}
                                />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        className="border-t border-black/5"
                                    >
                                        <div className="p-8 text-lg font-medium leading-relaxed text-black/40">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
