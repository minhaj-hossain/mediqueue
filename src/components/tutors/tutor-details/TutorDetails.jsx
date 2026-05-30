'use client';
import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, AlertCircle } from 'lucide-react';
import { authClient } from '@/lib/auth-client';


import BookingModal from './BookingModal';
import SessionInfoCard from './SessionInfoCard';
import AvailabilityCard from './AvaibilityCard';
import TutorProfileCard from './TutorProfileCard';
import { PageLoader } from './ui-helpers';
import NotFound from '@/app/not-found';


export default function TutorDetails({ id }) {


    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchTutor = async () => {
            const { data: tokenData } = await authClient.token();
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
                    headers: { Authorization: `Bearer ${tokenData?.token}` },
                });
                const data = await res.json();

                let availableDays = [];
                try {
                    const parsed = JSON.parse(data.availableDays);
                    availableDays = Array.isArray(parsed) ? parsed : [];
                } catch {
                    availableDays = typeof data.availableDays === 'string'
                        ? data.availableDays.split(/[\s,\-]+/).map(d => d.trim()).filter(Boolean)
                        : [];
                }

                setTutor({ ...data, availableDays });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTutor();
    }, [id]);

    if (loading) return <PageLoader />;
    if (!tutor) return <NotFound />;

    const sessionDate = tutor.sessionStartDate ? new Date(tutor.sessionStartDate) : null;
    const isFullyBooked = tutor.totalSlot === 0;
    const isDateBlocked = sessionDate && new Date() < sessionDate;
    const isBookingBlocked = isFullyBooked || isDateBlocked;

    const bookingBlockMessage = isFullyBooked
        ? "This session is fully booked. You can't join at the moment."
        : isDateBlocked
            ? `Booking opens on ${sessionDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`
            : null;

    const handleBookingSuccess = () => {
        setTutor(prev => ({ ...prev, totalSlot: prev.totalSlot - 1 }));
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-muted/30 pt-28 pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">

                <TutorProfileCard tutor={tutor} isFullyBooked={isFullyBooked} />

                <div className="grid gap-6 md:grid-cols-2">
                    <AvailabilityCard
                        availableDays={tutor.availableDays}
                        availableTimeStart={tutor.availableTimeStart}
                        availableTimeEnd={tutor.availableTimeEnd}
                    />
                    <SessionInfoCard tutor={tutor} sessionDate={sessionDate} />
                </div>

                <AnimatePresence>
                    {bookingBlockMessage && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800"
                        >
                            <AlertCircle size={20} className="shrink-0 text-amber-500" />
                            <p className="font-medium">{bookingBlockMessage}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={isBookingBlocked}
                    onClick={() => setModalOpen(true)}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-teal-600 py-5 text-xl font-foreground text-background shadow-xl shadow-teal-500/25 transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Users size={24} />
                    {isFullyBooked ? 'No Slots Available' : isDateBlocked ? 'Booking Not Open Yet' : 'Book a Session'}
                </motion.button>
            </div>

            <AnimatePresence>
                {modalOpen && (
                    <BookingModal
                        tutor={tutor}
                        user={user}
                        onClose={() => setModalOpen(false)}
                        onSuccess={handleBookingSuccess}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}