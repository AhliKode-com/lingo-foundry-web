/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 14:21:25
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-27 23:31:07
 */

import { TitleText } from "@/components/atoms/title";
import Image from "next/image";

export default function HowTutor() {

    const steps = [
        {
            id: 1,
            image: "/assets/how/1.png",
            altImage: "one-pic",
            icon: "/assets/how/one.svg",
            altIcon: "one-num",
            title: "Set your prices. Earn from Home Rp. 100.000 per hour or More",
            desc: "You can choose your hourly rate, from Rp. 100,000 to Rp. 400,000 or more based on your expertise and experiences. Courses are divided into 30 minutes trial lessons and 60 minutes standard lessons."
        },
        {
            id: 2,
            image: "/assets/how/2.png",
            altImage: "two-pic",
            icon: "/assets/how/two.svg",
            altIcon: "two-num",
            title: "Be your own boss. Grow professionaly",
            desc: "Design your ideal teaching week. Simply input your availability, and students can select their preferred class times. No set minimum commitment.",
            notes: "Top 10 tutors’ teaching hours: 16 - 81 hours / week"
        },
        {
            id: 3,
            image: "/assets/how/3.png",
            altImage: "three-pic",
            icon: "/assets/how/three.svg",
            altIcon: "three-num",
            title: 'Your search for an "online tutoring job" ends here',
            desc: "Turn your expertise into income from anywhere: Teach on Lingo Foundry, all you need is a reliable internet connection and a computer with a microphone and webcam."
        }
    ];
      
    return (
        <div className="lingo-container py-[50px] flex flex-col justify-center relative">
            <div className='animation-effect bg-gradient-to-b blur-lg from-pink-100 rounded-full to-white h-[550px] w-[150px] sm:w-[250px] lg:w-[550px] absolute left-[50px] md:left-[250px] top-[200px]'></div>
            <div className='animation-effect bg-gradient-to-b blur-lg from-purple-50 rounded-full to-white h-[550px] w-[150px] sm:w-[250px] lg:w-[450px] absolute left-[100px] md:left-[300px] lg:left-[450px] bottom-[0px]'></div>
            <TitleText text="Join Lingo Foundry Community!" marginBottom='mb-[15px]' marginX='mx-auto'/>
            <span className="text-[16px] md:text-[24px] mb-[30px] text-[#707070] sm:text-center">Earn greater income with more freedom</span>
            <div className="flex flex-col gap-[50px] sm:gap-[110px] z-20">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`flex flex-col md:flex-row ${
                        step.id === 2 ? "md:flex-row-reverse" : ""
                        } xl:mx-[130px] animation-effect items-center gap-[20px] sm:gap-[48px]`}
                    >
                        <div className="sm:w-1/2 flex justify-center animation-effect">
                            <Image
                                src={step.image}
                                alt={step.altImage}
                                width={464}
                                height={308}
                                className="md:w-[300px] lg:w-[464px] h-auto animation-effect"
                                priority
                            />
                        </div>
                        <div className="flex flex-col gap-[26px] w-full md:w-1/2 animation-effect">
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
                                {step.title}
                                </span>
                                <span className="lg:text-[16px] xl:text-[20px] font-light animation-effect">
                                {step.desc}
                                </span>
                                {/* Render notes if they exist */}
                                {step.notes && (
                                <span className="text-orange-500 lg:text-[16px] xl:text-[18px] animation-effect">
                                    {step.notes}
                                </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="animation-effect mt-[45px] flex flex-col z-10 gap-[5px] md:gap-[10px]">
                <span className="animation-effect text-[14px] sm:text-[16px] md:text-[18px] font-bold">Note:</span>
                <ul className="animation-effect list-inside list-disc pl-2 text-[14px] sm:text-[16px] md:text-[18px]">
                    <li>Native speakers with teaching certifications command higher rates.</li>
                    <li>Years of experience and specialized knowledge (e.g., business Mandarin) also increase prices</li>
                    <li>Individual lessons are more expensive than group lessons.</li>
                    <li>Specialized courses (e.g., exam preparation) may have premium pricing</li>
                    <li>Tutors can use this as reference, but can also set their own price based on personal experiences to attract students.</li>
                    <li>As tutors accumulate teaching hours and receive positive reviews, tutors could also consider increasing the pricing for the class.</li>
                </ul>
                <span className="animation-effect text-[14px] sm:text-[16px] md:text-[18px]">See our <a href="#FAQ" className="text-[#E15C31] font-bold">FAQ’s</a> for more information.</span>
            </div>
        </div>
    )
}