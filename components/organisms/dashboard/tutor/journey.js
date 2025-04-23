/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-23 17:17:28
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import Image from "next/image";

export default function Journey() {
    const keysData = [
        {img: '/assets/tutor-dashboard/journey1.svg', desc: 'Hours taught', num: 100},
        {img: '/assets/tutor-dashboard/journey2.svg', desc: 'Lessons taught', num: 90 },
        {img: '/assets/tutor-dashboard/journey3.svg', desc: 'Total students', num: 60 },
        {img: '/assets/tutor-dashboard/in-love.svg', desc: 'Days on Lingo Foundry', num: 90 },
        {img: '/assets/tutor-dashboard/journey5.svg', desc: 'Total earnings', num: 100000000}
    ]
    const line1 = keysData.slice(0, 2)
    const line2 = keysData.slice(2, 5)
    
    return (
        <div className="flex flex-col my-[62px]">
            <div className="flex md:flex-row flex-col gap-[20px] md:gap-0 items-center">
                <div className="flex flex-col">
                    <TitleStudentDashboard text="Your Lingo journey"/>
                    <span className="text-[#4D4C5C]">See what you’ve accomplished since you started in March 2025.</span>
                </div>
            </div>
            {/* line 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] mt-[24px]">
                {line1.map((item, index) => {
                    return(
                        <div key={index} className="min-h-[164px] p-[25px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <Image
                                    src={item.img}
                                    height={60}
                                    width={60}
                                    className=""
                                    alt="logo"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[24px] md:text-[32px] font-medium">{item.num}</span>
                                    <span className="text-[14px]">{item.desc}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* line 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px] mt-[8px]">
                {line2.map((item, index) => {
                    return (
                        <div key={index} className="min-h-[164px] p-[25px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <Image
                                    src={item.img}
                                    height={60}
                                    width={60}
                                    className=""
                                    alt="logo"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[24px] md:text-[32px] font-medium break-words leading-tight w-full">
                                        {item.desc === "Total earnings" ? `Rp.${item.num.toLocaleString()}` : item.num}
                                    </span>
                                    <span className="text-[14px]">{item.desc}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}