/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 14:40:42
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 08:56:09
 */
"use client"
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function UpcomingZoom({data}) {
    return (
        <Link href={data.link} target="_blank" rel="noopener noreferrer" className="w-full">
            <div className=" bg-[#F9F9F9] border-[1px] border-[#E0E0E0] rounded-[16px] flex justify-between items-center py-[8px] px-[8px] md:px-[16px] animation-effect">
                <div className="flex items-center gap-[16px]">
                    <img src={data.img || "/placeholder.svg"} alt="img" className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-[8px] animation-effect object-cover"/>
                    <div className="flex flex-col gap-[4px]">
                        <span className="animation-effect text-[12px] md:text-[14px] font-bold">{data.name}</span>
                        <div className="flex md:flex-row items-center gap-[8px]">
                            <button className="whitespace-nowrap flex justify-center items-center rounded-[6px] bg-[#E35D33] text-[8px] md:text-[10px] font-bold text-[#FFF] py-[6px] px-[8px]">
                                <img src='/assets/calendar.svg' alt='calendar' className='w-[12px] h-[12px] mr-[4px]'/>
                                {data.date}
                            </button>
                            <button className="whitespace-nowrap flex justify-center items-center rounded-[6px] bg-[#1E419D] text-[8px] md:text-[10px] font-bold text-[#FFF] py-[6px] px-[8px]">
                                <img src='/assets/clock.svg' alt='calendar' className='w-[12px] h-[12px] mr-[4px]'/>
                                {data.time}
                            </button>
                        </div>
                    </div>
                </div>
                <MdOutlineKeyboardArrowRight className="text-[#8D8D8D] text-[24px]"/>
            </div>
        </Link>
    )
}