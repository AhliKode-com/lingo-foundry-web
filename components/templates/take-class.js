/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:51:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-20 19:34:03
 */

"use client";

import Image from "next/image";
import Link from "next/link";

export default function TakeClass() {
  const cardClass =
    "px-[25px] py-[33px] w-[386px] h-[177px] bg-white drop-shadow-md rounded-[10px] border border-[#D4D5D7]";

  const classesData = [
    {
      left: {
        image: "/assets/tutor-profiles/tutor-2.png",
        teacher1: "JAMES🇺🇸 IELTS/TOEIC",
        teacher2: "TEST 💯 Engineering 👨",
        subject: "English - Children (6-11)",
        hours: "5 hours",
      },
      right: {
        link: "https://lingofoundry.com/r/4AZZNVIRQnmqnm",
        date: "March 06, 2025",
        time: "12:30 - 13:30",
      },
    },
    {
      left: {
        image: "/assets/tutor-profiles/tutor-2.png",
        teacher1: "KEVIN IELTS/TOEIC",
        teacher2: "TEST 💯 Engineering 👨",
        subject: "English - Children (6-11)",
        hours: "5 hours",
      },
      right: {
        link: "https://lingofoundry.com/r/4AZZNVIRQnmqnm",
        date: "March 06, 2025",
        time: "12:30 - 13:30",
      },
    },
  ];

  return (
    <div className="pt-[20px] lg:py-[50px] flex justify-center">
        <div className="bg-white border border-[#CBD3E1] rounded-[20px] p-[40px] flex flex-col">
            <span className="text-[20px] font-semibold">You’re all set, take your class now</span>

            {/* Table Header */}
            <div className="my-[20px] w-full items-center gap-[8px] lg:flex hidden">
                <span className="font-semibold w-[250px] lg:w-[386px]">Class</span>
                <span className="font-semibold w-[250px] lg:w-[386px]">Schedule</span>
            </div>

            {/* Map over each row of cards */}
            <div className="flex flex-col gap-[4px] lg:gap-[27px]">
                {classesData.map((item, index) => (
                    <div key={index} className="flex flex-col lg:flex-row gap-[4px] lg:gap-[8px] border-b-[1px] lg:border-0 border-[#CBD3E1] last:border-b-0 pb-[20px] lg:pb-0">
                        {/* Left Card */}
                        <span className="text-[14px] flex lg:hidden">Class & Schedule:</span>
                        <div className={`${cardClass} flex gap-[15px]`}>
                            <Image
                                src={item.left.image}
                                alt="tutor"
                                width={50}
                                height={50}
                                priority
                                className="object-cover w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                            />
                            <div className="flex flex-col">
                                <span className="text-[14px] lg:text-[16px]">{item.left.teacher1}</span>
                                <span>{item.left.teacher2}</span>
                                <span className="text-[#545659DE] text-[14px] lg:text-[16px]">{item.left.subject}</span>
                                <span className="text-[#545659DE] text-[14px] lg:text-[16px]">{item.left.hours}</span>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className={`${cardClass} flex flex-col`}>
                            <span className="text-[#E35D33] text-[14px]">{item.right.link}</span>
                            <span className="text-[14px] font-semibold pt-[6px] pb-[8px]">Next class would be on</span>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                                {/* Date */}
                                <div className="bg-[#E35D33] py-[6px] px-[8px] flex items-center gap-[8px] rounded-[8px]">
                                    <Image
                                        src="/assets/calendar.svg"
                                        alt="calendar"
                                        width={16}
                                        height={16}
                                        priority
                                        className="object-cover"
                                    />
                                    <span className="font-bold text-[12px] text-white">{item.right.date}</span>
                                </div>
                                {/* Time */}
                                <div className="bg-[#1E419D] py-[6px] px-[8px] flex items-center gap-[8px] rounded-[8px]">
                                    <Image
                                        src="/assets/clock.svg"
                                        alt="clock"
                                        width={16}
                                        height={16}
                                        priority
                                        className="object-cover"
                                    />
                                    <span className="font-bold text-[12px] text-white">{item.right.time}</span>
                                </div>
                            </div>
                            <Link href="/" className="w-full flex justify-end">
                                <span className="underline text-[#E35D33] text-[14px] font-semibold">Go to dashboard</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
