import { ArrowRight, BookOpen, Calendar, CheckCircle, Phone, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { GrStatusGood } from 'react-icons/gr';
import UpdateBookingStatus from './UpdateBookingStatus';

const BookingCard = ({ booking }) => {


    return (
        <div
            className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
            <div className="flex flex-col md:flex-row">


                <div className="flex grow flex-col justify-between p-8 md:flex-row md:items-center">
                    <div className="space-y-4">
                        <div>
                            <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${booking.status === "booked" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}>
                                {booking.status}
                            </span>
                            <h3 className="mt-2 text-2xl font-black text-foreground">{booking.tutorName}</h3>
                            <div className=''>
                                <div className="mt-1 flex items-center gap-2 text-sm text-teal-600 font-bold">
                                    <BookOpen size={16} />
                                    Expert Session
                                </div>

                                <div className='mt-2 flex items-center gap-2 text-sm text-muted-foreground font-bold'>
                                    <GrStatusGood size={16} className='text-teal-600'/>

                                    Status:
                                    <h3 className='ml-1font-medium  text-black'>

                                        {booking.bookStatus}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={18} className="text-teal-500" />
                                <span className="font-medium">Booked on {new Date(booking.bookedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone size={18} className="text-teal-500" />
                                <span className="font-medium">{booking.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-4 md:mt-0">



                        <UpdateBookingStatus booking={booking}/>

                        <Link
                            href={`/tutors/${booking.tutorId}`}
                            className="flex items-center gap-2 rounded-xl border-destructive/20 bg-destructive/5 px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-teal-600 hover:text-white"
                        >
                            Details
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;