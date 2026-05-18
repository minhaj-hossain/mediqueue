import { LogoFacebook, LogoGithub, LogoLinkedin } from '@gravity-ui/icons';
import { BookOpen, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


const Footer = () => {
    return (
        <footer className="border-t border-black/5 bg-white pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-x-20 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-accent text-white shadow-lg shadow-teal-accent/20">
                                <BookOpen size={16} />
                            </div>
                            <span className="text-lg font-display font-black tracking-tight text-black">
                                MEDI<span className="text-teal-accent">QUEUE</span>
                            </span>
                        </Link>
                        <p className="text-sm font-medium leading-relaxed text-black/40">
                            The premium marketplace for elite educators. Accelerate your potential through targeted mentorship and world-class guidance.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-black/20 transition-colors hover:text-teal-accent">
                                <LogoFacebook size={20} />
                            </a>
                            <a href="#" className="text-black/20 transition-colors hover:text-teal-accent">
                                <LogoLinkedin size={20} />
                            </a>
                            <a href="#" className="text-black/20 transition-colors hover:text-teal-accent">
                                <LogoGithub size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-black">Solutions</h4>
                        <ul className="space-y-4 text-xs font-bold text-black/40 uppercase tracking-widest">
                            <li><Link href="/tutors" className="transition-colors hover:text-teal-accent">Find Mentor</Link></li>
                            <li><Link href="/add-tutor" className="transition-colors hover:text-teal-accent">Teach Now</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-teal-accent">Curriculum</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-teal-accent">Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-black">Platform</h4>
                        <ul className="space-y-4 text-xs font-bold text-black/40 uppercase tracking-widest">
                            <li><Link href="#" className="transition-colors hover:text-teal-accent">Our Vision</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-teal-accent">Security</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-teal-accent">Terms</Link></li>
                            <li><Link href="#" className="transition-colors hover:text-teal-accent">Privacy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-black">Contact</h4>
                        <ul className="space-y-4 text-xs font-bold text-black/40 uppercase tracking-widest">
                            <li className="flex items-center gap-3">
                                <MapPin size={14} className="text-teal-accent" />
                                <span>San Francisco, CA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={14} className="text-teal-accent" />
                                <span>hello@mediqueue.ai</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 border-t border-black/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/20">
                        &copy; {new Date().getFullYear()} MediQueue. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/10">Status: Operational</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/10">v2.0.4</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;