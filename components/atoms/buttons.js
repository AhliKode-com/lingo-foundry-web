/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:23
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-12 13:30:40
 */

export default function Button({text}) {
    return (
        <button className="bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[14px] rounded-[40px] text-white cursor-pointer">
            {text}
        </button>
    )
}