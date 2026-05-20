import NoTutors from '@/components/myTutors/NoTutors';
import TutorsTable from '@/components/myTutors/TutorsTable';
import { auth } from '@/lib/auth';
import { Plus } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const MyTutorPage = async () => {


    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    
    const session = await auth.api.getSession({ headers: await headers() });
    const res = await fetch(`http://localhost:8000/my-tutors/${session.user.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const tutors = await res.json();

    return (
        <>
            <div className="min-h-screen bg-muted/30 pt-28 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-foreground">My <span className="text-indigo-600">Tutor Listings</span></h1>
                        <p className="mt-2 text-muted-foreground">Manage and monitor the classes you&apos;ve listed.</p>
                    </div>
                    <Link
                        href="/add-tutor"
                        className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-xl shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/40"
                    >
                        <Plus size={20} />
                        Add New Listing
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
                    {tutors?.length > 0 ? <TutorsTable tutors={tutors} /> : <NoTutors />}
                </div>

            </div>
        </>
    );
};

export default MyTutorPage;