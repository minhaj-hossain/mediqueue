'use client';
import React, { useState } from 'react';
import { PlusCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import {
    TextField,
    Input,
    Label,
    FieldError,
    Select,
    SelectValue,
    ListBox,
    ListBoxItem,
    Button,
    Surface,
} from '@heroui/react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Programming', 'Design', 'Economics', 'History', 'Literature'];
const TEACHING_MODES = ['Online', 'Offline', 'Both'];

const AddTutorsPage = () => {

    const [availableDays, setAvailableDays] = useState([]);
    const [sessionStartDate, setSessionStartDate] = useState(null);
    const [teachingMode, setTeachingMode] = useState('Online');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const toggleDay = (day) => {
        setAvailableDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const availableTime = data.availableTimeStart && data.availableTimeEnd
            ? `${data.availableTimeStart} - ${data.availableTimeEnd}`
            : '';

        if (!data.tutorName?.trim()) return setError('Tutor name is required.');
        if (!data.subject) return setError('Please select a subject.');
        if (!data.tutorPhoto?.trim()) return setError('Please provide a photo URL.');
        if (availableDays.length === 0) return setError('Select at least one available day.');
        if (!sessionStartDate) return setError('Please pick a session start date.');

     

        const { data: tokenData } = await authClient.token();

        try {
            setIsSubmitting(true);

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify({
                    ...data,
                    availableTime,   
                    teachingMode,
                    availableDays: JSON.stringify(availableDays),
                    sessionStartDate: sessionStartDate.toISOString(),
                    hourlyFee: Number(data.hourlyFee),
                    totalSlot: Number(data.totalSlot),
                    status: 'active',
                    userId: user?.id,
                }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData?.message || `Server error: ${res.status}`);
            }

            setSuccess(true);
            e.target.reset();
            setAvailableDays([]);
            setSessionStartDate(null);
            setTeachingMode('Online');
            toast.success('Tutor profile published successfully!');

        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 pt-28 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-foreground">
                            Become a <span className="text-teal-600">Tutor</span>
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Share your knowledge and earn by helping others.
                        </p>
                    </div>
                    <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-teal-600/10 text-teal-600 sm:flex">
                        <PlusCircle size={32} />
                    </div>
                </div>

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
                            <button
                                onClick={() => setSuccess(false)}
                                className="ml-auto text-green-600 hover:text-green-800"
                            >✕</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Surface variant="default">
                    <form onSubmit={handleSubmit} className="space-y-8 p-8">

                        <SectionTitle>Basic Information</SectionTitle>
                        <div className="grid gap-6 md:grid-cols-2">
                            <TextField name="tutorName" isRequired>
                                <Label>Tutor Name</Label>
                                <Input placeholder="Your full name" className="rounded-2xl" />
                                <FieldError />
                            </TextField>

                            <TextField name="tutorPhoto" isRequired>
                                <Label>Photo URL</Label>
                                <Input placeholder="https://i.ibb.co/..." className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        <SectionTitle>Academic Details</SectionTitle>
                        <div className="grid gap-6 md:grid-cols-2">
                            <TextField name="subject">
                                <Label>Subject / Category</Label>
                                <select
                                    name="subject"
                                    className="w-full rounded-2xl border bg-card px-4 py-2.5 text-sm text-foreground focus:border-teal-500 focus:outline-none"
                                >
                                    <option value="">Select a subject</option>
                                    {SUBJECTS.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                <FieldError />
                            </TextField>

                            <TextField name="institution" isRequired>
                                <Label>Institution</Label>
                                <Input placeholder="e.g. BUET, DU, NSU" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        <SectionTitle>Logistics & Fees</SectionTitle>
                        <div className="grid gap-6 md:grid-cols-3">
                            <TextField name="hourlyFee" type="number" isRequired>
                                <Label>Hourly Fee (৳)</Label>
                                <Input type="number" min="0" placeholder="500" className="rounded-2xl font-bold text-teal-600" />
                                <FieldError />
                            </TextField>

                            <TextField name="totalSlot" type="number" isRequired>
                                <Label>Total Slots</Label>
                                <Input type="number" min="1" placeholder="10" className="rounded-2xl" />
                                <FieldError />
                            </TextField>

                            <TextField name="experience" isRequired>
                                <Label>Experience</Label>
                                <Input placeholder="e.g. 3 Years" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        <SectionTitle>Location & Teaching Mode</SectionTitle>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Teaching Mode
                                </label>
                                <div className="flex gap-3">
                                    {TEACHING_MODES.map(m => (
                                        <Button
                                            key={m}
                                            type="button"
                                            onPress={() => setTeachingMode(m)}
                                            className={`grow rounded-xl border p-3 text-sm font-bold transition-all ${teachingMode === m
                                                    ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                                                    : 'bg-card text-muted-foreground hover:border-teal-300'
                                                }`}
                                        >{m}</Button>
                                    ))}
                                </div>
                            </div>

                            <TextField name="location" isRequired>
                                <Label>Location (Area / City)</Label>
                                <Input placeholder="e.g. Mirpur, Dhaka" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        <SectionTitle>Availability</SectionTitle>
                        <div className="space-y-4">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Available Days
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {DAYS.map(day => (
                                        <Button
                                            key={day}
                                            type="button"
                                            onPress={() => toggleDay(day)}
                                            className={`min-w-14 rounded-xl border px-3 py-2.5 text-sm font-bold transition-all ${availableDays.includes(day)
                                                    ? 'bg-teal-600 text-white border-teal-600'
                                                    : 'bg-card text-muted-foreground hover:border-teal-300'
                                                }`}
                                        >{day}</Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <TextField name="availableTimeStart">
                                    <Label>Start Time</Label>
                                    <Input placeholder="e.g. 5:00 PM" className="rounded-2xl" />
                                    <FieldError />
                                </TextField>

                                <TextField name="availableTimeEnd">
                                    <Label>End Time</Label>
                                    <Input placeholder="e.g. 8:00 PM" className="rounded-2xl" />
                                    <FieldError />
                                </TextField>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Session Start Date
                                    </label>
                                    <DatePicker
                                        selected={sessionStartDate}
                                        onChange={(date) => setSessionStartDate(date)}
                                        minDate={new Date()}
                                        placeholderText="Pick a date"
                                        dateFormat="dd MMM yyyy"
                                        className="w-full rounded-2xl border bg-card px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none"
                                        wrapperClassName="w-full"
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {availableDays.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm"
                                    >
                                        <span className="font-bold text-teal-700">Preview: </span>
                                        <span className="text-teal-900">{availableDays.join(', ')}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                                >⚠️ {error}</motion.p>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            isDisabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-teal-600 py-5 text-xl font-black text-white shadow-xl transition-all hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting
                                ? <><Loader2 size={24} className="animate-spin" /> Publishing profile…</>
                                : <>Publish Tutor Profile <PlusCircle size={24} /></>
                            }
                        </Button>

                    </form>
                </Surface>
            </div>
        </div>
    );
};

const SectionTitle = ({ children }) => (
    <div className="flex items-center gap-3">
        <h2 className="text-base font-black text-foreground">{children}</h2>
        <div className="h-px grow bg-border" />
    </div>
);

export default AddTutorsPage;