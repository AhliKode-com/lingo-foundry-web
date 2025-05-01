/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 14:21:25
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-01 23:33:11
 */
"use client"
import { TitleText } from "@/components/atoms/title";
import { getReviews } from '@/apis/getUserReview';

export default function ReviewTutor({authorType}) {
    const { data: reviews, loading } = getReviews(authorType);
    const displayedReviews = reviews?.content?.slice(0,2) || [];
    
    return (
        <div className="lingo-container sm:py-[50px] flex flex-col justify-center pt-[75px] sm:pt-[100px] md:pt-[150px]">
            <TitleText text="Lingo Foundry Tutor Testimonials" marginBottom='mb-[15px]' marginX='mx-auto'/>
            <span className="text-[16px] md:text-[24px] mb-[30px] text-[#707070] sm:text-center">Explore the possibilities of teaching</span>
                {displayedReviews?.length > 0 ? (
                    <div className="flex flex-col mt-[62px] gap-[65px]">
                        {loading ? (
                            <>
                                <div className="animate-pulse bg-gray-300 p-5 h-[400px] w-full" />
                                <div className="animate-pulse bg-gray-300 p-5 h-[400px] w-full" />
                            </>
                        ) : (
                            displayedReviews.map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row">
    
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
                                            SHARE YOUR PASSION!
                                        </span>
                                        <span className="text-[14px] md:text-[16px] text-[#FFFFFF] mb-[20px] md:mb-[40px] lg:mb-[70px]">
                                            By signing up with Lingo Foundry, you are joining a community where more than 7 million teachers, coaches, trainers, and artists from around the world are registered. Teachers are the foundation of our community. By sharing their passion every day, they offer more than just lessons—they provide every student with the opportunity to grow and challenge themselves to improve.
                                        </span>
                                        <span className="text-[45px] md:text-[64px] text-[#FFFFFF] font-extrabold lg:whitespace-nowrap leading-[50px] md:leading-[70px]">
                                            {item.tutorName}
                                        </span>
                                        <span className="text-[14px] text-[#FFFFFF]">
                                            {item.subjectName} {item.subjectLevel}
                                        </span>
                                    </div>
    
                                    <div className="hidden lg:block w-1/3 relative">
                                        <img
                                            src={item.photoUrl || "/placeholder.svg"}
                                            alt={item.tutorName}
                                            className="h-full object-cover absolute left-[-40px]"
                                        />
                                    </div>
    
                                    <div className="relative md:w-1/2 lg:w-1/3 p-[35px] lg:pl-[64px] lg:pr-[55px] lg:pt-[112px] lg:pb-[36px] flex flex-col justify-center">
                                        <img
                                            src="./assets/quote-purple.svg"
                                            alt="quote"
                                            className="w-[128px] h-[128px] md:w-[178px] md:h-[178px] absolute top-[35px] right-[30px] opacity-20"
                                        />
                                        <span className="text-[16px] lg:text-[20px] mb-[30px] text-center">
                                            {item.description}
                                        </span>
                                        <div className="flex mb-[60px] mx-auto">
                                            {Array.from({ length: item.rating }).map((_, idx) => (
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
                            ))
                        )}
                    </div>
                ) : (
                    <div>
                        <div className='text-center w-full'>No Reviews Yet.</div>
                    </div>
                )}
        </div>
    )
}