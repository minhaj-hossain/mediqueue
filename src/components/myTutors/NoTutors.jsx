import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NoTutors = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <GraduationCap size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">You haven&apos;t listed any tutors yet</h3>
            <p className="mt-4 max-w-sm text-muted-foreground">Start sharing your expertise with the world today. Your listings will appear here.</p>
            <Link href="/add-tutor" className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-indigo-700">
                Create Your First Listing
            </Link>
        </div>
    );
};

export default NoTutors;