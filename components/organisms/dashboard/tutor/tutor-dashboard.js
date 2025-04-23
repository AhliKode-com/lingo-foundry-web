/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-23 16:33:20
 */
"use client"
import { TitleStudentDashboard } from "@/components/atoms/title";
import {useAuth} from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import Recommended from "@/components/organisms/dashboard/tutor/recommended";
import Overview from "@/components/organisms/dashboard/tutor/overview";
import KeyToSuccess from "@/components/organisms/dashboard/tutor/key-to-success";
import NewSubscriptions from "@/components/organisms/dashboard/tutor/new-subscriptions";
import Earnings from "@/components/organisms/dashboard/tutor/earnings";
import Journey from "@/components/organisms/dashboard/tutor/journey";

export default function TutorDashboard(){
    const { user } = useAuth();

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
                        src="/assets/tutor-dashboard/in-love.svg"
                        alt="in-love"
                        width={140}
                        height={140}
                        className="w-[140px] h-[140px] animation-effect md:block hidden"
                    />
                </div>
            </div>

            {/* Recommended */}
            <Recommended/>

            {/* overview */}
            <Overview/>

            {/* key to success */}
            <KeyToSuccess/>

            {/* new subs */}
            <NewSubscriptions/>

            {/* earnings */}
            <Earnings/>

            {/* journey */}
            <Journey/>
        </div>
    )
}