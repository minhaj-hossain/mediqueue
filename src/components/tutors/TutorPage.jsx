"use client";

import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import TutorCard from "@/components/tutors/TutorCard";
import TutorHeader from "@/components/tutors/TutorHeader";

export const metadata = {
    title: "Tutor - Find Your Favourite Tutors",
};

export default function TutorsPage() {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tutors, setTutors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (startDate) params.set("startDate", startDate);
        if (endDate) params.set("endDate", endDate);

        setIsLoading(true);

        const timeout = setTimeout(() => {

            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?${params.toString()}`)
                .then((res) => res.json())
                .then((data) => setTutors(data))
                .catch((err) => console.error(err))
                .finally(() => setIsLoading(false));
        }, 300);


        return () => clearTimeout(timeout);

    }, [search, startDate, endDate]);


    const handleClearFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
    };

    return (
        <div className="min-h-screen pt-44 pb-32 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <TutorHeader />

                {/* Search & Filter Bar */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">

                    {/* Name Search */}
                    <div className="relative grow">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20" size={20} />
                        <input
                            type="text"
                            placeholder="Search by tutor name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-[2rem] border border-foreground/5 bg-background py-5 pl-14 pr-8 text-base font-medium shadow-sm transition-all focus:border-teal-600 focus:outline-none"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground/20 hover:text-foreground"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-2xl border border-foreground/5 bg-background py-5 px-6 text-sm font-bold text-foreground/40 shadow-sm focus:border-teal-600 focus:outline-none"
                            />
                            {startDate && (
                                <button onClick={() => setStartDate("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/20 hover:text-foreground">
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <span className="text-foreground/20 font-black text-xs uppercase tracking-widest">to</span>

                        <div className="relative">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-2xl border border-foreground/5 bg-background py-5 px-6 text-sm font-bold text-foreground/40 shadow-sm focus:border-teal-600 focus:outline-none"
                            />
                            {endDate && (
                                <button onClick={() => setEndDate("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/20 hover:text-foreground">
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {(search || startDate || endDate) && (
                            <button
                                onClick={handleClearFilters}
                                className="rounded-2xl border border-foreground/5 bg-background px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-all"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {!isLoading && tutors.length > 0 && (
                    <p className="mb-10 text-sm font-black uppercase tracking-widest text-foreground/20">
                        {tutors.length} tutor{tutors.length !== 1 ? "s" : ""} found
                    </p>
                )}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="h-112.5 w-full animate-pulse rounded-[2.5rem] bg-foreground/2" />
                        ))
                    ) : tutors.length > 0 ? (
                        tutors.map((tutor) => (
                            <TutorCard key={tutor._id} tutor={tutor} />
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center rounded-[3rem] border border-dashed border-foreground/10">
                            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-foreground/3">
                                <Search size={40} className="text-foreground/10" />
                            </div>
                            <h3 className="text-3xl font-black text-foreground">No tutors found.</h3>
                            <p className="mt-4 text-lg font-medium text-foreground/20">Try broadening your search criteria.</p>
                            {(search || startDate || endDate) && (
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-8 text-[10px] font-black uppercase tracking-widest text-teal-600 hover:underline decoration-2 underline-offset-4"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}