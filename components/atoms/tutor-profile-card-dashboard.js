/*
 * @Author: danteclericuzio
 * @Date: 2025-03-18 13:16:49
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 13:58:26
 */

"use client"

import Image from "next/image"

export default function TeacherProfileCardDashboard({isOpen, onHover}) {

    return (
        <div
            className="relative"
            onMouseEnter={onHover}
        >
            {/* Teacher Card */}
            <div className="relative w-full p-[15px] rounded-[16px] border-[1px] border-[#CCCCCC] bg-white">
                <div className="flex flex-col">
                    <div className="mx-auto flex flex-col items-center gap-4">
                        <Image
                            src="/assets/tutor-profiles/tutor-1.png"
                            alt="Teacher profile picture"
                            width={120}
                            height={120}
                            className="w-[100px] h-[100px]"
                            priority
                        />
                        <button className="text-[13px] px-[19px] py-[2.5px] rounded-[5px] border-[1px] border-[#E35D33] text-[#E35D33] bg-white cursor-pointer">
                            Follow
                        </button>
                        <span className="text-[#E35D33] text-[14px] font-bold">Rp.50.000 <span className="font-normal text-[#000] text-[11px]">Trial Lesson</span></span>
                    </div>
                    <div className="flex flex-col my-[10px]">
                        <span className="line-clamp-2 text-[15px] font-bold">Proffesional Teacher Mila Smith 🌟CELTA & TESOL Certified📚10 Years of experince</span>
                        <span className="text-[#E35D33] text-[13px] font-semibold">💥13,000+Lessons ⭐️ Kids & Adults</span>
                        <div className="flex justify-between items-center my-[5px]">
                            <span>Speaks: English</span>
                            <div className="flex items-center">
                                <span className="text-[#E35D33]">4.8</span>
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
                                <span className="text-[#707070]">(256)</span>
                            </div>
                        </div>
                        <span className="text-[13px] text-[#707070] line-clamp-5">👩‍🏫 5 years of enriching experience teaching English to children and adults!🦄 US Native Pennsylvania graduate 🎯Specialized in Conversational, Business and many others</span>
                    </div>
                    <div className="flex items-center justify-center gap-[8px]">
                        <button className="w-1/2 whitespace-nowrap flex justify-center items-center rounded-[6px] bg-[#E35D33] border-[1px] border-[#E35D33] text-[13px] font-bold text-[#FFF] py-[8px] px-[25px]">Book Trial</button>
                        <button className="w-1/2 whitespace-nowrap flex justify-center items-center rounded-[6px] bg-[#FFFFFF] border-[1px] border-[#E35D33] text-[13px] font-bold text-[#E35D33] py-[8px] px-[25px]">Book Course</button>
                    </div>
                </div>

                
            </div>

        </div>
    )
}

