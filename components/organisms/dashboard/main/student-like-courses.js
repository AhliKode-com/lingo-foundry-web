/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 11:08:10
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 14:08:53
 */
"use client"
import { useState } from "react";
import { TitleSubDashboard, OrangeText } from "@/components/atoms/title";
import TutorProfileCardDashboard from "@/components/atoms/tutor-profile-card-dashboard";

export default function StudentLikeCourses() {
    const [openCardId, setOpenCardId] = useState(null);
    const teachers = [
        { id: 1, name: "Mila Smith", image: "/assets/tutor-profiles/tutor-1.png" },
        { id: 2, name: "John Doe", image: "/assets/tutor-profiles/tutor-2.png" },
        { id: 3, name: "Sarah Lee", image: "/assets/tutor-profiles/tutor-3.png" },
        { id: 4, name: "Debby Lee", image: "/assets/tutor-profiles/tutor-3.png" },
    ];
    return(
        <div className="lingo-container flex flex-col">
            <div className="w-full flex justify-between items-center">
                <TitleSubDashboard text="Top tutors and course you may like" custom="mb-[15px]"/>
                <OrangeText text="See all toturs and courses" position="justify-end"/>
            </div>
            <div className="animation-effect grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] mb-[80px]">
                {teachers.map((teacher) => (
                    <TutorProfileCardDashboard
                        key={teacher.id}
                        teacher={teacher}
                        isOpen={openCardId === teacher.id}
                        onHover={() => setOpenCardId(teacher.id)}
                    />
                ))}
            </div>
        </div>
    )
}