"use client";

import { motion } from "framer-motion";
import { User, Clock, DollarSign, BookOpen, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

import Image from "next/image";



export default function TutorCard({ tutor }) {
    const {
        _id,
        tutorName,
        tutorPhoto,
        subject,
        hourlyFee,
        totalSlot,
        teachingMode,
        experience,
        institution
    } = tutor;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-5 transition-all hover:premium-shadow"
        >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem]">
                <Image
                    src={tutorPhoto || `https://picsum.photos/seed/${tutorName}/800/600`}
                    alt={tutorName}
                    fill
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-black backdrop-blur-md">
                    {teachingMode}
                </div>
            </div>

            <div className="mt-8 flex grow flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-display font-black text-black leading-tight">
                            {tutorName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-teal-accent" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-teal-accent">{subject}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-display font-black text-black">${hourlyFee}</span>
                        <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest">/ hr</p>
                    </div>
                </div>

                <div className="space-y-3 mt-2">
                    <div className="flex items-center gap-3 text-xs font-bold text-black/40">
                        <BookOpen size={16} className="text-black/10" />
                        <span className="truncate">{institution}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-black/40">
                        <Clock size={16} className="text-black/10" />
                        <span>{experience} Exp</span>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-1">Availability</span>
                        <span className={`
                            text-xs font-black uppercase tracking-widest ${totalSlot > 0 ? "text-teal-accent" : "text-red-500"}
                        `}>
                            {totalSlot > 0 ? `${totalSlot} Slots` : "Sold Out"}
                        </span>
                    </div>
                    <Link
                        href={`/tutors/${_id}`}
                        className="rounded-2xl bg-black px-6 py-3.5 text-xs font-black text-white transition-all hover:bg-teal-accent hover:scale-105 active:scale-95"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
