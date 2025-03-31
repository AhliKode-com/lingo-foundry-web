/*
 * @Author: danteclericuzio
 * @Date: 2025-03-15 16:47:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-31 10:31:53
 */

import { OrangeButton } from "@/components/atoms/buttons";
import { TitleText } from "@/components/atoms/title";
import { Home } from "@/constants/en";

export default function HeroBottom() {
    const { heroBottom } = Home;
    return (
        <div className="lingo-container py-[50px] md:py-[115px]">
            <div className="block lg:hidden mb-[20px]">
                <TitleText text={heroBottom.title}/>
            </div>
            <div className="animation-effect text-[14px] sm:text-[16px] md:text-[18px] flex lg:hidden flex-col mb-[20px] ">
                <ol className="list-decimal list-inside">
                {heroBottom.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
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
                <div className="animation-effect p-[50px] hidden lg:flex flex-col absolute w-[540px] h-[400px] bg-[#F9E8E2] lg:bottom-[30px] xl:bottom-[100px] right-[30px]">
                        <TitleText text={heroBottom.title}/>
                        <ol className="list-decimal list-inside my-[20px]">
                            {heroBottom.list.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ol>
                        <div>
                            <OrangeButton text={heroBottom.button} />
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
                        <OrangeButton text={heroBottom.button} />
                    </div>
                    <div className="w-full h-full bg-[#00000060] rounded-[25px] md:rounded-[50px]"></div>
                </div>
            </div>
        </div>
    )
}