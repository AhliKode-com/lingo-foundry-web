/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 00:15:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-18 15:02:51
 */

"use client"
import { useState } from "react";
import CategorySelection from "@/components/atoms/category-selection";
import { TitleText } from "@/components/atoms/title";
import { OrangeText } from "@/components/atoms/title";
import { Home } from "@/constants/en";
import TutorProfileCard from "@/components/atoms/tutor-profile-card";

export default function ExploreTutor() {
    const [openCardId, setOpenCardId] = useState(null);
    const { findTutor } = Home;

    const teachers = [
        { id: 1, name: "Mila Smith", image: "/assets/tutor-profiles/tutor-1.png" },
        { id: 2, name: "John Doe", image: "/assets/tutor-profiles/tutor-2.png" },
        { id: 3, name: "Sarah Lee", image: "/assets/tutor-profiles/tutor-3.png" },
      ];

    return (
        <div className="lingo-container pt-[100px] flex flex-col relative">
            <OrangeText text={findTutor.title} position="justify-center"/>
            <TitleText text={findTutor.subtitle} marginBottom='mb-[40px]' marginX='mx-auto'/>
            <CategorySelection />

            {/* advis */}
            {teachers.map((teacher) => (
                <TutorProfileCard
                    key={teacher.id}
                    teacher={teacher}
                    isOpen={openCardId === teacher.id}
                    onHover={() => setOpenCardId(teacher.id)}
                />
            ))}
        </div>
    )
}