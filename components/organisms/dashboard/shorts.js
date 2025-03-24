/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 14:40:42
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 22:36:49
 */

export default function Shorts({data}) {
    return (
        <div className="flex flex-col relative w-[159px] shrink-0">
            <div className="text-[10px] text-[#F32C1F] p-[8px] bg-red-100 w-fit rounded-[4px] absolute top-[10px] left-[10px]">{data.header}</div>
            <img src={data.img} alt='men' className="h-[262px] w-[159px] rounded-[12px]"/>
            <span className="text-[13px] font-bold">{data.desc}</span>
        </div>
    )
}