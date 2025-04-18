/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 11:08:10
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-18 21:25:26
 */
"use client"
import { useState } from "react";
import { TitleSubDashboard, OrangeTextDashboard } from "@/components/atoms/title";
import TutorProfileCardDashboard from "@/components/atoms/tutor-profile-card-dashboard";
import {getPopularTutors} from "@/apis/getPopularTutors";
import Link from "next/link";

export default function StudentLikeCourses() {
    const [openCardId, setOpenCardId] = useState(null);
    const [category, setCategory] = useState("highestRated")
    const { data, loading } = getPopularTutors();
    const tutors = data?.[category] || [];
    return(
        <div className="lingo-container flex flex-col">
            <div className="w-full flex justify-between items-center">
                <TitleSubDashboard text="Top tutors and course you may like" custom="mb-[15px] w-full border-[#FFBA7D]"/>
                <Link className="w-full" href="find-tutor">
                    <OrangeTextDashboard text="See all toturs and courses" position="justify-end"/>
                </Link>
            </div>
            <div className="animation-effect grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] mb-[80px]">
                { loading ? (
                    <div className="h-[350px] bg-gray-300 animate-pulse rounded-lg"></div>
                ) : tutors.length > 0 ? (
                    tutors.slice(0, 8).map((teacher, index) => (
                        <TutorProfileCardDashboard
                            key={index}
                            teacher={teacher}
                            isOpen={openCardId === teacher.tutorId}
                            onHover={() => setOpenCardId(teacher.tutorId)}
                        />
                    ))
                ): (
                    <div className="py-10">No Tutors available.</div>
                )}
            </div>
        </div>
    )
}