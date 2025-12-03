/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:50:17
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-21 15:39:11
 */
"use client"

import React, {useMemo, useState, useEffect} from 'react';
import {TitleDashboard} from "@/components/atoms/title";
import {useParams, useRouter} from "next/navigation";
import {getPurchaseHistory} from "@/apis/dashboard/getPurchaseHistory";
import {useStudentBooking} from "@/apis/studentBooking";
import {toast} from "react-toastify";

export default function BookClass() {
    const {slug} = useParams();
    const router = useRouter();

    const {data, loading} = getPurchaseHistory();
    const {createBooking, tutorUnavailableTime, loading: studentBookingLoading, error} = useStudentBooking()
    const [availableTimes, setAvailableTimes] = useState([]);

    const [selectedTime, setSelectedTime] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeDay, setActiveDay] = useState(0); // For mobile view to track active day

    const [hoveredTime, setHoveredTime] = useState({
        day: 'Sat',
        date: '07',
        time: '10:00',
        formattedTime: '12:30 pm - 13:30 pm'
    });

    const days = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateJkt = new Date(date.getTime() + 7 * 60 * 60 * 1000)
        return {
            name: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: String(date.getDate()).padStart(2, '0'),
            fullDate: dateJkt.toISOString().split('T')[0], // Add full date in YYYY-MM-DD format
            rawDate: new Date(date), // Store the full date object for generating ISO string
            fullName: date.toLocaleDateString('en-US', { weekday: 'long' }),
            monthName: date.toLocaleDateString('en-US', { month: 'short' })
        };
    });

    console.log(days)

    // Generate time slots for each day
    const generateTimeSlots = (day) => {
        switch (day) {
            case 'Mon':
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
            case 'Tues':
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
            case 'Wed':
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
            case 'Thu':
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
            case 'Fri':
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
            case 'Sat':
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
            default:
                return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
        }
    };

    // Group time slots for better mobile display
    const groupTimeSlots = (timeSlots) => {
        // Group morning (6-12), afternoon (12-17), evening (17-22)
        const morning = timeSlots.filter(time => {
            const hour = parseInt(time.split(':')[0]);
            return hour >= 6 && hour < 12;
        });

        const afternoon = timeSlots.filter(time => {
            const hour = parseInt(time.split(':')[0]);
            return hour >= 12 && hour < 17;
        });

        const evening = timeSlots.filter(time => {
            const hour = parseInt(time.split(':')[0]);
            return hour >= 17 && hour <= 22;
        });

        return { morning, afternoon, evening };
    };

    const isActiveTimeSlot = (day, time) => {
        return selectedTime.day === day && selectedTime.time === time;
    };

    const isHoveredTimeSlot = (day, time) => {
        return hoveredTime.day === day && hoveredTime.time === time;
    };

    // Check if a time slot is unavailable based on the API response
    // The API returns available times, so a time slot is unavailable if it's NOT in the available times
    const isTimeSlotUnavailable = (fullDate, time) => {
        const availableDay = availableTimes.find(item => item.date === fullDate);
        if (!availableDay) return true; // If no data for this day, all times are unavailable

        // Convert time format from "HH:MM" to "HH:MM:00" to match API format
        const formattedTime = `${time}:00`;
        // Time is unavailable if it's NOT in the available times array
        return !availableDay.time.includes(formattedTime);
    };

    const addOneHour = (timeStr) => {
        let [hours, minutes] = timeStr.split(":").map(Number)
        hours = (hours + 1).toString().padStart(2, '0')
        return `${hours}:${minutes.toString().padStart(2, '0')}`
    }

    const formatTimeAmPm = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const dateRange = useMemo(() => {
        const today = new Date();
        const sixDaysLater = new Date();
        sixDaysLater.setDate(today.getDate() + 5);

        const options = {
            day: '2-digit',
            month: 'short',
        };

        const start = today.toLocaleDateString('en-GB', options);
        const end = sixDaysLater.toLocaleDateString('en-GB', options);

        return `${start} - ${end}`;
    }, []);

    // Function to generate ISO date string for API
    const generateStartTimeISO = () => {
        if (!selectedTime.day || !selectedTime.time) {
            return null;
        }

        // Find the selected day object
        const selectedDay = days.find(day => day.name === selectedTime.day);
        if (!selectedDay) return null;

        // Create a new date object based on the selected day
        const dateObj = new Date(selectedDay.rawDate);

        // Parse the time
        const [hours, minutes] = selectedTime.time.split(':').map(Number);

        // Set hours and minutes
        dateObj.setHours(hours, minutes, 0, 0);

        // Return ISO string
        return dateObj.toISOString();
    };

    // Handle submit button click
    const handleSubmit = async () => {
        if (!selectedTime.day || !selectedTime.time) {
            alert('Please select a time slot first');
            return;
        }

        setIsSubmitting(true);

        const startTime = generateStartTimeISO();
        const bookingData = {
            orderItemId: Number(slug),
            startTime
        };

        console.log('Submitting booking data:', bookingData);

        try {
            await createBooking(bookingData)
            setIsSubmitting(false);

            if (error) {
                toast.error(error);
                return;
            }

            router.push("/student-dashboard/purchase-history")
        } catch (error) {
            toast.error(error);
        }
    };

    let course = data?.content?.flatMap(order =>
        order?.courses?.filter(course => course?.orderItemId === Number(slug))
    );

    if (course) {
        course = course[0];
    }

    useEffect(() => {
        async function getTime() {
            if (course && course.tutorId) {
                const availableTime = await tutorUnavailableTime(course.tutorId);
                setAvailableTimes(availableTime);
            }
        }
        getTime();
    }, [course]);

    if (!data || loading) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className="lingo-container py-[100px] md:py-[150px]">
            <div className="mb-[20px] md:mb-[40px]">
                <TitleDashboard text={"Book your class"} />
            </div>
            <div className="border border-[#E35D33] rounded-2xl p-4 md:p-6 max-w-4xl mx-auto mt-8">
                <h2 className="text-base md:text-xl font-medium text-gray-700 mb-6">These are the last time slots available! Book now
                    before its too late.</h2>

                <div className="flex gap-6 mb-6 flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-gray-600 mb-3">Product Paid</h3>
                        <div
                            className="border border-gray-300 rounded-lg p-4 flex items-center gap-3 shadow-md h-[96px]">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img src={course.tutorProfileUrl || "/placeholder.svg"} alt={"tutor-img"} className="w-[45px] h-[45px] object-cover rounded-lg"/>
                            </div>
                            <div>
                                <div className="font-medium">
                                    {course.tutorFirstName}{" "}{course.tutorLastName}
                                </div>
                                <div>
                                    {course.subjectName}
                                </div>
                                <div className="text-gray-600 text-sm">{course.subjectLevel}</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h3 className="text-gray-600 mb-3">Course Package</h3>
                        <div
                            className="border border-gray-300 rounded-lg p-4 shadow-md h-[96px] flex flex-col items-start justify-center">
                            <div className="font-medium">1 Hours Session</div>
                            <div className="font-medium">Remaining session : {course.remainingSession}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-3 md:gap-0">
                    <div className="flex items-center gap-2">
                        <div className="text-gray-600">{dateRange}</div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm md:text-base text-center">
                        <span>your lesson timezone is (GMT +07:00) Jakarta, ID</span>
                    </div>
                </div>

                {/* Desktop Calendar View */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-6 gap-2 mb-6 mt-0">
                        {days.map((day) => (
                            <div key={day.name} className="flex flex-col items-center text-sm md:text-base">
                                <div className="mb-2 text-gray-600">{day.name}</div>
                                <div
                                    className={`w-full py-2 text-center border-b-2 border-[#E35D33]`}>
                                    {day.date}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                        {days.map((day) => (
                            <div key={`slots-${day.name}`} className="flex flex-col items-center relative">
                                {generateTimeSlots(day.name).map((time) => {
                                    const isUnavailable = isTimeSlotUnavailable(day.fullDate, time);

                                    return (
                                        <button
                                            key={`${day.name}-${time}`}
                                            className={`w-full py-2 my-1 rounded relative ${
                                                isUnavailable
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200'
                                                    : isActiveTimeSlot(day.name, time)
                                                        ? 'bg-[#E35D33] text-white cursor-pointer border border-[#E35D33]'
                                                        : 'text-[#E35D33] cursor-pointer border border-[#E35D33]'
                                            }`}
                                            onClick={() => {
                                                if (!isUnavailable) {
                                                    setSelectedTime({
                                                        day: day.name,
                                                        date: day.date,
                                                        time,
                                                        formattedTime: `${time} - ${addOneHour(time)}`
                                                    })
                                                }
                                            }}
                                            onMouseEnter={() => {
                                                if (!isUnavailable) {
                                                    setHoveredTime({
                                                        day: day.name,
                                                        date: day.date,
                                                        time,
                                                        formattedTime: '12:30 pm - 13:30 pm'
                                                    })
                                                }
                                            }}
                                            disabled={isUnavailable}
                                        >
                                            {time}
                                            {isActiveTimeSlot(day.name, time) && isHoveredTimeSlot(day.name, time) && !isUnavailable && (
                                                <div
                                                    className="absolute bg-white border shadow-lg rounded-lg p-4 w-64 z-20 -top-12 -right-[250px] animation-effect"
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 bg-green-300 rounded-full"></div>
                                                        <div className="text-left">
                                                            <div className="text-gray-700 font-medium text-sm">Selected</div>
                                                            <div className="text-gray-700 text-sm">{course.subjectName}{" "}{course.subjectLevel}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-gray-600 text-sm text-left">{selectedTime.formattedTime}</div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Calendar View */}
                <div className="block md:hidden mt-6">
                    {/* Date Selector Tabs */}
                    <div className="flex overflow-x-auto pb-2 scrollbar-hide mb-4 -mx-4 px-4">
                        {days.map((day, index) => (
                            <button
                                key={`mobile-day-${day.name}`}
                                className={`flex-shrink-0 flex flex-col items-center px-4 py-2 mr-2 rounded-lg ${
                                    activeDay === index
                                        ? 'bg-[#E35D33] text-white'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                                onClick={() => setActiveDay(index)}
                            >
                                <span className="text-xs font-medium">{day.name}</span>
                                <span className="text-lg font-bold">{day.date}</span>
                                <span className="text-xs">{day.monthName}</span>
                            </button>
                        ))}
                    </div>

                    {/* Time Slots for Selected Day */}
                    <div className="pb-2">
                        <h3 className="text-lg font-medium mb-3">{days[activeDay].fullName}, {days[activeDay].monthName} {days[activeDay].date}</h3>

                        {/* Group time slots */}
                        <div className="space-y-6">
                            {/* Morning */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Morning</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {groupTimeSlots(generateTimeSlots(days[activeDay].name)).morning.map((time) => {
                                        const isUnavailable = isTimeSlotUnavailable(days[activeDay].fullDate, time);

                                        return (
                                            <button
                                                key={`mobile-${days[activeDay].name}-${time}`}
                                                className={`py-3 rounded-lg text-center text-sm ${
                                                    isUnavailable
                                                        ? 'bg-gray-200 text-gray-400'
                                                        : isActiveTimeSlot(days[activeDay].name, time)
                                                            ? 'bg-[#E35D33] text-white'
                                                            : 'border border-[#E35D33] text-[#E35D33]'
                                                }`}
                                                onClick={() => {
                                                    if (!isUnavailable) {
                                                        setSelectedTime({
                                                            day: days[activeDay].name,
                                                            date: days[activeDay].date,
                                                            time,
                                                            formattedTime: `${time} - ${addOneHour(time)}`
                                                        })
                                                    }
                                                }}
                                                disabled={isUnavailable}
                                            >
                                                {formatTimeAmPm(time)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Afternoon */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Afternoon</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {groupTimeSlots(generateTimeSlots(days[activeDay].name)).afternoon.map((time) => {
                                        const isUnavailable = isTimeSlotUnavailable(days[activeDay].fullDate, time);

                                        return (
                                            <button
                                                key={`mobile-${days[activeDay].name}-${time}`}
                                                className={`py-3 rounded-lg text-center text-sm ${
                                                    isUnavailable
                                                        ? 'bg-gray-200 text-gray-400'
                                                        : isActiveTimeSlot(days[activeDay].name, time)
                                                            ? 'bg-[#E35D33] text-white'
                                                            : 'border border-[#E35D33] text-[#E35D33]'
                                                }`}
                                                onClick={() => {
                                                    if (!isUnavailable) {
                                                        setSelectedTime({
                                                            day: days[activeDay].name,
                                                            date: days[activeDay].date,
                                                            time,
                                                            formattedTime: `${time} - ${addOneHour(time)}`
                                                        })
                                                    }
                                                }}
                                                disabled={isUnavailable}
                                            >
                                                {formatTimeAmPm(time)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Evening */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Evening</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {groupTimeSlots(generateTimeSlots(days[activeDay].name)).evening.map((time) => {
                                        const isUnavailable = isTimeSlotUnavailable(days[activeDay].fullDate, time);

                                        return (
                                            <button
                                                key={`mobile-${days[activeDay].name}-${time}`}
                                                className={`py-3 rounded-lg text-center text-sm ${
                                                    isUnavailable
                                                        ? 'bg-gray-200 text-gray-400'
                                                        : isActiveTimeSlot(days[activeDay].name, time)
                                                            ? 'bg-[#E35D33] text-white'
                                                            : 'border border-[#E35D33] text-[#E35D33]'
                                                }`}
                                                onClick={() => {
                                                    if (!isUnavailable) {
                                                        setSelectedTime({
                                                            day: days[activeDay].name,
                                                            date: days[activeDay].date,
                                                            time,
                                                            formattedTime: `${time} - ${addOneHour(time)}`
                                                        })
                                                    }
                                                }}
                                                disabled={isUnavailable}
                                            >
                                                {formatTimeAmPm(time)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected time summary */}
                {selectedTime.day && selectedTime.time && (
                    <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-medium mb-2">Selected Time</h3>
                        <p>
                            <span className="font-medium">{selectedTime.day}, {selectedTime.date}</span> at <span className="font-medium">{formatTimeAmPm(selectedTime.time)} - {formatTimeAmPm(addOneHour(selectedTime.time))}</span>
                        </p>
                    </div>
                )}

                {/* Submit button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedTime.day || !selectedTime.time || isSubmitting || course.remainingSession === 0}
                        className={`cursor-pointer px-8 py-3 rounded-lg text-white font-medium text-lg w-full md:w-auto ${
                            !selectedTime.day || !selectedTime.time || isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#E35D33] hover:bg-[#d14e29] transition-colors'
                        }`}
                    >
                        {isSubmitting ? 'Submitting...' : course.remainingSession === 0 ? "Your remaining session is 0" : 'Book This Class'}
                    </button>
                </div>
            </div>
        </div>
    )
}