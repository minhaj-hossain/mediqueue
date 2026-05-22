import TutorDetails from "@/components/tutors/tutor-details/TutorDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function generateMetadata({ params }) {
    const { id } = await params;
    // console.log(id)

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const tutor = await res.json();

    // console.log(tutor)

    return {
        title: `Tutor - ${tutor.tutorName} teaches ${tutor.subject}`,
        description: `Book a session with ${tutor.tutorName}`,
    };
}

export default async function TutorDetailsPage({ params }) {
    const { id } = await params;
    return <TutorDetails id={id} />;
}