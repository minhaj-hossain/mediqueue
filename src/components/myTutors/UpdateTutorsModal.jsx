"use client";

import {
    Button,
    FieldError,
    Input,
    Label,
    ListBox,
    Modal,
    Surface,
    TextArea,
    TextField,
    Select,
} from "@heroui/react";
import { Edit2 } from "lucide-react";


export function UpdateTutorsModal({ tutor }) {

    const {
        _id,
        tutorName,
        tutorPhoto,
        subject,
        hourlyFee,
        institution,
        experience,
        location
    } = tutor;
    


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedTutor = Object.fromEntries(formData.entries());

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-tutor/${_id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedTutor)
        })
        const result = await res.json();

        window.location.reload();



    };
    return (
        <Modal>

            <Button
                className="rounded-xl p-3 text-teal-600 transition-colors hover:bg-teal-50"
            >
                <Edit2 size={18} />
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Update Tutor</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-8 p-8">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                        {/* Tutor Name */}
                                        <TextField
                                            defaultValue={tutorName}
                                            name="tutorName"
                                            isRequired
                                        >
                                            <Label>Tutor Name</Label>
                                            <Input
                                                placeholder="John Doe"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Subject */}
                                        <TextField
                                            defaultValue={subject}
                                            name="subject"
                                            isRequired
                                        >
                                            <Label>Subject</Label>
                                            <Input
                                                placeholder="Mathematics"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Hourly Fee */}
                                        <TextField
                                            defaultValue={hourlyFee}
                                            name="hourlyFee"
                                            type="number"
                                            isRequired
                                        >
                                            <Label>Hourly Fee</Label>
                                            <Input
                                                type="number"
                                                placeholder="20"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Institution */}
                                        <TextField
                                            defaultValue={institution}
                                            name="institution"
                                            isRequired
                                        >
                                            <Label>Institution</Label>
                                            <Input
                                                placeholder="Dhaka University"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Location */}
                                        <TextField
                                            defaultValue={location}
                                            name="location"
                                            isRequired
                                        >
                                            <Label>Location</Label>
                                            <Input
                                                placeholder="Dhaka, Bangladesh"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Tutor Photo */}
                                        <TextField
                                            defaultValue={tutorPhoto}
                                            name="tutorPhoto"
                                            isRequired
                                        >
                                            <Label>Photo URL</Label>
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/photo.jpg"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Experience */}
                                        <div className="md:col-span-2">
                                            <TextField
                                                defaultValue={experience}
                                                name="experience"
                                                isRequired
                                            >
                                                <Label>Experience</Label>
                                                <TextArea
                                                    placeholder="Describe teaching experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    <Modal.Footer className="px-0 pb-0">
                                        <Button
                                            type="submit"
                                            className="w-full rounded-2xl bg-teal-600 py-6 text-white hover:bg-teal-700"
                                        >
                                            Update Tutor
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
