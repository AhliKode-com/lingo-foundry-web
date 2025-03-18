/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:23
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-18 15:39:33
 */

export function StepButton({text, onClick, bgColor}) {
    return (
        <button
          onClick={onClick}
          className={`px-[35px] py-[10px] rounded-[10px] ${bgColor} text-white font-bold`}
        >
          {text}
        </button>
    )
}

export function OrangeButton({text, marginTop, custom}) {
    return (
        <button className={`
          bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] rounded-[40px] text-white cursor-pointer animation-effect 
          ${marginTop} ${custom}`}>
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