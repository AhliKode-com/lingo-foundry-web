/*
 * @Author: danteclericuzio
 * @Date: 2025-03-18 13:16:49
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-19 22:36:27
 */

"use client"

import Link from "next/link"

export default function TeacherProfileCardDashboard({teacher}) {

    return (
        <div className="relative h-full">
        {/* Teacher Card */}
        <div className="h-full w-full p-[15px] rounded-[16px] border-[1px] border-[#CCCCCC] bg-white flex flex-col justify-between">
          <div>
            <div className="mx-auto flex flex-col items-center gap-4">
              <img
                src={teacher.tutorProfilePhotoUrl || "/placeholder.svg"}
                alt="Teacher profile picture"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col my-[10px]">
              <span className="line-clamp-2 text-[15px] font-bold">{teacher.tutorName}</span>
              <div className="flex gap-[12px] items-center my-[5px]">
                <div className="flex items-center">
                  <span className="text-[#E35D33]">{teacher.tutorRating}</span>
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
                <div>
                  <span className="font-medium text-[#E35D33]">{teacher.numberOfStudents}</span>
                  <span className="ml-1 text-gray-700">Students</span>
                </div>
              </div>
            </div>
            <span className="text-[13px] text-[#707070] line-clamp-2">{teacher.tutorBio}</span>
          </div>
      
          <Link
            href={`/tutor/${teacher.tutorId}`}
            key={teacher.tutorId}
            className="cursor-pointer"
          >
            <button className="mx-auto w-1/2 mt-[14px] whitespace-nowrap flex justify-center items-center rounded-[6px] bg-[#FFFFFF] border-[1px] border-[#E35D33] text-[13px] font-bold text-[#E35D33] py-[8px] px-[25px] self-center">
              Book Course
            </button>
          </Link>
        </div>
      </div>
      
    )
}

