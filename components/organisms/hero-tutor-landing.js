/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 11:10:53
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-06 16:40:43
 */
"use client"
import { IoIosArrowDown } from "react-icons/io";
import { TutorButton } from "@/components/atoms/buttons";
import Link from "next/link";

export default function Hero() {

    return (
        <div className="relative lg:h-screen pt-[68px] sm:pt-[100.61px] pb-[100px] sm:pb-[150px] animation-effect">
            <div 
                className="absolute inset-0 bg-cover bg-center w-full mt-[100px]"
                style={{ backgroundImage: "url('/assets/hero-tutor-landing.png')" }}
            />
          
            <div className="gap-[20px] mt-[70px] relative w-full flex flex-col lg:flex-row items-center lingo-container h-full">
                <h1 className="
                    lg:w-1/2
                    z-10 font-bold text-white 
                    text-[32px] lg:text-[40px] xl:text-[56px] 
                    lg:leading-[60px] xl:leading-[84px] mt-[70px] drop-shadow-2xl
                    animation-effect"
                >
                  Plan Online Lessons from Home – Be Your Own Boss! Tutor With Lingo Foundry
                </h1>
                <div className="animation-effect w-full lg:w-1/2 bg-[#FFFFFF] rounded-[20px] p-[20px] sm:p-[36px] flex flex-col shadow-lg drop-shadow-xl">
                    <h1 className="animation-effect text-[22px] md:text-[30px] font-bold mb-[20px] md:mb-[36px]">Estimate your potential earnings</h1>
                    <button className="animation-effect mb-[16px] px-[18px] py-[12px] border-[1px] border-[#DDDFE1] w-full flex justify-between items-center">
                        <span className="text-[18px] font-medium text-[#6A6A6A]">Languages/ English</span>
                        <IoIosArrowDown className="text-[#6A6A6A] text-[18px]"/>
                    </button>
                    <button className="animation-effect mb-[20px] md:mb-[50px] px-[18px] py-[12px] border-[1px] border-[#DDDFE1] w-full flex justify-between items-center">
                        <span className="text-[18px] font-medium text-[#6A6A6A]">Languages/ English</span>
                        <IoIosArrowDown className="text-[#6A6A6A] text-[18px]"/>
                    </button>
                    <h1 className="animation-effect text-[14px] md:text-[18px]">Potential monthly income</h1>
                    <div className="animation-effect flex items-center mb-[20px] sm:mb-[36px]">
                        <h1 className="text-[26px] md:text-[36px] font-bold">Rp.24.000.000/</h1>
                        <h1 className="text-[16px] md:text-[24px] font-medium mt-auto">Month</h1>
                    </div>
                    <Link href="/tutor-detail">
                        <TutorButton text="Apply Now"/>
                    </Link>
                </div>
            </div>
        </div>
      );
}