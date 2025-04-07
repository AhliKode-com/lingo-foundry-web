/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 13:17:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-08 00:43:18
 */

"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { RatingSummary } from "@/components/atoms/rating-summary";
import { ResumeTabs } from "@/components/atoms/resume-tab";
import { Speciality } from "@/components/atoms/accordion";
import { TutorCarousel } from '@/components/atoms/carousel';
import { getDetail } from "@/api/getTutorDetail";

export default function TutorDetail() {
    const { slug } = useParams();
    const {data, loading} = getDetail(slug);
    console.log(data)
    const [saved, setSaved] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };

    const dataReview = [
        {name: 'Rose', date: 'March 21,2025', rating: 5, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Dante', date: 'March 22,2025', rating: 4, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Kelvin', date: 'March 23,2025', rating: 3, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Advis', date: 'March 24,2025', rating: 2, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Hafiz', date: 'March 25,2025', rating: 1, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Mario', date: 'March 26,2025', rating: 5, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Jess', date: 'March 27,2025', rating: 5, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
        {name: 'Amanda', date: 'March 28,2025', rating: 5, review: 'Learning Bahasa with Andika is honestly the best! He makes every lesson fun and super engaging, so it never feels like actual studying'},
    ]

    const specialityData = [
        {title: 'title 1', desc: 'This is Desc 1'},
        {title: 'title 2', desc: 'This is Desc 2'},
        {title: 'title 3', desc: 'This is Desc 3'},
        {title: 'title 4', desc: 'This is Desc 4'},
    ]

    const likeData = [
        {id: 1,img: "/assets/man-1.png",name: "Aqil Zulkarnain",flag: "🇮🇩",rating: 4.9,reviews: 85,description: "Improve your Indonesian, communicate better,",price: 170000},
        {id: 2,img: "/assets/man-1.png",name: "Muhammad Naufal Pratama",flag: "🇮🇩",rating: 5,reviews: 38,description: "Native Indonesian Tutor and Skilled Conversationalist with",price: 120000},
        {id: 3,img: "/assets/man-1.png",name: "Putri Maharani",flag: "🇮🇩",rating: 5,reviews: 61,description: "MoE practitioner is here to boost your Indonesian",price: 200000},
        {id: 4,img: "/assets/man-1.png",name: "Rio Aditya",flag: "🇮🇩",rating: 5,reviews: 56,description: "Friendly and Certified Bahasa Indonesia Teacher with over 10",price: 140000},
        {id: 5,img: "/assets/man-1.png",name: "Dian Sastrowardoyo",flag: "🇮🇩",rating: 4.8,reviews: 42,description: "Experienced Indonesian language instructor for all levels",price: 150000},
        {id: 6,img: "/assets/man-1.png",name: "Budi Wibowo",flag: "🇮🇩",rating: 4.7,reviews: 29,description: "Professional translator and language coach for beginners",price: 100000}
    ]

    return (
        <div className="lingo-container flex flex-col lg:flex-row pt-[80px] sm:pt-[103.61px]">
            {/* Left scrollable section */}
            <div className="p-4 md:p-8">
                <div className="md:max-w-3xl">
                    {/* Profile header */}
                    <div className="block">
                        <div className="flex md:flex-row flex-col items-center gap-6 mb-6">
                            <div className="relative h-[166px] w-[166px] flex-shrink-0 md:mb-auto mr-auto md:mr-0">
                                <img
                                    src="/assets/man-1.png"
                                    alt="img"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-[28px] font-medium">Kevin Gilbert P.</span>
                                    <img
                                        src="/assets/tag.svg"
                                        alt="tag"
                                        className="h-[16px] w-[16px] object-cover"
                                    />
                                    <img
                                        src="/assets/indo-flag.svg"
                                        alt="tag"
                                        className="h-[12.5px] w-[16px] object-cover"
                                    />
                                </div>
                                <span className="text-[#121117] my-[10px]">Certified Indonesian teacher and examiner with an M.A. in Applied Linguistics and over 11 years of teaching experience</span>
                                <div className="flex flex-col gap-[15px]">
                                    <div className="flex gap-[10px]">
                                        <img src="/assets/doc.svg" alt="verified" className="w-[16px] h-[16px] mt-[5px]"/>
                                        <div className="flex flex-col gap-[5px]">
                                            <span className="font-semibold text-[#0450B4]">Professional Tutor</span>
                                            <span>Andika Eko P. is a highly qualified tutor with a verified teaching certificate</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-[10px]">
                                        <img src="/assets/badge.svg" alt="verified" className="w-[16px] h-[16px] mt-[5px]"/>
                                        <div className="flex flex-col gap-[5px]">
                                            <span className="font-semibold text-[#E35D33]">Super Tutor</span>
                                            <span>Andika Eko P. is a highly rated and experienced tutor.</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-[10px]">
                                        <img src="/assets/badge-check.svg" alt="verified" className="w-[16px] h-[16px] mt-[5px]"/>
                                        <div className="flex flex-col gap-[5px]">
                                            <span className="font-semibold">Trials are 100% refundable</span>
                                            <span>Try another tutor for free or get a refund</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-[10px]">
                                        <img src="/assets/teaches.svg" alt="verified" className="w-[16px] h-[16px] mt-[5px]"/>
                                        <div className="flex flex-col gap-[5px]">
                                            <span className="font-semibold">Teaches</span>
                                            <span>Indonesian lessons</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* About me section */}
                    <div className="mb-[48px] flex flex-col">
                        <span className="text-[23px] font-medium mb-[20px]">About me</span>
                        <div className="flex flex-col gap-[20px]">
                            {expanded ? (
                                <>
                                    <span>6,000+ hours of successful lessons on this platform.</span>
                                    <span>Hi! I’m Andika, a professional and certified Indonesian teacher specializing in teaching Indonesian to foreigners since 2014. I hold a Master of Arts in Applied Linguistics from the University of Melbourne, Australia, and have been an Indonesian examiner for the Ministry of Defence since 2021.</span>
                                    <div className="flex flex-col">
                                        <span>I specialize in:</span>
                                        <span>✅ General speaking classes for everyday use</span>
                                        <span>✅ Grammar lessons for all levels</span>
                                        <span>✅ Customized lessons tailored to your needs</span>
                                        <span>✅ Indonesian exam preparation</span>
                                    </div>
                                    <span>I believe language learning should be engaging, interactive, and tailored to your pace. Most of my students make significant progress within months.</span>
                                    <span>In our trial lesson, we’ll discuss your goals, explore the course structure, and begin your journey to mastering Indonesian. Let’s make learning enjoyable and effective—I’m confident you’ll love both the process and the results!</span>
                                </>
                            ) : (
                                <>
                                    <span>6,000+ hours of successful lessons on this platform.</span>
                                    <span className="line-clamp-2">Hi! I’m Andika, a professional and certified Indonesian teacher specializing in teaching Indonesian to foreigners since 2014. I hold a Master of Arts in Applied Linguistics from the University of Melbourne, Australia, and have been an Indonesian examiner for the Ministry of Defence since 2021.</span>
                                </>
                            )}
                            <button onClick={toggleExpanded} className="self-start underline">
                                {expanded ? "Hide" : "See more"}
                            </button>
                        </div>
                    </div>

                    {/* speak */}
                    <div className="flex flex-col mb-[48px]">
                        <span className="text-[23px] font-medium mb-[20px]">I speak</span>
                        <div className="flex flex-wrap gap-[24px]">
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[14px]">Javanese</span>
                                <div className="px-[8px] py-[1.5px] bg-[#D8F8F2]">Native</div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[14px]">Indonesian</span>
                                <div className="px-[8px] py-[1.5px] bg-[#D8F8F2]">Native</div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[14px]">English</span>
                                <div className="px-[8px] py-[1.5px] bg-[#CCE2FF]">Advanced C1</div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[14px]">Malay</span>
                                <div className="px-[8px] py-[1.5px] bg-[#CCE2FF]">Intermediate B1</div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[14px]">Chinese</span>
                                <div className="px-[8px] py-[1.5px] bg-[#D8F8F2]">Professional</div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[14px]">Russian</span>
                                <div className="px-[8px] py-[1.5px] bg-[#D8F8F2]">Beginner</div>
                            </div>
                        </div>
                    </div>

                    {/* say */}
                    <div className="flex flex-col mb-[48px]">
                        <div className="flex items-center mb-[20px] gap-[6px]">
                            <span className="text-[23px] font-medium">What my students say</span>
                            <img src="/assets/warning.svg" alt="warning" className="w-[20px] h-[20px] mt-[5px]"/>
                        </div>
                        <RatingSummary
                            dataReview={dataReview}
                            averageRating={3.5}
                            totalReviews={100}
                            ratingCounts={{
                            5: 50,
                            4: 0,
                            3: 30,
                            2: 20,
                            1: 0,
                            }}
                        />
                    </div>

                    {/* resume */}
                    <div className="flex flex-col mb-[80px]">
                        <span className="text-[23px] font-medium mb-[20px]">Resume</span>
                        <ResumeTabs/>
                    </div>

                    {/* speciality */}
                    <div className="flex flex-col mb-[48px]">
                        <span className="text-[23px] font-medium mb-[20px]">My specialties</span>
                            {specialityData.map((item, index) => (
                                <Speciality
                                    key={index}
                                    title={item.title}
                                    desc={item.desc}
                                    defaultOpen={index === 0}
                                />
                            ))}
                    </div>

                    {/* like */}
                    <div className="flex flex-col mb-[48px] overflow-hidden">
                        <TutorCarousel tutors={likeData}/>
                    </div>

                </div>
            </div>

            {/* Right fixed section */}
            <div className="md:w-80 lg:w-96">
                <div className="md:sticky md:top-[115px] p-4">
                    <div className="p-6 shadow-md rounded-[8px]">
                        <div className="flex flex-col">
                            <img
                                src="/assets/man-1.png"
                                alt="Tutor"
                                className="w-full h-40 object-fill rounded-md"
                            />
                            <div className="flex gap-[24px] my-[24px]">
                                <div className="flex flex-col">
                                    <div className="flex gap-[4px] items-center">
                                        <img src="/assets/star-review.svg" alt="star" className="w-[16px] h-[16px]"/>
                                        <span className="font-medium">4.9</span>
                                    </div>
                                    <span className="text-[14px] text-[#4D4C5C]">89 reviews</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">6283</span>
                                    <span className="text-[14px] text-[#4D4C5C]">lessons</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">US$17</span>
                                    <span className="text-[14px] text-[#4D4C5C]">per hour</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <button className="gap-[14px] rounded-[8px] text-[18px] font-semibold text-white justify-center items-center flex py-[10px] w-full bg-[#E35D33]">
                                    <img src="/assets/lightning.svg" alt="lightning" className="w-[20px] h-[20px]"/>
                                    Book trial lesson
                                </button>
                                <button className="gap-[14px] rounded-[8px] text-[18px] font-semibold justify-center items-center flex py-[10px] w-full border-[2px] border-[#DCDCE5]">
                                    <img src="/assets/chat.svg" alt="chat" className="w-[20px] h-[20px]"/>
                                    Send message
                                </button>
                                <button className="gap-[14px] rounded-[8px] text-[18px] font-semibold justify-center items-center flex py-[10px] w-full border-[2px] border-[#DCDCE5]">
                                    <img src="/assets/heart.svg" alt="heart" className="w-[20px] h-[20px]"/>
                                    Save to my list
                                </button>
                            </div>
                            <div className="mt-[27px] flex flex-col gap-[16px]">
                                <div className="flex gap-[10px]">
                                    <img src="/assets/stats.svg" alt="stats" className="mb-auto mt-[5px]"/>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Super popular</span>
                                        <span className="text-[14px]">7 new contacts and 10 lesson bookings in the last 48 hours</span>
                                    </div>
                                </div>
                                <div className="flex gap-[10px]">
                                    <img src="/assets/clock-black.svg" alt="clock" className="mb-auto mt-[5px]"/>
                                    <span className="text-[14px]">Usually responds in less than an hour</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
