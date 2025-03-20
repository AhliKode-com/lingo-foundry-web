/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:50:17
 * @Last Modified by: advistasyam
 * @Last Modified time: 2025-03-20 17:44:20
 */

import React, {useState} from 'react';
import Image from "next/image";

export default function BookClass() {
    const [selectedTime, setSelectedTime] = useState({
        day: 'Sat',
        date: '07',
        time: '10:00',
        formattedTime: '12:30 pm - 13:30 pm'
    });

    const [hoveredTime, setHoveredTime] = useState({
        day: 'Sat',
        date: '07',
        time: '10:00',
        formattedTime: '12:30 pm - 13:30 pm'
    });

    const [selectedSlots, setSelectedSlots] = useState(1);
    const maxSlots = 5;

    const days = [
        {name: 'Mon', date: '02'},
        {name: 'Tues', date: '03'},
        {name: 'Wed', date: '04'},
        {name: 'Thu', date: '05'},
        {name: 'Fri', date: '06'},
        {name: 'Sat', date: '07'}
    ];

    // Generate time slots for each day
    const generateTimeSlots = (day) => {
        switch (day) {
            case 'Mon':
                return ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
            case 'Tues':
                return ['00:00', '01:00', '12:30', '13:30', '14:00', '15:00', '16:00', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00',];
            case 'Wed':
                return ['00:00', '01:00', '12:30', '13:30', '14:00', '15:00', '16:00', '17:00', '17:30', '18:00'];
            case 'Thu':
                return ['16:00', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00'];
            case 'Fri':
                return ['00:00', '01:00', '12:30', '13:30', '14:00', '15:00', '16:00', '17:00', '17:30', '18:00', '18:30', '19:00', '20:00'];
            case 'Sat':
                return ['09:00', '10:00', '13:00', '14:00', '15:00'];
            default:
                return [];
        }
    };

    const isActiveTimeSlot = (day, time) => {
        return selectedTime.day === day && selectedTime.time === time;
    };

    const isHoveredTimeSlot = (day, time) => {
        return hoveredTime.day === day && hoveredTime.time === time;
    }

    const addOneHour = (timeStr) => {
        let [hours, minutes] = timeStr.split(":").map(Number)
        hours = (hours + 1).toString().padStart(2, '0')
        return `${hours}:${minutes.toString().padStart(2, '0')}`
    }

    return (
        <div>
            <h2 className="font-bold text-xl">Book Class</h2>
            <p className="mt-2">This is where you confirm your payment details.</p>
            {/* ...the rest of your content */}

            <div className="border border-[#E35D33] rounded-2xl p-6 max-w-4xl mx-auto mt-8">
                <h2 className="text-base md:text-xl font-medium text-gray-700 mb-6">These are the last time slots available! Book now
                    before its too late.</h2>

                <div className="flex gap-6 mb-6 flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-gray-600 mb-3">Product Paid</h3>
                        <div
                            className="border border-gray-300 rounded-lg p-4 flex items-center gap-3 shadow-md h-[96px]">
                            <div className="bg-gray-200 rounded-lg w-12 h-12 flex items-center justify-center">
                                {/*<div className="w-8 h-8 bg-gray-400 rounded-full"></div>*/}
                                <Image src="/assets/tutor-profiles/tutor-2.png" alt={"tutor-img"} width={45} height={45}
                                       priority/>
                            </div>
                            <div>
                                <div className="text-gray-700">
                                    <span className="font-medium">JAMES</span>
                                    <span>🧠</span>
                                    <span>IELTS/TOEIC</span>
                                </div>
                                <div>
                                    <span>TEST</span>
                                    <span>📝</span>
                                    <span>Engineering</span>
                                    <span>😊</span>
                                </div>
                                <div className="text-gray-600 text-sm">English - Children (6-11)</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h3 className="text-gray-600 mb-3">Course Package</h3>
                        <div
                            className="border border-gray-300 rounded-lg p-4 shadow-md h-[96px] flex flex-col items-start justify-center">
                            <div className="font-medium">5 Hours Session</div>
                            <div className="text-gray-600">
                                Reservation Deadline: <span className="text-[#E35D33] font-bold">March 25, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-3 md:gap-0">
                    <div className="flex items-center gap-2">
                        <div className="text-gray-600">02 - 07 March</div>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center border rounded text-gray-400 text-center">
                                <span>&#8249;</span>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center border rounded text-gray-400">
                                <span>&#8250;</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm md:text-base text-center">
                        <span>Please select your lesson start time (GMT +07:00) Jakarta, ID</span>
                        <span className="ml-1">&#9660;</span>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-2 mb-3 md:mb-6 mt-6 md:mt-0">
                    {days.map((day) => (
                        <div key={day.name} className="flex flex-col items-center text-sm md:text-base">
                            <div className="mb-1 md:mb-2 text-gray-600">{day.name}</div>
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
                            {generateTimeSlots(day.name).map((time) => (
                                <button
                                    key={`${day.name}-${time}`}
                                    className={`w-full py-1 md:py-2 my-1 rounded relative cursor-pointer text-xs md:text-base ${
                                        isActiveTimeSlot(day.name, time)
                                            ? 'bg-[#E35D33] text-white'
                                            : 'text-[#E35D33]'
                                    }`}
                                    onClick={() => setSelectedTime({
                                        day: day.name,
                                        date: day.date,
                                        time,
                                        formattedTime: `${time} - ${addOneHour(time)}`
                                    })}
                                    onMouseEnter={() => setHoveredTime({
                                        day: day.name,
                                        date: day.date,
                                        time,
                                        formattedTime: '12:30 pm - 13:30 pm'
                                    })}
                                >
                                    {time}
                                    {isActiveTimeSlot(day.name, time) && isHoveredTimeSlot(day.name, time) && (
                                        <div
                                            className="absolute bg-white border shadow-lg rounded-lg p-4 w-64 z-50 -top-12 -right-[250px] animation-effect hidden md:block">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                                <div>
                                                    <div className="font-medium text-sm">Selected</div>
                                                    <div className="text-gray-700 text-sm">English - Children (6-11)
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-gray-600 text-sm">{selectedTime.formattedTime}</div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-gray-600 text-sm md:text-base">
                    Already <span className="text-green-500">selected {selectedSlots}</span>, still can select <span
                    className="text-[#E35D33]">{maxSlots - selectedSlots}/{maxSlots}</span>
                </div>
            </div>
        </div>
    )
}