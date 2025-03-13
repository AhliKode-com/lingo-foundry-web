/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:23
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 14:05:23
 */

export function OrangeButton({text}) {
    return (
        <button className="bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] rounded-[40px] text-white cursor-pointer">
            {text}
        </button>
    )
}

export function WhiteButton({text}) {
    return (
        <button className="bg-[#FFFFFF] text-[14px] sm:text-[16px] px-[28px] py-[11px] rounded-[40px] text-[#E15C31] cursor-pointer border-2 border-[#E15C31]">
            {text}
        </button>
    )
}