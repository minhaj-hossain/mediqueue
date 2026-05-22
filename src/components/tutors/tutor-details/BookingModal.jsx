'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, GraduationCap, BookOpen, Users, Loader2, CheckCircle2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { ReadOnlyField } from './ui-helpers';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

 function BookingModal({ tutor, user, onClose, onSuccess }) {
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    const handleBook = async () => {
        const { data: tokenData } = await authClient.token();
        setError('');
        if (!phone.trim()) return setError('Phone number is required.');

        try {
            setSubmitting(true);
            const booking = {
                tutorId: tutor._id,
                userId: user?.id || 'guest',
                tutorName: tutor.tutorName,
                studentName: user?.name || '',
                studentEmail: user?.email || '',
                phone: phone.trim(),
                bookStatus: 'booked',
                bookedAt: new Date().toISOString(),
            };

            const bookRes = await fetch(`${SERVER_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(booking),
            });
            if (!bookRes.ok) throw new Error('Failed to create booking.');

            const slotRes = await fetch(`${SERVER_URL}/tutors/${tutor._id}/decrease-slot`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${tokenData?.token}` },
            });
            if (!slotRes.ok) throw new Error('Failed to update slot count.');

            setDone(true);
            setTimeout(() => onSuccess(), 1800);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/70"
            />
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-md"
                    >
                        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
                            <div className="mb-6 flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Book a Session</h2>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">with {tutor.tutorName}</p>
                                </div>
                                <button onClick={onClose} className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            {done ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center gap-3 py-8 text-center"
                                >
                                    <CheckCircle2 size={52} className="text-green-500" />
                                    <p className="text-xl font-black text-zinc-900 dark:text-white">Booking Confirmed!</p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Your session has been booked successfully.</p>
                                </motion.div>
                            ) : (
                                <div className="space-y-5">
                                    <ReadOnlyField label="Tutor" value={tutor.tutorName} icon={<GraduationCap size={16} />} />
                                    <ReadOnlyField label="Tutor ID" value={tutor._id} icon={<BookOpen size={16} />} />
                                    <ReadOnlyField label="Student Name" value={user?.name || '—'} icon={<Users size={16} />} />
                                    <ReadOnlyField label="Student Email" value={user?.email || '—'} icon={<BookOpen size={16} />} />

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500" size={16} />
                                            <input
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder="+880 1XXX-XXXXXX"
                                                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-teal-500 dark:focus:ring-teal-900/40"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                                            ⚠️ {error}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleBook}
                                        disabled={submitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 font-black text-white transition-all hover:bg-teal-700 disabled:opacity-60"
                                    >
                                        {submitting
                                            ? <><Loader2 size={20} className="animate-spin" /> Confirming…</>
                                            : 'Confirm Booking'
                                        }
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default BookingModal;