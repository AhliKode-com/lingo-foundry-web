/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-23 15:36:40
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import { LastDaysButton } from "@/components/atoms/buttons";
import Image from "next/image";
import Link from "next/link";

export default function NewSubscriptions() {
    const subsData = [
        {title: 'Profile Views', num: 0},
        {title: 'Trial lessons', num: 0},
        {title: 'New subscriptions', num: 0},
        {title: 'Average profile position', num: 0},
        {title: 'Take a trial lesson', num: 10},
        {title: 'Subscribe after the trial lesson', num: 10},
    ]
    return (
        <div className="flex flex-col mt-[85px]">
            <div className="flex md:flex-row flex-col gap-[20px] md:gap-0 items-center">
                <div className="flex flex-col">
                    <TitleStudentDashboard text="New subscriptions"/>
                    <span className="text-[#4D4C5C]">See how many learners take the next steps after viewing your profile or taking a trial lesson.</span>
                </div>
                <LastDaysButton custom="ml-auto"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[8px] mt-[24px] animation-effect">
                {subsData.map((item, index) => {
                    return(
                        <div key={index} className="min-h-[164px] p-[17px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-[#6A697C] text-[12px]">{item.desc}</span>
                                </div>
                                <div className="flex items-center mt-auto justify-between w-full">
                                    <span className="text-[24px] md:text-[32px] font-medium">{index >= 4 ? `${item.num}%` : item.num}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <span className="text-[12px] text-[#050507] mt-[12px] text-end">Data from Dec 26 – Mar 26. Live metrics updated Mar 26, 15:05.</span>
            <div className="mt-[50px] flex md:flex-row flex-col gap-[22px]">
                <div className="rounded-[4px] flex flex-col gap-[8px] bg-[#FDE0D7] border-[1px] border-[#DCDCE5] p-[16px]">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[#4D4C5C]">Goals achieved</span>
                            <span className="text-[#4D4C5C] text-[12px]">Congrats, you’re a Super Tutor for March!</span>
                        </div>
                        <Image
                            src="/assets/tutor-dashboard/goal.svg"
                            width={60}
                            height={60}
                            alt="medal"
                            className=""
                        />
                    </div>
                    <span className="text-[24px] md:text-[32px] font-medium">0/0</span>
                </div>
                <div className="rounded-[4px] flex-1 flex flex-col gap-[8px] bg-[#FDE0D7] border-[1px] border-[#DCDCE5] py-[51px] px-[32px]">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[21px] font-medium">Super tutor</span>
                            <span className="text-[14px] md:text-[16px] md:max-w-[350px]">Achieve all 7 goals to become a Super Tutor, and create your group lessons.</span>
                        </div>
                        <Link href={'/tutor-dashboard'} passHref>
                            <button
                                className="rounded-[8px] mt-[16px] bg-[#E35D33] cursor-pointer flex h-[38px] md:h-[48px] justify-center items-center text-white p-4 font-medium text-[14px] md:text-[16px] animation-effect whitespace-nowrap"
                            >
                                See your latest results
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}