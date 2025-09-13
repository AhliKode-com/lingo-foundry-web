/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 13:09:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-13 12:17:02
 */

export function NavText({text, position}) {
    return (
        <div className={`w-full flex ${position}`}>
            <span className="text-[#E35D33] font-bold text-[16px] border-b-[1px] border-[#E35D33] w-fit animation-effect">{text}</span>
        </div>
    )
}

export function OrangeText({text, position}) {
    return (
        <div className={`w-full flex ${position}`}>
            <span className="text-[#E35D33] font-bold text-[16px] sm:text-[18px] border-b-[1px] border-[#E35D33] mb-[23px] w-fit animation-effect">{text}</span>
        </div>
    )
}

export function OrangeTextDashboard({text, position}) {
    return (
        <div className={`w-full flex ${position}`}>
            <span className="text-[#E35D33] font-bold text-[12px] md:text-[14px] w-fit animation-effect">{text}</span>
        </div>
    )
}

export function TitleText({text,custom, marginBottom, marginX}) {
    return (
        <span 
            className={`
                z-20
                text-[26px] sm:text-[34px] md:text-[44px]
                font-bold
                ${marginX}
                ${marginBottom}
                ${custom}
                animation-effect
            `}>
            {text}
        </span>
    )
}

export function TitleHeroBottom({text,custom, marginBottom, marginX}) {
    return (
        <span 
            className={`
                z-20
                text-[26px] lg:text-[20px] xl:text-[23px]
                font-bold
                ${marginX}
                ${marginBottom}
                ${custom}
                animation-effect
            `}>
            {text}
        </span>
    )
}

export function TitleDashboard({text, custom}) {
    return (
        <span className={`text-[24px] font-bold ${custom}`}>{text}</span>
    )
}

export function TitleTutorRegis({text, custom}) {
    return (
        <span className={`text-[31px] font-medium ${custom}`}>{text}</span>
    )
}

export function DescTutorRegis({text, custom}) {
    return (
        <span className={`text-[16px] ${custom}`}>{text}</span>
    )
}

export function LabelTutorRegis({text, custom}) {
    return (
        <span className={`text-[16px] ${custom}`}>{text}</span>
    )
}

export function TitleSubDashboard({text, custom}) {
    return (
        <span className={`text-[18px] font-bold ${custom} pl-[8px] border-l-[2px]`}>{text}</span>
    )
}

export function TitleStudentDashboard({text, custom}) {
    return (
        <span className={`text-[24px] font-semibold ${custom}`}>{text}</span>
    )
}

export function TitlePayment({text, custom}) {
    return (
        <div className={`${custom} underline text-[14px] md:text-[16px]`}>{text}</div>
    )
}