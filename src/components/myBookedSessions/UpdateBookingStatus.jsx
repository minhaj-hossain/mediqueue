"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export default function UpdateBookingStatus({ booking }) {




    const handleUpdateStatus = async () => {

        const { data: tokenData } = await authClient.token()

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-status/${booking._id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${tokenData?.token}`
            }
        })
        const result = await res.json();
        toast.success('Status updated Successfully.')
        window.location.reload()

    }

    return (
        <AlertDialog>
            <Button variant="">
                <div

                    className="rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-3 text-sm font-bold text-destructive transition-all  hover:bg-teal-600 hover:text-white "
                >
                    Cancel Session
                </div>
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently change the status of <strong>{booking.tutorName}</strong>. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button variant="danger" o onClick={() => handleUpdateStatus(booking._id)} slot={"close"}>
                                Update Status
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}