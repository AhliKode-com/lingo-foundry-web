/*
 * @Author: danteclericuzio
 * @Date: 2025-03-15 16:47:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-13 12:16:39
 */

"use client"
import { usePathname } from 'next/navigation';
import { OrangeButton } from "@/components/atoms/buttons";
import { TitleHeroBottom } from "@/components/atoms/title";
import { Home } from "@/constants/en";
import Link from "next/link";

export default function HeroBottom() {
    const { heroBottom } = Home;
    const pathname = usePathname();

    return (
        <div className="lingo-container py-[50px] md:py-[115px]">
            <div className="flex flex-col lg:hidden mb-[20px] gap-[20px]">
                <TitleHeroBottom text={heroBottom.title}/>
                <span className='text-[14px]'>{heroBottom.desc}</span>
            </div>
            <div className="animation-effect text-[14px] sm:text-[16px] md:text-[18px] flex lg:hidden flex-col mb-[20px] ">
                <ol className="list-decimal list-inside my-[10px] space-y-2">
                    {heroBottom.list.map((item, idx) => (
                        <div key={idx}>
                            <li className='font-semibold'>{item.title}</li>
                            <span>{item.desc}</span>
                        </div>  
                    ))}
                </ol>
            </div>
            <div 
                className="
                animation-effect
                relative
                w-full
                h-[200px] md:h-[500px] xl:h-[800px]
                bg-[url('/assets/hero-bottom.png')]
                bg-cover
                bg-no-repeat
                bg-
                rounded-[25px] md:rounded-[50px]
                "
            >   
                <div className="animation-effect py-[25px] px-[50px] hidden lg:flex flex-col absolute w-[540px] lg:h-[480px] xl:h-[500px] bg-[#F9E8E2] lg:bottom-[10px] xl:bottom-[30px] right-[30px]">
                        <TitleHeroBottom text={heroBottom.title}/>
                        <span className='text-[14px]'>{heroBottom.desc}</span>
                        <ol className="list-decimal list-inside my-[10px] space-y-2">
                            {heroBottom.list.map((item, idx) => (
                                <div key={idx} className='tetx-[14px] xl:text-[16px]'>
                                    <li className='font-semibold'>{item.title}</li>
                                    <span>{item.desc}</span>
                                </div>  
                            ))}
                        </ol>
                        <div>
                            <Link href={pathname === "/tutor" ? "/tutor-register" : "/tutor"}>
                                <OrangeButton text={heroBottom.button} />
                            </Link>
                        </div>
                </div>
                <div className="relative w-full h-full lg:hidden">
                    <div className="
                        absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                    ">  
                        <Link href={pathname === "/tutor" ? "/tutor-register" : "/tutor"}>
                            <OrangeButton text={heroBottom.button} />
                        </Link>
                    </div>
                    <div className="w-full h-full bg-[#00000060] rounded-[25px] md:rounded-[50px]"></div>
                </div>
            </div>
        </div>
    )
}