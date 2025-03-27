/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 14:21:25
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-18 16:36:30
 */

import { TitleText } from "@/components/atoms/title";
import { Home } from "@/constants/en";
import Image from "next/image";

export default function How() {
    const { how } = Home;

    const steps = [
        {
          id: 1,
          image: "/assets/how/one.png",
          altImage: "one-pic",
          icon: "/assets/how/one.svg",
          altIcon: "one-num",
          headingBefore: how.oneHeadingBefore,
          headingHighlight: how.oneHeadingHighlight,
          headingAfter: how.oneHeadingAfter,
          description: how.oneDesc
        },
        {
          id: 2,
          image: "/assets/how/two.png",
          altImage: "two-pic",
          icon: "/assets/how/two.svg",
          altIcon: "two-num",
          headingBefore: how.twoHeadingBefore,
          headingHighlight: how.twoHeadingHighlight,
          headingAfter: how.twoHeadingAfter,
          description: how.twoDesc,
        },
        {
          id: 3,
          image: "/assets/how/three.png",
          altImage: "three-pic",
          icon: "/assets/how/three.svg",
          altIcon: "three-num",
          headingBefore: how.threeHeadingBefore,
          headingHighlight: how.threeHeadingHighlight,
          headingAfter: how.threeHeadingAfter,
          descriptionBefore: how.threeDescBefore,
          descriptionHighlight: how.threeDescHighlight,
          descriptionAfter: how.threeDescAfter,
        },
      ];
      
    return (
        <div className="lingo-container py-[50px] flex flex-col justify-center">
            <TitleText text={how.title} marginBottom='mb-[50px]' marginX='mx-auto'/>
            <div className="flex flex-col gap-[36px]">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="flex flex-col md:flex-row xl:mx-[130px] animation-effect items-center gap-[30px] md:gap-0"
                    >
                        <div className="sm:w-1/2 flex justify-center animation-effect">
                            <Image
                                src={step.image}
                                alt={step.altImage}
                                width={421}
                                height={421}
                                className="md:w-[300px] lg:w-[421px] h-auto animation-effect"
                                priority
                            />
                        </div>
                        <div className="flex flex-row items-center gap-[20px] w-full md:w-1/2 animation-effect">
                            <Image 
                                src={step.icon} 
                                alt={step.altIcon} 
                                width={50}
                                height={50}
                                className="w-[50px]" 
                                priority
                            />
                            <div className="flex flex-col gap-[10px] xl:gap-[20px] animation-effect">
                                <span className="lg:text-[20px] xl:text-[24px] font-medium animation-effect">
                                    {step.headingBefore}
                                    {step.headingHighlight && (
                                        <span className="text-[#E35D33]">{step.headingHighlight}</span>
                                    )}
                                    {step.headingAfter}
                                </span>
                                {step.descriptionBefore ? (
                                    <span className="lg:text-[16px] xl:text-[20px] font-light animation-effect">
                                        {step.descriptionBefore}
                                        <span className="font-bold text-[#E35D33]">
                                        {step.descriptionHighlight}
                                        </span>
                                        {step.descriptionAfter}
                                    </span>
                                ) : (
                                <span className="md:text-[14px] lg:text-[16px] xl:text-[20px] font-light animation-effect">
                                    {step.description}
                                </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}