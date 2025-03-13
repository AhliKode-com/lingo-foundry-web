/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 13:09:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 16:17:41
 */

export function OrangeText({text, position}) {
    return (
        <div className={`w-full flex ${position}`}>
            <span className="text-[#E35D33] font-bold text-[16px] sm:text-[18px] border-b-[1px] border-[#E35D33] mb-[23px] w-fit animation-effect">{text}</span>
        </div>
    )
}

export function TitleText({text}) {
    return (
        <span 
            className="
                z-20
                text-[26px] sm:text-[34px] md:text-[44px]
                font-bold
                mx-auto
                mb-[55px]
                animation-effect
        ">
            {text}
        </span>
    )
}