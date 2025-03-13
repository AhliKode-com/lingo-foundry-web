/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:23
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 00:51:08
 */

export function OrangeButton({text}) {
    return (
        <button className="bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] rounded-[40px] text-white cursor-pointer animation-effect">
            {text}
        </button>
    )
}

export function WhiteButton({text}) {
    return (
        <button className="bg-[#FFFFFF] text-[14px] sm:text-[16px] px-[28px] py-[11px] rounded-[40px] text-[#E15C31] cursor-pointer border-2 border-[#E15C31] animation-effect">
            {text}
        </button>
    )
}

export function CategoryButton({ text, isSelected, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`px-[20px] py-[10px] md:px-[35px] md:py-[16px] rounded-[40px] text-[16px] font-bold animation-effect
          ${
            isSelected
              ? "bg-[#E35D33] text-white"
              : "bg-[#FF723A10] text-[#E35D33]"
          }
        `}
      >
        {text}
      </button>
    );
}