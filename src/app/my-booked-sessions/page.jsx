import BookingCard from '@/components/myBookedSessions/BookingCard';
import { auth } from '@/lib/auth';
import { Clock, Link } from 'lucide-react';
import { headers } from 'next/headers';
import React from 'react';

const MyBookedSessionsPage = async () => {

    const session = await auth.api.getSession({ headers: await headers() });
    const res = await fetch(`http://localhost:8000/bookings/${session.user.id}`);
    const bookings = await res.json();


    return (
        <>
            <div className="min-h-screen bg-muted/30 pt-28 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-foreground">My <span className="text-indigo-600">Learning Sessions</span></h1>
                        <p className="mt-2 text-muted-foreground">Track your upcoming classes and manage your schedule.</p>
                    </div>

                    {bookings?.length > 0 ? (
                        <div className="grid gap-6">
                            {bookings.map((booking, index) => (
                                <BookingCard key={index} booking={booking} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                                <Clock size={48} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">You haven&apos;t booked any sessions yet</h3>
                            <p className="mt-4 max-w-sm text-muted-foreground">Explore our world-class tutors and book your first lesson to start your learning journey.</p>
                            <Link href="/tutors" className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl transition-all hover:bg-indigo-700">
                                Find a Tutor
                            </Link>
                        </div>
                    )}
                </div>
            </div>


        </>
    );
};

export default MyBookedSessionsPage;