'use client'

import React from 'react';
import DeleteTutor from './DeleteTutors';
import { UpdateTutorsModal } from './UpdateTutorsModal';

const TutorsTable = ({ tutors }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b bg-muted/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <th className="px-8 py-6">Tutor Info</th>
                        <th className="px-8 py-6">Subject</th>
                        <th className="px-8 py-6">Hourly Fee</th>
                        <th className="px-8 py-6">Slots</th>
                        <th className="px-8 py-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {tutors.map((tutor) => (
                        <tr key={tutor._id} className="transition-colors hover:bg-muted/30">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    {/* <Image src={tutor.tutorPhoto} fill className="h-12 w-12 rounded-xl object-cover" alt="" /> */}
                                    <div>
                                        <p className="font-bold text-foreground">{tutor.tutorName}</p>
                                        <p className="text-xs text-muted-foreground">{tutor.institution}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-900/20">
                                    {tutor.subject}
                                </span>
                            </td>
                            <td className="px-8 py-6 font-bold text-foreground">${tutor.hourlyFee}/hr</td>
                            <td className="px-8 py-6">
                                <span className={`font-medium ${tutor.totalSlot > 0 ? "text-green-600" : "text-destructive"}`}>
                                    {tutor.totalSlot} remaining
                                </span>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center justify-center gap-3">

                                    <UpdateTutorsModal tutor={tutor} />

                                    <div
                                        // onClick={() => setDeleteId(tutor._id)}
                                        className="rounded-xl p-3 text-destructive transition-colors hover:bg-destructive/10"
                                    >
                                        <DeleteTutor tutor={tutor} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TutorsTable;