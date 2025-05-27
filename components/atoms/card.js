/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 09:28:43
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-23 23:42:37
 */

import Image from 'next/image';
import { OrangeButton, WhiteButton } from '../atoms/buttons';
import Link from 'next/link';
import { FiMessageSquare } from "react-icons/fi";

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

export const StudentCard = ({ data, onSendMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img 
                src={data.img || "/placeholder.svg"} 
                alt={data.name} 
                className="w-[265px] h-[312px] object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg";
                }}
            />
            <div className="flex flex-col items-center justify-center gap-[6px] py-[16px] w-[265px] border-[1px] border-[#E9EAF0]">
                <span className="text-[18px] font-medium">{data.name}</span>
                <span className="text-[14px] text-[#8C94A3]">{data.skill}</span>
            </div>
            <div className="flex flex-col items-center justify-center py-[16px] gap-[16px] w-[265px] border-[1px] border-[#E9EAF0]">
                <span className="text-[13px] font-medium text-[#4E5566]">{data.subject}</span>
                <button 
                    onClick={onSendMessage}
                    className="cursor-pointer text-[#E35D33] px-[58px] py-[14px] bg-[#FFEEE8] font-semibold text-[14px]"
                >
                    Send message
                </button>
            </div>
        </div>
    );
};