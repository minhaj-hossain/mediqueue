'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Moon, Menu, X, Sun, LogOut, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const { data: session, isPending } = authClient.useSession();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Tutors", href: "/tutors" },
        // { name: "Add Tutor", href: "/add-tutor" },
        // { name: "My Tutors", href: "/my-tutors" },
    ];

    const authenticatedLinks = [
        { name: "Add Tutor", href: "/add-tutor" },
        { name: "My Tutors", href: "/my-tutors" },
        { name: "My Booked Sessions", href: "/my-booked-sessions" }
    ]


    const handleLogout = async () => {
        await authClient.signOut();
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="w-full max-w-5xl rounded-2xl bg-background/40 backdrop-blur-sm border border-foreground/5 py-4 px-8 shadow-sm transition-all duration-500">
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-accent text-background shadow-lg shadow-teal-accent/20 transition-transform group-hover:scale-110">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-lg font-display font-black tracking-tighter text-foreground">
                            MEDI<span className="text-teal-accent">QUEUE</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-all hover:text-teal-accent ${pathname === link.href ? 'text-teal-accent' : 'text-foreground/60'}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {session?.user &&
                            authenticatedLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-all hover:text-teal-accent ${pathname === link.href ? 'text-teal-accent' : 'text-foreground/60'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                    </div>

                    <div className="hidden items-center gap-10 md:flex">

                        <div className="flex items-center gap-5 border-l border-foreground/5 pl-8">
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="rounded-full p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {isPending ? (
                                <div className="h-8 w-8 animate-pulse rounded-full bg-foreground/5" />
                            ) : session?.user ? (

                                <div className='flex gap-3 items-center'>
                                    <span className="text-xs font-bold text-foreground">{session?.user?.name.split(" ")[0]}</span>


                                    <div className="group relative h-8 w-8">
                                        <button className="flex items-center gap-2 rounded-full bg-foreground/5 p-1 pr-3 transition-colors hover:bg-foreground/10">
                                            <Image
                                                src={session?.user?.image}
                                                alt={session?.user?.name}
                                                fill
                                                className="h-7 w-7 rounded-full border border-background object-cover"
                                            />

                                        </button>
                                        <div className="invisible absolute right-0 top-full mt-3 w-52 origin-top-right scale-95 rounded-2xl border bg-background p-2 opacity-0 premium-shadow transition-all group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                                            <div className="px-3 py-3">
                                                <p className="text-sm font-black text-foreground">{session?.user?.name}</p>
                                                <p className="truncate text-[10px] uppercase tracking-wider font-bold text-foreground/40 mt-0.5">{session?.user?.email}</p>
                                            </div>
                                            <div className="h-px bg-foreground/5 my-1 mx-2" />
                                            <Link href="/my-booked-sessions" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-teal-accent/10 hover:text-teal-accent transition-colors">
                                                <BookOpen size={16} />
                                                My Bookings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="rounded-xl bg-background px-6 py-2.5 text-xs font-bold text-foreground shadow-xl shadow-foreground/10 transition-all hover:bg-teal-accent hover:scale-105 active:scale-95"
                                >
                                    Join Now
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Toggles */}
                    <div className="flex items-center gap-3 md:hidden">
                        {/* <button className="rounded-full p-2 text-foreground/60">
                            <Moon size={20} />
                        </button> */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-xl p-2 text-foreground/60 hover:bg-foreground/5"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-4 overflow-hidden rounded-2xl border-t border-foreground/5 bg-background md:hidden"
                        >
                            <div className="space-y-1 p-4">
                                {navLinks.concat(session ? authenticatedLinks : []).map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`
                                            block rounded-xl px-4 py-3.5 text-sm font-bold transition-all${pathname === link.href
                                                ? "bg-teal-accent/10 text-teal-accent"
                                                : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {session && (
                                    <Link
                                        href="/my-booked-sessions"
                                        onClick={() => setIsOpen(false)}
                                        className={`
                                            block rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${pathname === "/my-booked-sessions" ? "bg-teal-accent/10 text-teal-accent" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}
                                        `}>

                                        My Bookings
                                    </Link>


                                )}

                                {!session && (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-4 block w-full rounded-xl bg-foreground py-4 text-center text-sm font-bold text-background shadow-xl shadow-foreground/10"
                                    >
                                        Get Started
                                    </Link>
                                )}

                                {session && (
                                    <button
                                        onClick={handleLogout}
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-4 text-sm font-bold text-red-500"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}