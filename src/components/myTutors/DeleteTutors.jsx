"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export default function DeleteTutor({ tutor }) {




    const handleDelete = async (tutorToBeDeleted) => {

        const { data: tokenData } = await authClient.token()

        const res = await fetch(`http://localhost:8000/remove-my-tutor/${tutorToBeDeleted._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${tokenData?.token}`
            }
        })
        const result = await res.json();
        console.log(result)

        window.location.reload()


    }

    return (
        <AlertDialog>
            <Button variant="danger-soft"><Trash2 size={18} /></Button>
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
                                This will permanently delete <strong>{tutor.tutorName}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(tutor)} slot={"close"}>
                                Delete Tutor
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}