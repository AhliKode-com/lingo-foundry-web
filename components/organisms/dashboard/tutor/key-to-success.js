/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 09:25:42
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import Image from "next/image";
import { LastDaysButton } from "@/components/atoms/buttons";

export default function KeyToSuccess() {
    const keysData = [
        {title: 'Lessons you rescheduled', desc: 'Aim for less than 10%', num: 0},
        {title: 'Lessons you cancelled', desc: 'Aim for less than 5%', num: 0},
        {title: 'Total lessons missed', desc: 'Aim for 0%', num: 0, condition: 'lte' },
        {title: 'Weekly lessons', desc: 'Aim for 75%', num: 0, condition: 'gte' },
        {title: 'Lessons in the Lingo Foundry classroom', desc: 'Aim for 75%', num: 0, condition: 'gte' },
        {title: 'Replies within 24h', desc: 'Aim for 90%', num: 0},
        {title: 'Trial follow-ups', desc: 'Aim for 90%', num: 0},
        {title: 'Popular time slots', desc: 'Aim for more than 60', num: 117, condition: 'gte' },
        {title: 'Average review rating', desc: 'Aim for more than 4.8', num: 0.0, condition: 'gte' },
        {title: 'Profile score', desc: 'Aim for more than 60', num: 80, condition: 'gte' },
        {title: 'Price per lesson', desc: '', num: 150000 }
    ]
    const line1 = keysData.slice(0, 2)
    const line2 = keysData.slice(2, 5)
    const line3 = keysData.slice(5, 7)
    const line4 = keysData.slice(7, 11)

    const formatValue = (item) => {
        if (item.title === 'Price per lesson') {
            return `Rp${Number(item.num).toLocaleString('id-ID')}`
        } else if (item.title === 'Profile score') {
            return `${item.num}/100`
        } else if (item.title === 'Average review rating') {
            return item.num.toFixed(1)
        } else if (item.title === 'Popular time slots') {
            return item.num
        } else {
            return `${item.num}%`
        }
    }

    const getTargetStatus = (desc, num, condition = 'lte') => {
        const match = desc.match(/(\d+)%/)
        const target = match ? parseInt(match[1]) : 0
        const isMet = condition === 'lte' ? num <= target : num >= target
        return { target, isMet }
    }
    
    return (
        <div className="flex flex-col mt-[62px]">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <TitleStudentDashboard text="Keys to success"/>
                    <span className="text-[#4D4C5C]">These metrics are designed to help and support you grow your business, attract new students, and keep them engaged</span>
                </div>
                <LastDaysButton custom="ml-auto"/>
            </div>
            {/* line 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] mt-[24px]">
                {line1.map((item, index) => {
                    const { isMet } = getTargetStatus(item.desc, item.num, 'lte')
                    return(
                        <div key={index} className="min-h-[164px] p-[17px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-[#6A697C] text-[12px]">{item.desc}</span>
                                </div>
                                <div className="flex items-center mt-auto justify-between w-full">
                                    <span className="text-[24px] md:text-[32px] font-medium">{item.num}%</span>
                                    {isMet && (
                                        <Image
                                            src="/assets/green-check.svg"
                                            width={24}
                                            height={24}
                                            alt="check"
                                            className=""
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* line 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px] mt-[8px]">
                {line2.map((item, index) => {
                    const { isMet } = getTargetStatus(item.desc, item.num, item.condition || 'gte')
                    return (
                        <div key={index} className="min-h-[164px] p-[17px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-[#6A697C] text-[12px]">{item.desc}</span>
                                </div>
                                <div className="flex items-center mt-auto justify-between w-full">
                                    <span className="text-[24px] md:text-[32px] font-medium">{item.num}%</span>
                                    {isMet && (
                                        <Image
                                            src="/assets/green-check.svg"
                                            width={24}
                                            height={24}
                                            alt="check"
                                            className=""
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* line 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] mt-[8px]">
                {line3.map((item, index) => {
                    const { isMet } = getTargetStatus(item.desc, item.num, item.condition || 'gte')
                    return(
                        <div key={index} className="min-h-[164px] p-[17px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-[#6A697C] text-[12px]">{item.desc}</span>
                                </div>
                                <div className="flex items-center mt-auto justify-between w-full">
                                    <span className="text-[24px] md:text-[32px] font-medium">{item.num}%</span>
                                    {isMet && (
                                        <Image
                                            src="/assets/green-check.svg"
                                            width={24}
                                            height={24}
                                            alt="check"
                                            className=""
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <span className="text-[12px] text-[#4D4C5C] mt-[12px] text-end">Data from Dec 26 - Mar 26.</span>
            <div className="bg-[#CCE2FF] px-[12px] py-[4px] w-fit rounded-[4px] font-semibold mt-[32px]">Live</div>
            {/* line 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[8px] mt-[8px]">
                {line4.map((item, index) => {
                    const { isMet } = getTargetStatus(item.desc, item.num, item.condition || 'gte')
                    const displayValue = formatValue(item)

                    return (
                        <div key={index} className="min-h-[164px] p-[17px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                            <div className="h-full flex flex-col w-full">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-[#6A697C] text-[12px]">{item.desc}</span>
                                </div>
                                <div className="flex items-center mt-auto justify-between w-full">
                                    <span className="text-[24px] md:text-[32px] font-medium">{displayValue}</span>
                                    {item.desc && isMet && (
                                        <Image
                                            src="/assets/green-check.svg"
                                            width={24}
                                            height={24}
                                            alt="check"
                                            className=""
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <span className="text-[12px] text-[#4D4C5C] mt-[12px] text-end">Live metrics updated Mar 26, 15:05.</span>
        </div>
    )
}