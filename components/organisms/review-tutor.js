/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 14:21:25
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-31 10:22:25
 */

import { TitleText } from "@/components/atoms/title";

export default function ReviewTutor() {

    const tutors = [
        {
            id: 1,
            title: 'SHARE YOUR PASSION!',
            desc: 'By signing up with Lingo Foundry, you are joining a community where more than 7 million teachers, coaches, trainers, and artists from around the world are registered. Teachers are the foundation of our community. By sharing their passion every day, they offer more than just lessons—they provide every student with the opportunity to grow and challenge themselves to improve.',
            name: 'Veronica Gleason',
            position: 'Dynamic Functionality Designer',
            testimony: "When I started, I was a recent graduate just looking for something I could do to earn money that I could fit around my family. Now, I'm at the start of beginning my CELTA certificate with a view to becoming an IELTS examiner. Lingo Foundry has helped me uncover a love for English language teaching and opened up so many possibilities for me. I have so much more awareness of the world now!",
            stars: 5
        },
        {
            id: 2,
            title: 'SHARE YOUR PASSION!',
            desc: 'By signing up with Lingo Foundry, you are joining a community where more than 7 million teachers, coaches, trainers, and artists from around the world are registered. Teachers are the foundation of our community. By sharing their passion every day, they offer more than just lessons—they provide every student with the opportunity to grow and challenge themselves to improve.',
            name: 'Veronica Bleason',
            position: 'Dynamic Functionality Designer',
            testimony: "When I started, I was a recent graduate just looking for something I could do to earn money that I could fit around my family. Now, I'm at the start of beginning my CELTA certificate with a view to becoming an IELTS examiner. Lingo Foundry has helped me uncover a love for English language teaching and opened up so many possibilities for me. I have so much more awareness of the world now!",
            stars: 3
        }
    ];
      
    return (
        <div className="lingo-container sm:py-[50px] flex flex-col justify-center pt-[75px] sm:pt-[100px] md:pt-[150px]">
            <TitleText text="Lingo Foundry Tutor Testimonials" marginBottom='mb-[15px]' marginX='mx-auto'/>
            <span className="text-[16px] md:text-[24px] mb-[30px] text-[#707070] sm:text-center">Explore the possibilities of teaching</span>
            <div className="flex flex-col mt-[62px] gap-[65px]">
                {tutors.map((tutor) => (
                    <div key={tutor.id} className="flex flex-col md:flex-row">

                        <div className="relative md:w-1/2 lg:w-1/3 bg-[#E35D33] p-[35px] lg:pl-[72px] lg:pr-[47px] lg:pt-[60px] lg:pb-[55px] flex flex-col z-20">
                            <img
                                src="./assets/quote-white.svg"
                                alt="quote"
                                className="w-[128px] h-[128px] md:w-[178px] md:h-[178px] absolute bottom-[130px] left-[130px] opacity-20"
                            />
                            <div className="flex items-center gap-[7px]">
                                <img
                                    src="./assets/thumb.svg"
                                    alt="thumb"
                                    className="w-[18px] h-[18px] md:w-[28px] md:h-[28px]"
                                />
                                <span className="text-[14px] md:text-[18px] text-white font-bold">Testimonial</span>
                            </div>
                            <span className="text-[20px] md:text-[28px] text-[#FFFFFF] mb-[30px]">
                                {tutor.title}
                            </span>
                            <span className="text-[14px] md:text-[16px] text-[#FFFFFF] mb-[20px] md:mb-[40px] lg:mb-[70px]">
                                {tutor.desc}
                            </span>
                            <span className="text-[45px] md:text-[64px] text-[#FFFFFF] font-extrabold lg:whitespace-nowrap leading-[50px] md:leading-[70px]">
                                {tutor.name}
                            </span>
                            <span className="text-[14px] text-[#FFFFFF]">
                                {tutor.position}
                            </span>
                        </div>

                        <div className="hidden lg:block w-1/3 relative">
                            <img
                                src="./assets/tutor.png"
                                alt="tutor"
                                className="h-full object-cover absolute left-[-40px]"
                            />
                        </div>

                        <div className="relative md:w-1/2 lg:w-1/3 p-[35px] lg:pl-[64px] lg:pr-[55px] lg:pt-[112px] lg:pb-[36px] flex flex-col">
                            <img
                                src="./assets/quote-purple.svg"
                                alt="quote"
                                className="w-[128px] h-[128px] md:w-[178px] md:h-[178px] absolute top-[35px] right-[30px] opacity-20"
                            />
                            <span className="text-[16px] lg:text-[20px] mb-[30px] text-center">
                                {tutor.testimony}
                            </span>
                            <div className="flex mb-[60px] mx-auto">
                                {Array.from({ length: tutor.stars }).map((_, idx) => (
                                <img
                                    key={idx}
                                    src="./assets/star-tutor.svg"
                                    alt="star"
                                    className="w-[35px] h-[35px]"
                                />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}