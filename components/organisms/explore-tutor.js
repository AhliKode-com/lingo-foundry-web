/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 00:15:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-06 15:59:38
 */

"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import CategorySelection from "@/components/atoms/category-selection";
import { TitleText } from "@/components/atoms/title";
import { OrangeText } from "@/components/atoms/title";
import { Home } from "@/constants/en";
import TutorProfileCard from "@/components/atoms/tutor-profile-card";
import {getPopularTutors} from "@/api/getPopularTutors";

export default function ExploreTutor() {
    const [openCardId, setOpenCardId] = useState(null);
    const [category, setCategory] = useState("allPreview")
    const { findTutor } = Home;

    const { data, loading } = getPopularTutors();

    useEffect(() => {
        if (data && data[category] && data[category].length > 0) {
            setOpenCardId(data[category][0].tutorId);
        }
    }, [category, data]);

    const router = useRouter();
    const handleCardClick = (tutorId) => {
        router.push(`/tutor/${tutorId}`);
    };

    return (
        <div className="lingo-container pt-[100px] flex flex-col relative">
            <OrangeText text={findTutor.title} position="justify-center"/>
            <TitleText text={findTutor.subtitle} marginBottom='mb-[40px]' marginX='mx-auto'/>

            { loading ? (
                <div className="w-full h-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
            ) : (
                <>
                    <CategorySelection updateCategory={setCategory} category={category} />
                    {data && data[category]?.map((teacher, index) => (
                        <TutorProfileCard
                            key={index}
                            teacher={teacher}
                            isOpen={openCardId === teacher.tutorId}
                            onHover={() => setOpenCardId(teacher.tutorId)}
                            onClick={() => handleCardClick(teacher.tutorId)}
                        />
                    ))}
                </>
            )}
        </div>
    )
}