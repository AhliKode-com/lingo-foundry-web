"use client"
import {TitleStudentDashboard} from "@/components/atoms/title";
import React, {useEffect, useState} from "react";
import RescheduleBookingInterface from "@/components/organisms/dashboard/reschedule/reschedule";
import {useStudentBooking} from "@/apis/studentBooking";
import {useSearchParams} from "next/navigation";

export default function StudentRescheduleBooking() {
    const {getByOrderItemId, loading} = useStudentBooking()

    const searchParams = useSearchParams()
    const paramOrderItemId = Number(searchParams.get("orderItemId"))
    const paramTutorId = Number(searchParams.get("tutorId"))

    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await getByOrderItemId(paramOrderItemId);
            const content = response || [];
            setBookings(content);
        };

        fetchBookings();
    }, []);

    return (
        <div className="lingo-container flex flex-col mb-[72px]">
            <TitleStudentDashboard text="Reschedule"/>
            {loading ? (
                <div className="w-full h-[75px] bg-gray-100 animate-pulse rounded-lg mt-12"/>
            ) : (
                <div className='mt-[15px] md:mt-[35px] flex flex-col gap-[25px] w-full animation-effect'>
                    <RescheduleBookingInterface bookings={bookings} tutorId={paramTutorId} orderItemId={paramOrderItemId} />
                </div>
            )}
        </div>
    )
}