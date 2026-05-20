import { Languages, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';

const TrustSection = () => {
    return (
        <section className="py-32 bg-white ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-20">
                    <div className="flex flex-col gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-2xl font-display font-black text-black">Verified Expertise</h3>
                        <p className="text-black/40 leading-relaxed">Every tutor undergoes a rigorous multi-stage verification process to ensure top-tier educational standards.</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-2xl font-display font-black text-black">Immediate Access</h3>
                        <p className="text-black/40 leading-relaxed">Book sessions instantly and start learning within minutes. No bureaucratic hurdles, just direct connection.</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                            <Languages size={24} />
                        </div>
                        <h3 className="text-2xl font-display font-black text-black">Global Reach</h3>
                        <p className="text-black/40 leading-relaxed">Access world-class talent regardless of your geographic location. True borderless education for everyone.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;