/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 08:16:49
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-13 11:54:54
 */

import Image from "next/image";
import { OrangeButton } from "../atoms/buttons";
import { TitleText } from "../atoms/title";
import { Home } from "@/constants/en";
import Link from "next/link";

export default function Why() {
    const {whyChooseUs} = Home;

    const bgColors = {
        flexible: '#8E66FF',
        lessons: '#E35D33',
        pay: '#1E419D',
        live: '#8E66FF'
    }
    const point = [
        { id: 1, bg: "flexible", title: whyChooseUs.flexibleTitle, desc: whyChooseUs.flexibleDesc },
        { id: 2, bg: "lessons", title: whyChooseUs.lessonsTitle, desc: whyChooseUs.lessonsDesc },
        { id: 3, bg: "pay", title: whyChooseUs.payTitle, desc: whyChooseUs.payDesc },
        { id: 4, bg: "live", title: whyChooseUs.liveTitle, desc: whyChooseUs.liveDesc },
    ]

    return (
        <div className="w-full my-[50px] md:my-[100px] py-[60px] md:py-[120px] bg-gradient-to-b from-[#F14D5D10] to-[#FF723A10]">
            <div className='lingo-container mb-[55px] sm:px-0 animation-effect relative'>
                <Image 
                    src="/assets/hero-decoration.png" 
                    alt="Hero swirl update" 
                    width={150}
                    height={150}
                    className="min-[900px]:hidden absolute w-[150px] right-[28px] top-[50px] animation-effect"
                    priority
                />
                <div className="flex flex-col md:flex-row items-center gap-[10px] md:gap-[15px] xl:gap-[50px] w-full">
                    <Image 
                        src='/assets/hero-why.png' 
                        alt='why-us' 
                        width={750}
                        height={750}
                        className='hidden md:flex shrink-0 md:w-[490px] xl:w-1/2 animation-effect'
                        priority
                    />
                    <div className="flex flex-col md:w-1/2">
                        <TitleText text={whyChooseUs.title}/>
                        <div className="flex flex-1 shrink-0 flex-col gap-[30px] my-[30px]">
                            {point.map((item, index) => (
                                <div className="flex items-center gap-[10px]" key={index}>
                                    <div 
                                        style={{ backgroundColor: bgColors[item.bg] }} 
                                        className="rounded-full flex shrink-0 h-[25px] w-[25px]">
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[14px] md:text-[16px] animation-effect">{item.title}</span>
                                        <span className="text-[14px] md:text-[16px] animation-effect">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href='/find-tutor'>
                            <OrangeButton text={whyChooseUs.whyButton}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}