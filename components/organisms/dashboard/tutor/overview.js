/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-22 10:03:01
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import { LastDaysButton } from "@/components/atoms/buttons";
import Image from "next/image";

export default function Overview() {
    const overviewData = [
        {img: '/assets/tutor-dashboard/1.svg', num: '19', desc: 'Active Lessons'},
        {img: '/assets/tutor-dashboard/2.svg', num: '241', desc: 'Active Lessons'},
        {img: '/assets/tutor-dashboard/3.svg', num: '951', desc: 'Completed Lessons'},
        {img: '/assets/tutor-dashboard/4.svg', num: '121', desc: 'New Students'},
        {img: '/assets/tutor-dashboard/5.svg', num: '3', desc: 'New Followers'},
        {img: '/assets/tutor-dashboard/6.svg', num: '56489', desc: 'Lessons Sold'}
    ]
    return (
        <div className="flex lg:flex-row flex-col px-[32px] py-[44px] bg-[#FDE0D7] mt-[56px] justify-between gap-[24px] lg:gap-0">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <TitleStudentDashboard text="Overview" />
                    <span className="text-[#4D4C5C]">Your business at a glance.</span>
                </div>
                <LastDaysButton custom="mt-auto"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px]">
                {overviewData.map((item, index) => (
                    <div key={index} className="p-[24px] flex items-center gap-[24px] bg-white">
                        <Image
                            src={item.img}
                            height={60}
                            width={60}
                            className=""
                            alt="logo"
                        />
                        <div className="flex flex-col gap-[12px]">
                            <span className="text-[24px]">{Number(item.num).toLocaleString()}</span>
                            <span className="text-[#4E5566] text-[14px]">{item.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}