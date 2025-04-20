"use client"

import { useState, useEffect } from "react"
import { format, addDays, isBefore, parseISO, addHours } from "date-fns"
import RescheduleSkeleton from "@/components/organisms/dashboard/reschedule/reschedule-skeleton"
import { useStudentBooking } from "@/apis/studentBooking"
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

export default function RescheduleBookingInterface({ bookings, tutorId, orderItemId }) {
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [newDate, setNewDate] = useState("")
    const [newTime, setNewTime] = useState("12:00") // Default to noon
    const [processedBookings, setProcessedBookings] = useState([])
    const [unavailableTimes, setUnavailableTimes] = useState(null)
    const [availableTimeOptions, setAvailableTimeOptions] = useState([])

    const { createBooking, deleteBooking, tutorUnavailableTime } = useStudentBooking()
    const router = useRouter();

    function toISOStringFromGMT7(newDate, newTime) {
        // Combine date and time into one string
        const localDateTimeString = `${newDate}T${newTime}:00+07:00`;

        // Create a Date object using the ISO 8601 format with GMT+7 offset
        const date = new Date(localDateTimeString);

        // Return the ISO string in UTC
        return date.toISOString();
    }

    useEffect(() => {
        async function fetchUnavailableTime() {
            const unavailableTime = await tutorUnavailableTime(tutorId)
            setUnavailableTimes(unavailableTime)
        }
        fetchUnavailableTime()
    }, [tutorId])

    // Process bookings and determine status based on time
    useEffect(() => {
        if (!bookings || bookings.length === 0) return

        const now = new Date()
        const twentyFourHoursFromNow = addHours(now, 24)

        const processed = bookings.map(booking => {
            const startTime = parseISO(booking.startTimeLocale)

            let status
            if (isBefore(startTime, now)) {
                status = "Finished"
            } else if (isBefore(startTime, twentyFourHoursFromNow)) {
                status = "Reschedule Not Allowed"
            } else {
                status = "Reschedule Allowed"
            }

            return {
                ...booking,
                status,
                formattedDate: format(startTime, "EEE, dd MMMM, yyyy"),
                formattedTime: format(startTime, "HH:00") // Always show full hours
            }
        })

        setProcessedBookings(processed)
    }, [bookings])

    const handleBookingSelect = (booking) => {
        if (booking.status === "Reschedule Allowed") {
            setSelectedBooking(booking)
            // Reset date and time selections when a new booking is selected
            setNewDate("")
            setNewTime("12:00")
        }
    }

    // Generate available hour options (6:00 - 22:00)
    useEffect(() => {
        if (!newDate || !unavailableTimes) {
            // Default time options when no date is selected
            const defaultOptions = Array.from({ length: 17 }, (_, i) => {
                const hour = (i + 6).toString().padStart(2, '0')
                return { value: `${hour}:00`, label: `${hour}:00`, disabled: false }
            })
            setAvailableTimeOptions(defaultOptions)
            return
        }

        // Find unavailable times for the selected date
        const unavailableForDate = unavailableTimes.find(item => item.date === newDate)
        const unavailableHours = unavailableForDate ? unavailableForDate.time.map(time => time.split(':')[0]) : []

        // Create time options and mark unavailable ones as disabled
        const timeOptions = Array.from({ length: 17 }, (_, i) => {
            const hour = (i + 6).toString().padStart(2, '0')
            const isDisabled = unavailableHours.includes(hour)
            return { value: `${hour}:00`, label: `${hour}:00`, disabled: isDisabled }
        })

        setAvailableTimeOptions(timeOptions)

        // If the currently selected time is now unavailable, select the first available time
        const currentTimeHour = newTime.split(':')[0]
        if (unavailableHours.includes(currentTimeHour)) {
            const firstAvailableOption = timeOptions.find(option => !option.disabled)
            if (firstAvailableOption) {
                setNewTime(firstAvailableOption.value)
            }
        }
    }, [newDate, unavailableTimes, newTime])

    const handleDateChange = (e) => {
        setNewDate(e.target.value)
    }

    const handleTimeChange = (e) => {
        setNewTime(e.target.value)
    }

    // Check if a date has all times unavailable
    const isDateFullyBooked = (dateStr) => {
        if (!unavailableTimes) return false

        const unavailableForDate = unavailableTimes.find(item => item.date === dateStr)
        if (!unavailableForDate) return false

        // Check if all hours (6-22) are unavailable
        return unavailableForDate.time.length >= 17
    }

    // Disable dates that are fully booked
    const disableDates = (date) => {
        if (!unavailableTimes) return false

        const dateStr = format(date, "yyyy-MM-dd")
        return isDateFullyBooked(dateStr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedBooking) {
            const startTime = toISOStringFromGMT7(newDate, newTime)

            toast.loading("Rescheduling booking...")

            const bookingData = {
                orderItemId: orderItemId,
                startTime
            };

            // delete booking first
            await deleteBooking(selectedBooking.id)
            await createBooking(bookingData)

            toast.dismiss()
            toast.success("Reschedule success")

            location.reload()
        } else {
            console.log("No booking selected for rescheduling")
        }
    }

    if (bookings === null || unavailableTimes === null) {
        return <RescheduleSkeleton />
    }

    if (!bookings || bookings.length === 0) {
        return <div className="text-center py-8">No bookings found</div>
    }

    return (
        <div className="border border-gray-300 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto mt-8">
            <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">
                Your Scheduled Lessons
            </h2>

            {/* Product Info */}
            <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Product Paid</p>
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            <img src="/placeholder.svg" alt="Instructor" className="w-12 h-12 object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 font-medium text-sm sm:text-base">
                                {bookings[0]?.subjectName || "No subject name available"}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{bookings[0]?.subjectLevel}</p>
                            <p className="text-xs sm:text-sm text-gray-600">{bookings?.length} hours</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookings List */}
            <div className="mb-6">
                <h3 className="text-base font-medium mb-3">Your Bookings</h3>

                {processedBookings.map((booking) => (
                    <div
                        key={booking.id}
                        className={`border rounded-lg p-3 mb-3 ${
                            selectedBooking?.id === booking.id ? "border-blue-500" : "border-gray-200"
                        } ${booking.status === "Reschedule Allowed" ? "cursor-pointer" : "cursor-default"}`}
                        onClick={() => handleBookingSelect(booking)}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Date</p>
                                <div className={`border rounded p-2 text-sm ${
                                    booking.status === "Finished" ? "bg-gray-100 text-gray-500" : "bg-white text-gray-800"
                                }`}>
                                    {booking.formattedDate}
                                </div>
                            </div>

                            <div className="mt-2 sm:mt-0">
                                <p className="text-xs text-gray-500 mb-1">Time</p>
                                <div className={`border rounded p-2 text-sm ${
                                    booking.status === "Finished" ? "bg-gray-100 text-gray-500" : "bg-white text-gray-800"
                                }`}>
                                    {booking.formattedTime}
                                </div>
                            </div>

                            <div className="mt-2 sm:mt-0">
                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                <div className={`border rounded p-2 text-sm ${
                                    booking.status === "Finished" ? "bg-gray-100 text-gray-500" :
                                        booking.status === "Reschedule Not Allowed" ? "bg-yellow-50 text-yellow-700" :
                                            "bg-green-50 text-green-700"
                                }`}>
                                    {booking.status}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reschedule Form */}
            {selectedBooking && (
                <form onSubmit={handleSubmit} className="border-t pt-4">
                    <h3 className="text-base font-medium mb-3">Reschedule Booking</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Select a new date and time for your lesson. The new time must be at least 24 hours from now.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">New Date</label>
                            <input
                                type="date"
                                className="w-full border rounded p-2 text-sm"
                                min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                                value={newDate}
                                onChange={handleDateChange}
                                required
                            />
                            {newDate && unavailableTimes &&
                                unavailableTimes.find(item => item.date === newDate) && (
                                    <p className="text-xs text-yellow-600 mt-1">
                                        Some time slots on this date are unavailable
                                    </p>
                                )}
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">New Time (6:00 - 22:00)</label>
                            <select
                                className="w-full border rounded p-2 text-sm"
                                value={newTime}
                                onChange={handleTimeChange}
                                required
                                disabled={!newDate}
                            >
                                {availableTimeOptions.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        disabled={option.disabled}
                                    >
                                        {option.label} {option.disabled ? "(Unavailable)" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-gray-600 font-medium py-2 px-4 mr-2 rounded transition-colors"
                            onClick={() => setSelectedBooking(null)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors hover:bg-blue-700"
                        >
                            Reschedule Lesson
                        </button>
                    </div>
                </form>
            )}

            {!selectedBooking && processedBookings.some(booking => booking.status === "Reschedule Allowed") && (
                <div className="text-center text-sm text-gray-600 mt-4">
                    Select a booking with &#34;Reschedule Allowed&#34; status to reschedule it.
                </div>
            )}
        </div>
    )
}