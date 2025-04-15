/*
 * @Author: danteclericuzio
 * @Date: 2025-03-18 13:16:49
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-06 17:04:40
 */

"use client"

import {useState} from "react";

export default function TeacherProfileCard({ teacher, isOpen, onHover, onClick }) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const todayIndex = new Date().getDay()
    const orderedDays = [...days.slice(todayIndex), ...days.slice(0, todayIndex)]

    const getPopoverText = (info) => {
        switch (info) {
            case 1:
                return "Available";
            case 2:
                return "Partially Booked";
            case 3:
                return "Almost Full";
            default:
                return "Fully Booked";
        }
    };

    const [playingIndex, setPlayingIndex] = useState(null);

    return (
        <div
            className="cursor-pointer relative flex justify-center xl:justify-start mt-6"
            onMouseEnter={onHover}
            onClick={onClick}
        >
            {/* Teacher Card */}
            <div className="relative max-w-4xl xl:max-w-3xl w-full p-6 rounded-xl border border-gray-200 shadow-sm bg-white transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={teacher.tutorProfilePhotoUrl || "/placeholder.svg"}
                            alt="Teacher profile picture"
                            className="w-[100px] h-[100px] rounded-full object-cover"
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg md:text-2xl font-bold">{teacher.tutorName}</h1>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-y-2 text-xs md:text-base">
                                    <p className="line-clamp-3">
                                        {teacher.tutorBio}
                                    </p>
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs md:text-base">
                                    <div className="flex items-center">
                                        <span className="mr-1">💥</span>
                                        <span className="font-medium text-orange-500">{teacher.numberOfCourses}</span>
                                        <span className="text-orange-500">{" "}Lessons</span>
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-xs md:text-base">
                                    <div className="flex items-center">
                                        <span className="font-medium">{teacher.tutorRating}{" "}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="#f97316"
                                            stroke="#f97316"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-3 md:w-5 h-3 md:h-5"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500">(256)</span>
                                    <div className="ml-4">
                                        <span className="font-medium text-orange-500">{teacher.numberOfStudents}</span>
                                        <span className="ml-1 text-gray-700">Students</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Panel */}
                <div
                    className={`hidden xl:block absolute right-0 top-0 transform transition-all duration-300 bg-white border border-gray-200 rounded-xl shadow-lg w-[400px] z-10 
                        ${isOpen
                            ? "translate-x-[calc(100%+20px)] opacity-100 visible"
                            : "translate-x-[calc(100%-20px)] opacity-0 invisible pointer-events-none"
                          }
                          
                    `}
                >
                    {/* Introduction Videos Carousel */}
                    <div className="p-4 pb-0">
                        <div className="flex gap-2 overflow-x-auto pb-4">
                            {teacher.tutorVideoUrls.map((content, index) => (
                                <div key={index}>
                                    {Array.isArray(content) && content.map((val, index) => (
                                        <div
                                            key={index}
                                            className="relative w-[150px] h-[200px] rounded-lg overflow-hidden cursor-pointer"
                                            onClick={() => setPlayingIndex(index)}
                                        >
                                            {playingIndex === index ? (
                                                <iframe
                                                    className="absolute inset-0 w-full h-full"
                                                    src={val.videoUrl}
                                                    title={val.videoName}
                                                    frameBorder="0"
                                                    allow="autoplay; encrypted-media"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <>
                                                    <img
                                                        src={val.thumbnailUrl}
                                                        alt={val.videoDescription}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                                        {val.videoDescription}
                                                    </div>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                                        ▶️
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Timezone Info */}
                        <p className="text-xs text-gray-500 mb-4">
                            * All times listed are in your local timezone: Bangkok GMT +07:00
                        </p>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="px-4 py-4 z-50">
                        <div className="border border-[#E8E9EB] rounded-lg overflow-hidden">
                            {/* Days of Week */}
                            <div className="grid grid-cols-10 text-center text-xs font-medium border-b border-[#E8E9EB]">
                                <div className="py-2 border-r col-span-3 border-[#E8E9EB]"></div>
                                {orderedDays.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`py-2 border-r border-[#E8E9EB] ${index === orderedDays.length - 1 ? "" : "border-r border-[#E8E9EB]"}`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Time Slots */}
                            <div className="grid grid-cols-10 text-sm border-b border-[#E8E9EB]">
                                <div className="p-2 border-r col-span-3 border-[#E8E9EB]">
                                    <div className="font-medium">morning</div>
                                    <div className="text-xs text-gray-500 whitespace-nowrap">06:00-12:00</div>
                                </div>
                                {teacher.tutorSchedulePreviews.map((schedule, index) =>
                                    index === 7 ? null : (
                                        <div key={index} className="relative group border-r border-[#E8E9EB] cursor-pointer">
                                            <div className="absolute bottom-full -left-2 transform -translate-x-1/2 mb-2 w-max bg-[#10312B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {getPopoverText(schedule.morning)}
                                            </div>
                                            <div
                                                className={`w-full h-full flex items-center justify-center border-r border-[#E8E9EB] ${
                                                    schedule.morning === 1
                                                        ? "bg-white"
                                                        : schedule.morning === 2
                                                            ? "bg-[#FF9474]"
                                                            : "bg-[#E25D33]"
                                                }`}
                                            >
                                                {schedule.morning > 3 && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-white"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="grid grid-cols-10 text-sm border-b border-[#E8E9EB]">
                                <div className="p-2 border-r col-span-3 border-[#E8E9EB]">
                                    <div className="font-medium">afternoon</div>
                                    <div className="text-xs text-gray-500">12:00-18:00</div>
                                </div>
                                {teacher.tutorSchedulePreviews.map((schedule, index) =>
                                    index === 7 ? null : (
                                        <div key={index} className="relative group border-r border-[#E8E9EB] cursor-pointer">
                                            <div className="absolute bottom-full -left-2 transform -translate-x-1/2 mb-2 w-max bg-[#10312B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {getPopoverText(schedule.afternoon)}
                                            </div>
                                            <div
                                                className={`w-full h-full flex items-center justify-center border-r border-[#E8E9EB] ${
                                                    schedule.afternoon === 1
                                                        ? "bg-white"
                                                        : schedule.afternoon === 2
                                                            ? "bg-[#FF9474]"
                                                            : "bg-[#E25D33]"
                                                }`}
                                            >
                                                {schedule.afternoon > 3 && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-white"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="grid grid-cols-10 text-sm border-b border-[#E8E9EB]">
                                <div className="p-2 border-r border-[#E8E9EB] col-span-3">
                                    <div className="font-medium">evening</div>
                                    <div className="text-xs text-gray-500">18:00-24:00</div>
                                </div>
                                {teacher.tutorSchedulePreviews.map((schedule, index) =>
                                    index === 7 ? null : (
                                        <div key={index} className="relative group border-r border-[#E8E9EB] cursor-pointer">
                                            <div className="absolute bottom-full -left-2 transform -translate-x-1/2 mb-2 w-max bg-[#10312B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {getPopoverText(schedule.evening)}
                                            </div>
                                            <div
                                                className={`w-full h-full flex items-center justify-center border-r border-[#E8E9EB] ${
                                                    schedule.evening === 1
                                                        ? "bg-white"
                                                        : schedule.evening === 2
                                                            ? "bg-[#FF9474]"
                                                            : "bg-[#E25D33]"
                                                }`}
                                            >
                                                {schedule.evening > 3 && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-white"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="grid grid-cols-10 text-sm">
                                <div className="p-2 border-r border-[#E8E9EB] col-span-3">
                                    <div className="font-medium">late night</div>
                                    <div className="text-xs text-gray-500">00:00-06:00</div>
                                </div>
                                {teacher.tutorSchedulePreviews.map((schedule, index) =>
                                    index === 7 ? null : (
                                        <div key={index} className="relative group border-r border-[#E8E9EB] cursor-pointer">
                                            <div className="absolute bottom-full -left-2 transform -translate-x-1/2 mb-2 w-max bg-[#10312B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {getPopoverText(schedule.lateNight)}
                                            </div>
                                            <div
                                                className={`w-full h-full flex items-center justify-center border-r border-[#E8E9EB] ${
                                                    schedule.lateNight === 1
                                                        ? "bg-white"
                                                        : schedule.lateNight === 2
                                                            ? "bg-[#FF9474]"
                                                            : "bg-[#E25D33]"
                                                }`}
                                            >
                                                {schedule.lateNight > 3 && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-white"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

