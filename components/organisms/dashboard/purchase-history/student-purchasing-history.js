/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-25 16:17:58
 */

"use client"
import {TitleStudentDashboard} from "@/components/atoms/title";
import {PurchaseHistory} from "@/components/atoms/accordion";
import {getPurchaseHistory} from "@/apis/dashboard/getPurchaseHistory";
import React from "react";

export default function StudentPurchaseHistory() {
    const {data, loading} = getPurchaseHistory()

    return (
        <div className="lingo-container flex flex-col mb-[72px]">
            <TitleStudentDashboard text="Purchase History"/>
            {loading ? (
                <div className="w-full h-[75px] bg-gray-100 animate-pulse rounded-lg mt-12" />
            ) : (
                <div className='mt-[15px] md:mt-[35px] flex flex-col gap-[25px] w-full animation-effect'>
                    {!data || !data.content || data.content.length === 0 ? (
                        <div>Your purchase history is empty</div>
                    ) : data?.content?.map((item, index) => (
                        <PurchaseHistory
                            key={index}
                            data={item}
                            defaultOpen={index === 0}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}