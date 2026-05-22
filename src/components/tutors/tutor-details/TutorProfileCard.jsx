import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap, Star, MapPin, BookOpen } from 'lucide-react';
import { MetaChip } from './ui-helpers';

export default function TutorProfileCard({ tutor, isFullyBooked }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border bg-card shadow-xl overflow-hidden"
        >
            <div className="h-32 bg-linear-to-r from-teal-600 to-violet-600" />
            <div className="px-8 pb-8">
                <div className="relative -mt-16 mb-4 flex items-end justify-between">
                    <Image
                        src={tutor.tutorPhoto }
                        alt={tutor.tutorName}
                        width={112}
                        height={112}
                        className="h-28 w-28 rounded-2xl border-4 border-card object-cover shadow-lg"
                    />
                    <span className={`mb-2 rounded-xl px-4 py-1.5 text-sm font-bold ${isFullyBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {isFullyBooked ? 'Fully Booked' : `${tutor.totalSlot} Slots Left`}
                    </span>
                </div>
                <h1 className="text-3xl font-black text-foreground">{tutor.tutorName}</h1>
                <p className="mt-1 text-lg font-semibold text-teal-600">{tutor.subject}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <MetaChip icon={<GraduationCap size={15} />} label={tutor.institution || 'N/A'} />
                    <MetaChip icon={<Star size={15} />} label={`${tutor.experience} experience`} />
                    <MetaChip icon={<MapPin size={15} />} label={tutor.location || 'Remote'} />
                    <MetaChip icon={<BookOpen size={15} />} label={tutor.teachingMode} />
                </div>
            </div>
        </motion.div>
    );
}