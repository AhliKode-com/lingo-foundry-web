/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 14:40:42
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 14:47:15
 */

"use client"

export default function UpcomingZoom({data}) {
    return (
         <div className="bg-[#F9F9F9] border-[1px] border-[#E0E0E0] rounded-[16px] flex justify-between items-center py-[8px] px-[8px] md:px-[16px] animation-effect">
            <div className="flex items-center gap-[20px]">
                <img
                    src={data.subject?.iconUrl || "/placeholder.svg"}
                    alt={data.subject?.name}
                    className="w-12 h-12 rounded-[8px] object-cover drop-shadow-sm"
                />
                <span className="font-semibold">{data.subject?.name}</span>
            </div>
            <span className="font-semibold text-green-500">active</span>
        </div>
    )
}