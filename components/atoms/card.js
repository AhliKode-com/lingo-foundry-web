/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 09:28:43
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-06 16:35:48
 */

import Image from 'next/image';
import { OrangeButton, WhiteButton } from '../atoms/buttons';
import Link from 'next/link';

export function LookingCard({
    image, 
    alt, 
    title, 
    desc, 
    buttonType, 
    buttonText,
    href
}) {
    return (
        <div className="items-center flex flex-col w-full md:h-[455px] py-[30px] md:py-[50px] px-[15px] md:px-[46px] drop-shadow-xl bg-white rounded-[10px] animation-effect">
            <Image 
                src={image} 
                alt={alt} 
                width={100}
                height={100}
                className="w-[96px] h-[100px] mx-auto" 
                priority
            />
            
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
                <Link href={href}>
                    <WhiteButton text={buttonText} />
                </Link>
            ) : (
                <Link href={href}>
                    <OrangeButton text={buttonText} />
                </Link>
            )}
        </div>
    )
}