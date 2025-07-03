/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-07-03 16:01:17
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import Image from "next/image";
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";

export default function Recommended() {
    const { user, loading } = useAuth();
    console.log("cv", user?.tutor?.cvFileObjectKey)
    console.log("certificates",user?.tutor?.certificatesJson)

    const recommendedData = useMemo(() => {
        const baseData = [
            {
                img: '/assets/enable-grey.svg', 
                title: 'Enable money withdrawals', 
                desc: 'Use a copy of your passport or official ID to confirm your identity. Once verified, you can withdraw your funds safely.',
                buttonText: 'Add bank account',
                href: '/tutor-dashboard/tutor-profile'
            },
            // {
            //     img: '/assets/complete-grey.svg', 
            //     title: 'Complete the Welcome to Lingo course', 
            //     desc: "Learn how to enhance your profile, get students and more! Tutors who complete this course earn three times as much as those who don't.",
            //     buttonText: 'Complete course',
            //     href: '/tutor-dashboard/tutor-profile'
            // },
            // {
            //     img: '/assets/play-grey.svg', 
            //     title: 'Awesome trial lessons', 
            //     desc: 'Learn how to teach lessons that inspire your students to come back for more!',
            //     buttonText: 'Learn more',
            //     href: '/tutor-dashboard/tutor-profile'
            // }
        ];

        const cvCertData = loading ? [] : 
            user?.tutor?.cvFileObjectKey && user?.tutor?.certificatesJson === "" ? [
                {
                    img: '/assets/play-grey.svg', 
                    title: 'Add your certificate', 
                    desc: "Earn up to 70% more and stand out by completing the free Preply language teaching course - whether you're new to teaching or experienced.",
                    buttonText: 'Add certificate',
                    href: '/tutor-dashboard/tutor-profile'
                }
            ] : user?.tutor?.cvFileObjectKey === "" && user?.tutor?.certificatesJson ? [
                {
                    img: '/assets/play-grey.svg', 
                    title: 'Add your CV', 
                    desc: "Earn up to 70% more and stand out by completing the free Preply language teaching course - whether you're new to teaching or experienced.",
                    buttonText: 'Add CV',
                    href: '/tutor-dashboard/tutor-profile'
                }
            ] : user?.tutor?.cvFileObjectKey === "" && user?.tutor?.certificatesJson === "" ? [
                {
                    img: '/assets/play-grey.svg', 
                    title: 'Add your CV and certificate', 
                    desc: "Earn up to 70% more and stand out by completing the free Preply language teaching course - whether you're new to teaching or experienced.",
                    buttonText: 'Add CV and certificate',
                    href: '/tutor-dashboard/tutor-profile'
                }
            ] : [];

        return [
            ...baseData,
            ...cvCertData
        ];
    }, [loading, user?.tutor?.cvFileObjectKey, user?.tutor?.certificatesJson]);

    const [closedCards, setClosedCards] = useState([])

    useEffect(() => {
        setClosedCards(Array(recommendedData.length).fill(false))
    }, [recommendedData])

    const handleClose = (index) => {
        setClosedCards((prev) => {
            const updated = [...prev]
            updated[index] = true
            return updated
        })
    }
    return (
        <div className="flex flex-col mt-[48px]">
            <TitleStudentDashboard text="Recommended" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px] mt-[24px]">
                {recommendedData.map((item, index) => (
                    !closedCards[index] && (
                        
                        <React.Fragment key={index}>
                            {index === 1 && <div className="col-span-full h-[12px]" />}
                            <div
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
                                    <Link href={item.href}>
                                        <button className="cursor-pointer mt-auto w-full py-[12px] border-[2px] border-black rounded-[8px]">
                                            {item.buttonText}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                ))}
            </div>
        </div>
    )
}