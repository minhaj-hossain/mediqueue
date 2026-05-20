import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import TutorCard from './TutorCard';

const FeaturedTutors = ({tutors}) => {
    return (
        <section className="py-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-8 mb-24 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-accent mb-4">Top Rated</div>
                        <h2 className="text-5xl font-display font-black tracking-tight text-black sm:text-6xl">Featured <br />Professionals.</h2>
                        <p className="mt-6 text-xl text-black/40 font-medium">Hand-picked expert tutors ready to help you succeed in your career transitions.</p>
                    </div>
                    <Link
                        href="/tutors"
                        className="group flex items-center gap-3 font-black text-black border-2 border-black/5 rounded-2xl px-6 py-4 transition-all hover:bg-black hover:text-white"
                    >
                        View Market
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {tutors?.length > 0 ? (
                        tutors.map((tutor) => (
                            <div
                                key={tutor._id}
                                
                            >
                                <TutorCard tutor={tutor} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-[3rem] border-2 border-dashed border-black/5 p-32 text-center bg-black/1">
                            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-black/5 text-black/20">
                                <Zap size={40} />
                            </div>
                            <p className="text-2xl font-black text-black/20 mb-8">The market is quiet today.</p>
                            <Link href="/add-tutor" className="rounded-2xl bg-black px-10 py-5 text-lg font-black text-white transition-all hover:scale-105 active:scale-95">Be the first listing</Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTutors;