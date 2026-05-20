'use client'
import { use, useEffect, useState } from 'react';
import { authClient, useSession } from '@/lib/auth-client'; // adjust to your better-auth client path
import {
    MapPin, Clock, BookOpen, Star, Users, CalendarDays,
    GraduationCap, X, Loader2, CheckCircle2, AlertCircle, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const SERVER_URL = 'http://localhost:8000';

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function TutorDetailsPage() {


    const params = useParams();
    const id = params.id;

    const { data: session } = authClient.useSession();
    const user = session?.user;


    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch tutor by id
    // fetch(`${SERVER_URL}/tutors/${id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         let availableDays = [];
    //         try {
    //             const parsed = JSON.parse(data.availableDays);
    //             availableDays = Array.isArray(parsed) ? parsed : [];
    //         } catch {
    //             // plain string like "Sun - Thu" → split it into an array
    //             availableDays = typeof data.availableDays === 'string'
    //                 ? data.availableDays.split(/[\s,\-]+/).map(d => d.trim()).filter(Boolean)
    //                 : [];
    //         }
    //         setTutor({ ...data, availableDays });
    //     })
    //     .catch(console.error)
    //     .finally(() => setLoading(false));
    useEffect(() => {

        const fetchTutor = async () => {

            const { data: tokenData } = await authClient.token()
            console.log('Token data:', tokenData);

            try {

                setLoading(true);

                const res = await fetch(`${SERVER_URL}/tutors/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`
                    }
                });

                const data = await res.json();

                let availableDays = [];

                try {

                    const parsed = JSON.parse(data.availableDays);

                    availableDays = Array.isArray(parsed)
                        ? parsed
                        : [];

                } catch {

                    availableDays =
                        typeof data.availableDays === 'string'
                            ? data.availableDays
                                .split(/[\s,\-]+/)
                                .map(d => d.trim())
                                .filter(Boolean)
                            : [];
                }

                setTutor({
                    ...data,
                    availableDays
                });

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        };

        if (id) {
            fetchTutor();
        }

    }, [id]);

    // ── Slot / date restriction checks ───────────────────────────────────────
    const now = new Date();
    const sessionDate = tutor?.sessionStartDate ? new Date(tutor.sessionStartDate) : null;
    const isDateBlocked = sessionDate && now < sessionDate;
    const isFullyBooked = tutor?.totalSlot === 0;
    const isBookingBlocked = isFullyBooked || isDateBlocked;

    const bookingBlockMessage = isFullyBooked
        ? 'This session is fully booked. You can\'t join at the moment.'
        : isDateBlocked
            ? `Booking is not available yet. Opens on ${sessionDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`
            : null;

    // Called from modal after successful booking — decrease slot locally
    const handleBookingSuccess = () => {
        setTutor(prev => ({ ...prev, totalSlot: prev.totalSlot - 1 }));
        setModalOpen(false);
    };

    if (loading) return <PageLoader />;
    if (!tutor) return <NotFound />;

    return (
        <div className="min-h-screen bg-muted/30 pt-28 pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">

                {/* ── Hero Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border bg-card shadow-xl overflow-hidden"
                >
                    {/* Top banner */}
                    <div className="h-32 bg-linear-to-r from-indigo-600 to-violet-600" />

                    <div className="px-8 pb-8">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-4 flex items-end justify-between">
                            <Image
                                src={tutor.tutorPhoto || '/placeholder.png'}
                                alt={tutor.tutorName}
                                width={112}
                                height={112}
                                className="h-28 w-28 rounded-2xl border-4 border-card object-cover shadow-lg"
                            />
                            {/* Slot badge */}
                            <span className={`mb-2 rounded-xl px-4 py-1.5 text-sm font-bold ${isFullyBooked
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                                }`}>
                                {isFullyBooked ? 'Fully Booked' : `${tutor.totalSlot} Slots Left`}
                            </span>
                        </div>

                        {/* Name & subject */}
                        <h1 className="text-3xl font-black text-foreground">{tutor.tutorName}</h1>
                        <p className="mt-1 text-lg font-semibold text-indigo-600">{tutor.subject}</p>

                        {/* Meta row */}
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <MetaChip icon={<GraduationCap size={15} />} label={tutor.institution || 'N/A'} />
                            <MetaChip icon={<Star size={15} />} label={`${tutor.experience} experience`} />
                            <MetaChip icon={<MapPin size={15} />} label={tutor.location || 'Remote'} />
                            <MetaChip icon={<BookOpen size={15} />} label={tutor.teachingMode} />
                        </div>
                    </div>
                </motion.div>

                {/* ── Info Grid ── */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Availability */}
                    <InfoCard title="Availability" icon={<Clock size={18} />}>
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {(tutor.availableDays || []).map(day => (
                                    <span key={day} className="rounded-lg bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                                        {day}
                                    </span>
                                ))}
                            </div>
                            {tutor.availableTimeStart && (
                                <p className="text-sm font-medium text-muted-foreground">
                                    {tutor.availableTimeStart} – {tutor.availableTimeEnd}
                                </p>
                            )}
                        </div>
                    </InfoCard>

                    {/* Session Info */}
                    <InfoCard title="Session Info" icon={<CalendarDays size={18} />}>
                        <div className="space-y-2 text-sm">
                            <Row label="Start Date" value={sessionDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
                            <Row label="Hourly Fee" value={`৳ ${tutor.hourlyFee}`} highlight />
                            <Row label="Total Slots" value={tutor.totalSlot} />
                            <Row label="Mode" value={tutor.teachingMode} />
                        </div>
                    </InfoCard>
                </div>

                {/* ── Booking Block Message ── */}
                <AnimatePresence>
                    {bookingBlockMessage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800"
                        >
                            <AlertCircle size={20} className="shrink-0 text-amber-500" />
                            <p className="font-medium">{bookingBlockMessage}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Book Session Button ── */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={isBookingBlocked}
                    onClick={() => setModalOpen(true)}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 text-xl font-black text-white shadow-xl shadow-indigo-500/25 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Users size={24} />
                    {isFullyBooked ? 'No Slots Available' : isDateBlocked ? 'Booking Not Open Yet' : 'Book a Session'}
                </motion.button>
            </div>

            {/* ── Booking Modal ── */}
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

// ─── BOOKING MODAL ──────────────────────────────────────────────────────────────
function BookingModal({ tutor, user, onClose, onSuccess }) {
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    const handleBook = async () => {

        const { data: tokenData } = await authClient.token()
        console.log('Token data:', tokenData);

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
                bookStatus: 'pending',
                bookedAt: new Date().toISOString(),
            };

            // 1. Create booking
            const bookRes = await fetch(`${SERVER_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(booking),
            });
            if (!bookRes.ok) throw new Error('Failed to create booking.');

            // 2. Decrease totalSlot by 1
            const slotRes = await fetch(`${SERVER_URL}/tutors/${tutor._id}/decrease-slot`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${tokenData?.token}`
                },
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
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-2xl">

                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-foreground">Book a Session</h2>
                            <p className="mt-1 text-sm text-muted-foreground">with {tutor.tutorName}</p>
                        </div>
                        <button onClick={onClose} className="rounded-xl p-2 hover:bg-muted transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {done ? (
                        // ── Success state ──
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-3 py-8 text-center"
                        >
                            <CheckCircle2 size={52} className="text-green-500" />
                            <p className="text-xl font-black text-foreground">Booking Confirmed!</p>
                            <p className="text-sm text-muted-foreground">Your session has been booked successfully.</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-5">
                            {/* Auto-filled fields (read-only) */}
                            <ReadOnlyField label="Tutor" value={tutor.tutorName} icon={<GraduationCap size={16} />} />
                            <ReadOnlyField label="Tutor ID" value={tutor._id} icon={<BookOpen size={16} />} />
                            <ReadOnlyField label="Student Name" value={user?.name || '—'} icon={<Users size={16} />} />
                            <ReadOnlyField label="Student Email" value={user?.email || '—'} icon={<BookOpen size={16} />} />

                            {/* Phone — only editable field */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-muted-foreground">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={16} />
                                    <input
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="+880 1XXX-XXXXXX"
                                        className="field pl-11 w-full"
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
                                    ⚠️ {error}
                                </p>
                            )}

                            {/* Confirm Button */}
                            <button
                                onClick={handleBook}
                                disabled={submitting}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-black text-white transition-all hover:bg-indigo-700 disabled:opacity-60"
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
        </>
    );
}

// ─── SMALL HELPERS ──────────────────────────────────────────────────────────────
const MetaChip = ({ icon, label }) => (
    <span className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1">
        {icon} {label}
    </span>
);

const InfoCard = ({ title, icon, children }) => (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-indigo-600 font-black">
            {icon} <span>{title}</span>
        </div>
        {children}
    </div>
);

const Row = ({ label, value, highlight }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-bold ${highlight ? 'text-indigo-600' : 'text-foreground'}`}>{value}</span>
    </div>
);

const ReadOnlyField = ({ label, value, icon }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-bold text-muted-foreground">{label}</label>
        <div className="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm font-medium text-foreground">
            <span className="text-indigo-500">{icon}</span>
            <span className="truncate">{value}</span>
        </div>
    </div>
);

const PageLoader = () => (
    <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={36} className="animate-spin text-indigo-600" />
    </div>
);

const NotFound = () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <p className="text-4xl font-black text-foreground">Tutor Not Found</p>
        <p className="text-muted-foreground">This tutor profile doesn&apos;t exist or has been removed.</p>
    </div>
);