/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 14:21:25
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-13 23:29:45
 */

import { TitleText } from "@/components/atoms/title";
import Image from "next/image";
import Link from "next/link";

export default function HowTutor() {

    const steps = [
        {
            id: 1,
            image: "/assets/how/1.png",
            altImage: "one-pic",
            icon: "/assets/how/one.svg",
            altIcon: "one-num",
            title: "Maximize Your Earning Potential from Home",
            desc: "You’re in control. Set a competitive hourly rate that reflects your expertise, typically ranging from Rp. 100,000 to Rp. 400,000 or more."
        },
        {
            id: 2,
            image: "/assets/how/2.png",
            altImage: "two-pic",
            icon: "/assets/how/two.svg",
            altIcon: "two-num",
            title: "Build a Fulfilling Teaching Career on Your Terms",
            desc: "Design your ideal teaching week. Just set your availability and let students book your open slots—with no minimum hours required.",
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
                <span className="animation-effect text-[14px] sm:text-[16px] md:text-[18px] font-bold">Set Your Price for Success</span>
                <span className="animation-effect text-[14px] sm:text-[16px] md:text-[18px] font-bold">Your expertise is valuable. Here&#39;s how to price it competitively:</span>
                <ul className="animation-effect list-inside list-disc pl-2 text-[14px] sm:text-[16px] md:text-[18px]">
                    <li><strong>Boost Your Rates:</strong> Being a certified native speaker or having specialized knowledge (e.g., Business English, exam prep) allows you to command a higher price.</li>
                    <li><strong>Start Strong & Grow:</strong> Set a competitive starting price to attract your first students. As you collect positive reviews and teaching hours, you can confidently increase your rates.</li>
                    <li><strong>You&#39;re in Control:</strong> These are just guidelines. The final decision is always yours based on your unique value.</li>
                </ul>
                <span className="animation-effect text-[14px] sm:text-[16px] md:text-[18px] italic">Find more pricing strategies in our <Link href="#FAQ" className="text-[#E15C31] font-bold">FAQ</Link>.</span>
            </div>
        </div>
    )
}