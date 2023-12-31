import React, { useState } from 'react';
import * as Components from '../components';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import AppointmentForm from './appointmentForm';
import axios from 'axios';

const AppointmentDetails = ({ chosenDateTime, onChangeAppointment, trainerName }) => {
    const [open, setOpen] = useState(false);
    const [chosenFocusArea, setChosenFocusArea] = useState("");
    const [chosenSpecialRequest, setChosenSpecialRequest] = useState("");

    // Handle dialog open
    const handleOpen = () => setOpen(!open);

    // Handle appointment confirmation
    const handleConfirmAppointment = () => {
        // Construct the data object
        const appointmentData = {
            userId: sessionStorage.getItem('userId'),
            dateAndTime: chosenDateTime,
            trainer: trainerName,
            focusArea: localStorage.getItem('focusArea'), // Retrieve focusArea from localStorage
            specialRequest: chosenSpecialRequest
        };

        // Make a POST request to send appointmentData to the server
        axios.post("http://localhost:4000/customer/appointment", appointmentData)
        .then(response => {
            // Handle successful response
            console.log('Appointment confirmed!', response.data);
            handleOpen();
            window.location.href = '/appointment';
            window.alert('Appointment confirmed!');
        })
        .catch(error => {
            // Handle error
            console.error('Error confirming appointment:', error);
            // Optionally handle errors with an alert or other UI feedback
        });
    };

    return (
        <>
            <p className='font-bold'>Selected Date and Time:</p>
            <p>Start: {chosenDateTime.start}</p>
            <p>End: {chosenDateTime.end}</p>
            <Components.SecondButton onClick={onChangeAppointment} className='mt-3 mx-10 p-5'>Change time slot</Components.SecondButton>
            <Components.Button label='Confirm time slot' onClick={handleOpen} className='rounded-full mx-10 p-5'>Next</Components.Button>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                className='w-2/3 mx-auto mt-[100px] p-8 rounded-2xl'
            >
                <DialogHeader className='font-bold justify-center'>Confirm your Appointment</DialogHeader>
                <DialogBody>
                    <AppointmentForm
                        chosenDateTime={chosenDateTime}
                        trainerName={trainerName}
                        setChosenFocusArea={setChosenFocusArea}
                        setChosenSpecialRequest={setChosenSpecialRequest}
                    />
                </DialogBody>
                <DialogFooter className='justify-center'>
                    <Components.SecondButton
                        onClick={handleOpen}
                        className="mr-10"
                    >
                        <span>Back</span>
                    </Components.SecondButton>
                    <Components.Button onClick={handleConfirmAppointment}>
                        <span>Confirm</span>
                    </Components.Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default AppointmentDetails;
