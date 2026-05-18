'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="w-full max-w-5xl rounded-2xl bg-white/40 backdrop-blur-sm border border-black/5 py-4 px-8 shadow-sm transition-all duration-500">
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-accent text-white shadow-lg shadow-teal-accent/20 transition-transform group-hover:scale-110">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-lg font-display font-black tracking-tighter text-black">
                            MEDI<span className="text-teal-accent">QUEUE</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation (Matches Screenshot) */}
                    <div className="hidden items-center gap-10 md:flex">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="text-sm font-medium text-teal-accent transition-all">
                                Home
                            </Link>
                            <Link href="/tutors" className="text-sm font-medium text-black/60 transition-all hover:text-teal-accent">
                                Tutors
                            </Link>
                        </div>

                        {/* Right Actions Divider and Buttons */}
                        <div className="flex items-center gap-5 border-l border-black/5 pl-8">
                            <button className="rounded-full p-2 text-black/60 transition-colors hover:bg-black/5 hover:text-black" aria-label="Toggle theme">
                                <Moon size={18} />
                            </button>

                            <Link href="/login" className="rounded-xl bg-black px-6 py-2.5 text-xs font-bold text-white shadow-xl shadow-black/10 transition-all hover:bg-teal-accent hover:scale-105 active:scale-95">
                                Join Now
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggles */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button className="rounded-full p-2 text-black/60">
                            <Moon size={20} />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-xl p-2 text-black/60 hover:bg-black/5"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="mt-4 overflow-hidden rounded-2xl border-t border-black/5 bg-white md:hidden">
                        <div className="space-y-1 p-4">
                            <Link href="/" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3.5 text-sm font-bold text-teal-accent bg-teal-accent/10 transition-all">
                                Home
                            </Link>
                            <Link href="/tutors" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3.5 text-sm font-bold text-black/60 hover:bg-black/5 hover:text-black transition-all">
                                Tutors
                            </Link>
                            <Link href="/login" onClick={() => setIsOpen(false)} className="mt-4 block w-full rounded-xl bg-black py-4 text-center text-sm font-bold text-white shadow-xl shadow-black/10">
                                Join Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}