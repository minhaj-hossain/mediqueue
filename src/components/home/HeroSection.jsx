"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function HeroSection() {
    const slides = [
        {
            image:
                "https://images.unsplash.com/photo-1589380905297-abf6a0a8e450?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            image:
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        },
        {
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
        },
    ];

    return (
        <section className="relative min-h-screen overflow-hidden">
        
            <div className="absolute inset-0 z-0">
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="h-full w-full"
                    style={{ height: "100%" }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} style={{ height: "100%" }}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={slide.image}
                                    alt="Hero Background"
                                    fill
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

           
            <div className="pointer-events-none absolute inset-0 z-10 bg-foreground/60" />
            <div className="pointer-events-none absolute top-0 right-0 z-10 h-125 w-125 rounded-full bg-teal-400/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-100 w-100 rounded-full bg-cyan-400/10 blur-[100px]" />


            <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
                <div className="mx-auto max-w-5xl text-center">
                
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-background/10 bg-background/10 px-4 py-2 backdrop-blur-md"
                    >
                        <Sparkles size={14} className="text-teal-300" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-background/80">
                            Premium Learning Platform
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-black leading-[0.95] tracking-tight text-background sm:text-6xl md:text-7xl lg:text-8xl"
                    >
                        Connect with{" "}
                        <span className="text-teal-300">elite tutors</span>
                        <br />
                        and unlock your potential.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-background/70 md:text-xl"
                    >
                        Personalized learning experiences designed to help students
                        achieve academic success with world-class mentors.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Link
                            href="/tutors"
                            className="group flex items-center gap-2 rounded-2xl bg-teal-500 px-8 py-4 text-lg font-bold text-background shadow-2xl shadow-teal-500/30 transition-all duration-300 hover:scale-105 hover:bg-teal-400"
                        >
                            Find Your Tutor
                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-2xl border border-background/15 bg-background/10 px-8 py-4 text-lg font-bold text-background backdrop-blur-md transition-all duration-300 hover:bg-background/20"
                        >
                            Become a Tutor
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-black tracking-widest text-background/30"
                    >
                        <span>TRUSTED BY 10,000+ STUDENTS</span>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
        .swiper-pagination {
          bottom: 40px !important;
          z-index: 30 !important;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 999px;
          background: background;
        }
      `}</style>
        </section>
    );
}