"use client"

import Image from "next/image"
import { useState } from "react"

export default function TeacherProfileCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative flex justify-start mt-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Teacher Card */}
            <div className="relative max-w-4xl w-full p-6 rounded-xl border border-gray-200 shadow-sm bg-white transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden">
                            <Image
                                src="/assets/tutor-profiles/tutor-1.png"
                                alt="Teacher profile picture"
                                width={160}
                                height={160}
                                className="object-cover"
                            />
                        </div>
                        <button className="w-full py-2 px-4 border border-[#E35D33] rounded-xl text-sm font-medium text-[#E35D33] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors cursor-pointer">
                            Follow
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl md:text-2xl font-bold">Professional Teacher Mila Smith</h1>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="#ef4444"
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-red-500"
                                    >
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-y-2">
                                    <div className="flex items-center">
                                        <span className="mr-1">⭐</span>
                                        <span className="font-medium">CELTA & TESOL Certified</span>
                                        <span className="mx-1">📚</span>
                                        <span>10 Years Experience</span>
                                    </div>
                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
                                    <div className="flex items-center">
                                        <span className="mr-1">💥</span>
                                        <span className="font-medium text-orange-500">13,000+</span>
                                        <span className="text-orange-500">Lessons</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-1">⭐</span>
                                        <span className="text-orange-500">Kids & Adults</span>
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex items-center">
                                        <span className="text-xl font-medium">4.8</span>
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
                                            className="w-5 h-5"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500">(256)</span>
                                    <div className="ml-4">
                                        <span className="font-medium text-orange-500">6593+</span>
                                        <span className="ml-1 text-gray-700">Students</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                                        <span className="font-medium">Speaks:</span>
                                        <span>English</span>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md">Native</span>
                                        <span>,</span>
                                        <span>Chinese</span>
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md">A1 Beginner</span>
                                        <span>,</span>
                                        <span>Turkish</span>
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md">C2 Proficient</span>
                                        <span className="text-gray-500">+4</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <p className="text-gray-700">
                                        <span className="mr-1">👨‍🏫</span>5 years of enriching experience teaching English to children and
                                        adults!
                                        <span className="mx-1">🔮</span>
                                        US Native Pennsylvania graduate
                                    </p>
                                    <p className="mt-1 text-gray-700">
                                        <span className="mr-1">🎯</span>
                                        Specialized in Conversational, Business...
                                    </p>
                                    <button className="mt-2 text-[#E35D33] font-medium">Read More</button>
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-4">
                                <div className="text-left">
                                    <p className="text-3xl font-bold text-[#E35D33]">Rp. 50.000</p>
                                    <p className="text-sm text-gray-700 max-w-[250px]">
                                        Purchase 1 trial class and get 2 times free experiences
                                    </p>
                                </div>
                                <div className="w-full md:w-auto flex flex-col gap-3">
                                    <button className="w-full md:w-[180px] py-2.5 px-4 bg-[#E35D33] hover:bg-orange-600 text-white font-medium rounded-xl shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer">
                                        Book Trial
                                    </button>
                                    <button className="w-full md:w-[180px] py-2.5 px-4 border border-[#E35D33] rounded-xl text-sm font-medium text-[#E35D33] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors cursor-pointer">
                                        Book Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Panel */}
                <div
                    className={`absolute right-0 top-0 transform transition-all duration-300 bg-white border border-gray-200 rounded-xl shadow-lg w-[400px] z-10 ${
                        isHovered
                            ? "translate-x-[calc(100%+20px)] opacity-100 visible"
                            : "translate-x-[calc(100%-20px)] opacity-0 invisible pointer-events-none"
                    }`}
                >
                    {/* Introduction Videos Carousel */}
                    <div className="p-4 pb-0">
                        <div className="flex gap-2 overflow-x-auto pb-4">
                            <div className="flex-shrink-0 relative w-[150px] h-[200px] rounded-lg overflow-hidden">
                                <Image
                                    src="/assets/tutor-profiles/detail-course.png"
                                    alt="Self Introduction"
                                    width={150}
                                    height={200}
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                    Self Introduction
                                </div>
                            </div>
                            <div className="flex-shrink-0 relative w-[150px] h-[200px] rounded-lg overflow-hidden ">
                                <Image
                                    src="/assets/tutor-profiles/detail-course.png"
                                    alt="Course Introduction"
                                    width={150}
                                    height={200}
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                    Course Introduction
                                </div>
                            </div>
                            <div className="flex-shrink-0 relative w-[150px] h-[200px] rounded-lg overflow-hidden">
                                <Image
                                    src="/assets/tutor-profiles/detail-course.png"
                                    alt="Course Demo"
                                    width={150}
                                    height={200}
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                                    Course Demo
                                </div>
                            </div>
                        </div>

                        {/* Timezone Info */}
                        <p className="text-xs text-gray-500 mb-4">
                            * All times listed are in your local timezone: Bangkok GMT +07:00
                        </p>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="px-4">
                        <div className="border rounded-lg overflow-hidden">
                            {/* Days of Week */}
                            <div className="grid grid-cols-8 text-center text-sm font-medium border-b">
                                <div className="py-2 border-r"></div>
                                <div className="py-2 border-r">MON</div>
                                <div className="py-2 border-r">TUE</div>
                                <div className="py-2 border-r">WED</div>
                                <div className="py-2 border-r">THU</div>
                                <div className="py-2 border-r">FRI</div>
                                <div className="py-2 border-r">SAT</div>
                                <div className="py-2">SUN</div>
                            </div>

                            {/* Time Slots */}
                            <div className="grid grid-cols-8 text-sm border-b">
                                <div className="p-2 border-r">
                                    <div className="font-medium">morning</div>
                                    <div className="text-xs text-gray-500">06:00-12:00</div>
                                </div>
                                <div className="border-r"></div>
                                <div className="border-r bg-orange-200"></div>
                                <div className="border-r"></div>
                                <div className="border-r bg-orange-300 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-orange-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                                <div className="border-r"></div>
                                <div className="border-r bg-orange-200"></div>
                                <div className=""></div>
                            </div>

                            <div className="grid grid-cols-8 text-sm border-b">
                                <div className="p-2 border-r">
                                    <div className="font-medium">afternoon</div>
                                    <div className="text-xs text-gray-500">12:00-18:00</div>
                                </div>
                                <div className="border-r bg-orange-300 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-orange-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                                <div className="border-r"></div>
                                <div className="border-r bg-orange-200"></div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="bg-orange-300 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-orange-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-8 text-sm border-b">
                                <div className="p-2 border-r">
                                    <div className="font-medium">evening</div>
                                    <div className="text-xs text-gray-500">18:00-24:00</div>
                                </div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="border-r relative">
                                    <div className="absolute bottom-1 right-1 bg-green-800 text-white text-[10px] px-1 py-0.5 rounded">
                                        2 Students on Sat at 2AM
                                    </div>
                                </div>
                                <div className=""></div>
                            </div>

                            <div className="grid grid-cols-8 text-sm">
                                <div className="p-2 border-r">
                                    <div className="font-medium">late night</div>
                                    <div className="text-xs text-gray-500">00:00-06:00</div>
                                </div>
                                <div className="border-r"></div>
                                <div className="border-r"></div>
                                <div className="border-r bg-orange-300 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-orange-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                                <div className="border-r"></div>
                                <div className="border-r bg-orange-200"></div>
                                <div className="border-r"></div>
                                <div className="relative">
                                    <div className="absolute bottom-2 right-2 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-500"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View More Button */}
                    <div className="p-4">
                        <button className="w-full py-2.5 px-4 border border-orange-500 text-orange-500 rounded-md text-sm font-medium hover:bg-orange-50 transition-colors">
                            View More
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

