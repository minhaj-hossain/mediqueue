'use client'
import React, { use, useState } from 'react';
import { GraduationCap, ImageIcon, MapPin, PlusCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Programming', 'Design', 'Economics', 'History', 'Literature'];
const TEACHING_MODES = ['Online', 'Offline', 'Both'];

const INITIAL_FORM = {
    tutorName: '',
    tutorPhoto: '',
    subject: '',
    institution: '',
    experience: '',
    hourlyFee: '',
    totalSlot: '',
    location: '',
    teachingMode: 'Online',
    availableDays: [],
    availableTimeStart: '',
    availableTimeEnd: '',
    sessionStartDate: null,
};

const AddTutorsPage = () => {



    const [form, setForm] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const toggleDay = (day) => {
        setForm(prev => ({
            ...prev,
            availableDays: prev.availableDays.includes(day)
                ? prev.availableDays.filter(d => d !== day)
                : [...prev.availableDays, day],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { data: tokenData } = await authClient.token()
        console.log('Token data:', tokenData);

        // Basic validation
        if (!form.tutorName.trim()) return setError('Tutor name is required.');
        if (!form.subject) return setError('Please select a subject.');
        if (!form.tutorPhoto.trim()) return setError('Please provide a photo URL.');
        if (form.availableDays.length === 0) return setError('Select at least one available day.');
        if (!form.sessionStartDate) return setError('Please pick a session start date.');

        try {
            setIsSubmitting(true);

            const formData = new FormData();

            formData.append('tutorName', form.tutorName.trim());
            formData.append('photo', form.tutorPhoto.trim());
            formData.append('subject', form.subject);
            formData.append('hourlyFee', form.hourlyFee);
            formData.append('totalSlot', form.totalSlot);
            formData.append('sessionStartDate', form.sessionStartDate.toISOString());
            formData.append('institution', form.institution.trim());
            formData.append('experience', form.experience.trim());
            formData.append('location', form.location.trim());
            formData.append('teachingMode', form.teachingMode);
            formData.append('availableTimeStart', form.availableTimeStart.trim());
            formData.append('availableTimeEnd', form.availableTimeEnd.trim());
            formData.append('status', "active")
            formData.append('userId', user?.id);
            // Arrays must be stringified — parse with JSON.parse() on the server
            formData.append('availableDays', JSON.stringify(form.availableDays));


            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify({
                    ...form,
                    status: "active",
                    userId: user?.id,
                    hourlyFee: Number(form.hourlyFee),
                    totalSlot: Number(form.totalSlot),
                    sessionStartDate: form.sessionStartDate?.toISOString(),
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData?.message || `Server error: ${res.status}`);
            }

            setSuccess(true);
            setForm(INITIAL_FORM);
            toast.success('Tutor profile published successfully!');

        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-30 container mx-auto">
            <div className="min-h-screen bg-muted/30 pt-28 pb-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black text-foreground">
                                Become a <span className="text-indigo-600">Tutor</span>
                            </h1>
                            <p className="mt-2 text-muted-foreground">Share your knowledge and earn by helping others.</p>
                        </div>
                        <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600 sm:flex">
                            <PlusCircle size={32} />
                        </div>
                    </div>

                    {/* Success Banner */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-green-800"
                            >
                                <CheckCircle2 size={22} className="shrink-0 text-green-600" />
                                <div>
                                    <p className="font-bold">Profile published successfully! 🎉</p>
                                    <p className="text-sm opacity-80">Your tutor profile is now live.</p>
                                </div>
                                <button onClick={() => setSuccess(false)} className="ml-auto text-green-600 hover:text-green-800">✕</button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-3xl border bg-card p-8 shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Basic Info */}
                            <SectionTitle>Basic Information</SectionTitle>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Tutor Name</Label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                        <input name="tutorName" value={form.tutorName} onChange={handleChange} placeholder="Your full name" className="field pl-12" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Photo URL</Label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                        <input name="tutorPhoto" value={form.tutorPhoto} onChange={handleChange} placeholder="https://i.ibb.co/..." className="field pl-12" />
                                    </div>
                                </div>
                            </div>

                            {/* Academic Details */}
                            <SectionTitle>Academic Details</SectionTitle>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Subject / Category</Label>
                                    <select name="subject" value={form.subject} onChange={handleChange} className="field">
                                        <option value="">Select a subject</option>
                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Institution</Label>
                                    <input name="institution" value={form.institution} onChange={handleChange} placeholder="e.g. BUET, DU, NSU" className="field" />
                                </div>
                            </div>

                            {/* Logistics */}
                            <SectionTitle>Logistics & Fees</SectionTitle>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Hourly Fee (৳)</Label>
                                    <input type="number" name="hourlyFee" value={form.hourlyFee} onChange={handleChange} min="0" placeholder="500" className="field font-bold text-indigo-600" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Total Slots</Label>
                                    <input type="number" name="totalSlot" value={form.totalSlot} onChange={handleChange} min="1" placeholder="10" className="field" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Experience</Label>
                                    <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 3 Years" className="field" />
                                </div>
                            </div>

                            {/* Location & Mode */}
                            <SectionTitle>Location & Teaching Mode</SectionTitle>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Teaching Mode</Label>
                                    <div className="flex gap-3">
                                        {TEACHING_MODES.map(m => (
                                            <button key={m} type="button"
                                                onClick={() => setForm(p => ({ ...p, teachingMode: m }))}
                                                className={`grow rounded-xl border p-3 text-sm font-bold transition-all ${form.teachingMode === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-card text-muted-foreground hover:border-indigo-300'}`}
                                            >{m}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Location (Area / City)</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                        <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mirpur, Dhaka" className="field pl-12" />
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <SectionTitle>Availability</SectionTitle>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Available Days</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {DAYS.map(day => (
                                            <button key={day} type="button" onClick={() => toggleDay(day)}
                                                className={`min-w-14 rounded-xl border px-3 py-2.5 text-sm font-bold transition-all ${form.availableDays.includes(day) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card text-muted-foreground hover:border-indigo-300'}`}
                                            >{day}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Start Time</Label>
                                        <input name="availableTimeStart" value={form.availableTimeStart} onChange={handleChange} placeholder="e.g. 5:00 PM" className="field" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Time</Label>
                                        <input name="availableTimeEnd" value={form.availableTimeEnd} onChange={handleChange} placeholder="e.g. 8:00 PM" className="field" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Session Start Date</Label>
                                        <DatePicker
                                            selected={form.sessionStartDate}
                                            onChange={(date) => setForm(p => ({ ...p, sessionStartDate: date }))}
                                            minDate={new Date()}
                                            placeholderText="Pick a date"
                                            dateFormat="dd MMM yyyy"
                                            className="field w-full"
                                            wrapperClassName="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Availability Preview */}
                                {form.availableDays.length > 0 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm"
                                    >
                                        <span className="font-bold text-indigo-700">Preview: </span>
                                        <span className="text-indigo-900">
                                            {form.availableDays.join(', ')}
                                            {form.availableTimeStart && `  ·  ${form.availableTimeStart}${form.availableTimeEnd ? ` – ${form.availableTimeEnd}` : ''}`}
                                        </span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                                    >⚠️ {error}</motion.p>
                                )}
                            </AnimatePresence>

                            {/* Submit */}
                            <button type="submit" disabled={isSubmitting}
                                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 text-xl font-black text-white shadow-xl shadow-indigo-500/25 transition-all hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting
                                    ? <><Loader2 size={24} className="animate-spin" /> Publishing profile…</>
                                    : <>Publish Tutor Profile <PlusCircle size={24} /></>
                                }
                            </button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Label = ({ children }) => (
    <label className="text-sm font-bold text-muted-foreground">{children}</label>
);

const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3">
        <h2 className="text-base font-black text-foreground">{children}</h2>
        <div className="h-px grow bg-border" />
    </div>
);

export default AddTutorsPage;