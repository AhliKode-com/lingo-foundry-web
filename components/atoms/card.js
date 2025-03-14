/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 09:28:43
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 09:36:11
 */

import { OrangeButton, WhiteButton } from '../atoms/buttons';

export function LookingCard({
    image, 
    alt, 
    title, 
    desc, 
    buttonType, 
    buttonText
}) {
    return (
        <div className="items-center flex flex-col w-full md:h-[455px] py-[30px] md:py-[50px] px-[15px] md:px-[46px] drop-shadow-xl bg-white rounded-[10px] animation-effect">
            <img src={image} alt={alt} className="w-[96px] h-[100px] mx-auto" />
            
            <span className="
                text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[34px]
                font-bold
                my-[25px]
                animation-effect
            ">
                {title}
            </span>
            
            <span className="text-[#707070] text-center mb-[32px]">
                {desc}
            </span>

            {buttonType === "white" ? (
                <WhiteButton text={buttonText} />
            ) : (
                <OrangeButton text={buttonText} />
            )}
        </div>
    )
}