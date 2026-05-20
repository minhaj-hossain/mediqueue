import Image from "next/image";
import Link from "next/link";


export default function TutorCard({ tutor   }) {
    


    const modeColors = {
        Online: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        Offline: "bg-amber-50 text-amber-700 border border-amber-200",
        Both: "bg-violet-50 text-violet-700 border border-violet-200",
    };

    const slotStatus =
        tutor.totalSlot === 0
            ? { label: "Fully Booked", style: "bg-red-50 text-red-600 border border-red-200" }
            : tutor.totalSlot <= 3
                ? { label: `${tutor.totalSlot} slots left`, style: "bg-orange-50 text-orange-600 border border-orange-200" }
                : { label: `${tutor.totalSlot} slots open`, style: "bg-green-50 text-green-700 border border-green-200" };

    const isBookingAvailable = new Date() >= new Date(tutor.sessionStartDate);

    return (
        <div className="rounded-[2.5rem] border border-black/5 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col gap-5">

            {/* Header */}
            <div className="flex items-center gap-4">
                <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-16 w-16 rounded-full object-cover bg-black/5 shrink-0"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                    }}
                />
                <div className="h-16 w-16 rounded-full bg-indigo-100 items-center justify-center font-black text-indigo-400 text-xl hidden shrink-0">
                    {tutor.tutorName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-black truncate">{tutor.tutorName}</h3>
                    <p className="text-sm font-black uppercase tracking-wider text-indigo-600">{tutor.subject}</p>
                </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${modeColors[tutor.teachingMode] || "bg-gray-100 text-gray-600"}`}>
                    {tutor.teachingMode}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${slotStatus.style}`}>
                    {slotStatus.label}
                </span>
                {!isBookingAvailable && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                        Opens {new Date(tutor.sessionStartDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-black/50">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="truncate">{tutor.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{tutor.experience} exp.</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{tutor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{tutor.availableDays}</span>
                </div>
            </div>

            {/* Schedule Strip */}
            <div className="rounded-2xl bg-indigo-50 px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Schedule</span>
                <span className="text-sm font-bold text-indigo-700">{tutor.availableTime}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-1">
                <div>
                    <span className="text-2xl font-black text-black">৳{tutor.hourlyFee}</span>
                    <span className="text-sm text-black/40 font-medium">/hr</span>
                </div>
                <Link href={`/tutors/${tutor._id}`}
                    disabled={tutor.totalSlot === 0}
                    className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-sm font-bold px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {tutor.totalSlot === 0 ? "Fully Booked" : "Book Session"}
                </Link>
            </div>
        </div>
    );
}