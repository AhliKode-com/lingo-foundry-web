/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 11:08:10
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-05 23:51:48
 */
"use client"
import { TitleSubDashboard } from "@/components/atoms/title";
import Shorts from "@/components/organisms/dashboard/shorts";
import { getShortDashboard } from '@/apis/dashboard/getLearningShorts';

export default function StudentShorts() {

    const { data: {content}, loading } = getShortDashboard();
    
    return(
        <div className="lingo-container flex flex-col mb-[100px]">
            <TitleSubDashboard text="Learning Shorts" custom="mb-[22px] w-full border-[#FFBA7D]"/>
            <div className="overflow-x-auto w-full">
                <div className="flex gap-[7px]">
                    { loading ? (
                        <div className="h-[350px] w-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
                    ) : content?.length > 0 ? (
                            content?.map((link, index) => {
                                return (
                                    <Shorts key={index} data={link}/>
                                )
                            })
                    ) : (
                        <div className="text-center py-10">No Learning Shorts available.</div>
                    )}
                </div>
            </div>
        </div>
    )
}