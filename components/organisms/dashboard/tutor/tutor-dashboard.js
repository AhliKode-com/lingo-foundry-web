/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 09:24:39
 */
"use client"
import { TitleStudentDashboard } from "@/components/atoms/title";
import { LastDaysButton } from "@/components/atoms/buttons";
import {useAuth} from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import KeyToSuccess from "@/components/organisms/dashboard/tutor/key-to-success";
import NewSubscriptions from "@/components/organisms/dashboard/tutor/new-subscriptions";

export default function TutorDashboard(){
    const { user } = useAuth();

    // recommended data
    const recommendedData = [
        {img: '/assets/enable-grey.svg', title: 'Enable money withdrawals', desc: 'Use a copy of your passport or official ID to confirm your identity. Once verified, you can withdraw your funds safely.'},
        {img: '/assets/complete-grey.svg', title: 'Complete the Welcome to Lingo course', desc: "Learn how to enhance your profile, get students and more! Tutors who complete this course earn three times as much as those who don't."},
        {img: '/assets/play-grey.svg', title: 'Add your CV and certificate', desc: 'Earn up to 70% more and stand out by completing the free Preply language teaching course - whether you’re new to teaching or experienced.'},
        {img: '/assets/play-grey.svg', title: 'Awesome trial lessons', desc: 'Learn how to teach lessons that inspire your students to come back for more!'},
    ]

    // overview data
    const overviewData = [
        {img: '/assets/tutor-dashboard/1.svg', num: '19', desc: 'Active Lessons'},
        {img: '/assets/tutor-dashboard/2.svg', num: '241', desc: 'Active Lessons'},
        {img: '/assets/tutor-dashboard/3.svg', num: '951', desc: 'Completed Lessons'},
        {img: '/assets/tutor-dashboard/4.svg', num: '121', desc: 'New Students'},
        {img: '/assets/tutor-dashboard/5.svg', num: '3', desc: 'New Followers'},
        {img: '/assets/tutor-dashboard/6.svg', num: '56489', desc: 'Lessons Sold'}
    ]

    // close card
    const [closedCards, setClosedCards] = useState([])
    useEffect(() => {
        setClosedCards(Array(recommendedData.length).fill(false))
    }, [])

    const handleClose = (index) => {
        setClosedCards((prev) => {
            const updated = [...prev]
            updated[index] = true
            return updated
        })
    }

    return(
        <div className="lingo-container flex flex-col mb-[72px]">
            {/* Greetings */}
            <div className="flex flex-col">
                <TitleStudentDashboard text={`Good afternoon, ${user?.firstName} ${user?.lastName}`} />
                <span className="text-[#4D4C5C]">It’s great having you here 🎉</span>
                <div className="bg-[#F4F4F8] flex justify-between items-center p-[24px] md:pb-[40px] mt-[48px] rounded-[8px]">
                    <div className="flex flex-col">
                        <TitleStudentDashboard text="We're glad your're here!" />
                        <span className="text-[#4D4C5C]">Get set for success on Lingo Foundry with some basic tips.</span>
                        <Link href={'/tutor-dashboard'} passHref>
                            <button
                                className="rounded-[8px] mt-[16px] bg-[#E35D33] cursor-pointer flex h-[38px] md:h-[48px] justify-center items-center text-white p-4 font-medium text-[14px] md:text-[16px] animation-effect whitespace-nowrap"
                            >
                                View your calendar
                            </button>
                        </Link>
                    </div>
                    <Image
                        src="/assets/in-love.svg"
                        alt="in-love"
                        width={140}
                        height={140}
                        className="w-[140px] h-[140px] animation-effect md:block hidden"
                    />
                </div>
            </div>

            {/* Recommended */}
            <div className="flex flex-col mt-[48px]">
                <TitleStudentDashboard text="Recommended" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px] mt-[24px]">
                    {recommendedData.map((item, index) => (
                        !closedCards[index] && (
                            <div
                                key={index}
                                className="min-h-[250px] md:min-h-[300px] lg:min-h-[350px] p-[17px] border-[1px] border-[#DCDCE5] rounded-[4px]"
                            >
                                <div className="flex flex-col justify-between h-full">
                                    <div className="flex flex-col gap-[8px]">
                                        <div className="flex justify-between items-start">
                                            <Image
                                                src={item.img}
                                                width={48}
                                                height={48}
                                                alt="icon"
                                            />
                                            {index === 0 ? 
                                                <></>
                                            :
                                                <button onClick={() => handleClose(index)}>
                                                    <Image
                                                        src="/assets/cross.svg"
                                                        width={13}
                                                        height={13}
                                                        alt="close"
                                                        className="cursor-pointer"
                                                    />
                                                </button>
                                            }
                                        </div>
                                        <div className="font-semibold">{item.title}</div>
                                        <div className="text-[14px]">{item.desc}</div>
                                    </div>
                                    <button className="mt-auto w-full py-[12px] border-[2px] border-black rounded-[8px]">
                                        Get Verified now
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* overview */}
            <div className="flex lg:flex-row flex-col px-[32px] py-[44px] bg-[#FDE0D7] mt-[56px] justify-between gap-[24px] lg:gap-0">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <TitleStudentDashboard text="Overview" />
                        <span className="text-[#4D4C5C]">Your business at a glance.</span>
                    </div>
                    <LastDaysButton custom="mt-auto"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px]">
                    {overviewData.map((item, index) => (
                        <div key={index} className="p-[24px] flex items-center gap-[24px] bg-white">
                            <Image
                                src={item.img}
                                height={60}
                                width={60}
                                className=""
                                alt="logo"
                            />
                            <div className="flex flex-col gap-[12px]">
                                <span className="text-[24px]">{Number(item.num).toLocaleString()}</span>
                                <span className="text-[#4E5566] text-[14px]">{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* key to success */}
            <KeyToSuccess/>

            {/* new subs */}
            <NewSubscriptions/>
        </div>
    )
}