/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 14:21:25
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-06 16:41:32
 */

import { TitleText } from "@/components/atoms/title";
import Image from "next/image";
import { TutorButton } from "@/components/atoms/buttons";
import Link from "next/link";

export default function BecomeTutor() {

    const steps = [
        {
            id: 1,
            icon: "/assets/become-1.svg",
            altIcon: "one-pic",
            title: "1. Sign up for an account",
            desc: 'Click the "Get Started" button and sign up for a Lingo Foundry account.'
        },
        {
            id: 2,
            icon: "/assets/become-2.svg",
            altIcon: "two-pic",
            title: "2. Application Form",
            desc: 'Complete a short application form that takes about 5 to 8 minutes!'
        },
        {
            id: 3,
            icon: "/assets/become-3.svg",
            altIcon: "three-pic",
            title: "3. Review & Approval",
            desc: 'Our team will review and approved tutors will be notified via email!'
        },
        {
            id: 4,
            icon: "/assets/become-4.svg",
            altIcon: "four-pic",
            title: "4. Start teaching & earning",
            desc: 'Once your ad is published, students will be able to contact you.'
        },
    ];
      
    return (
        <div className="lingo-container py-[50px] flex flex-col justify-center relative pt-[75px] sm:pt-[100px] md:pt-[150px]">
            <TitleText text="How I'll become tutor on Lingo Foundry?" marginX='mx-auto'/>
            <div className='my-[20px] md:my-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] animation-effect'>
                {steps.map((item, index) => (
                    <div key={index} className="animation-effect">
                        <div className="w-full p-[24px] border-[1px] border-[#E3E3E3] bg-white drop-shadow-md flex flex-col gap-[24px] justify-center items-center">
                            <Image src={item.icon} alt={item.altIcon} width={80} height={80} className="w-[80px] h-[80px]"/>
                            <div className="gap-[12px] flex flex-col justify-center items-center">
                                <span className="text-[18px] font-medium">{item.title}</span>
                                <span className="text-center text-[13px] text-[#6E7485]">{item.desc}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link className="justify-center items-center flex" href="/tutor-detail">
                <TutorButton text="Apply Now" custom="mx-auto w-full md:w-3/10"/>
            </Link>
        </div>
    )
}