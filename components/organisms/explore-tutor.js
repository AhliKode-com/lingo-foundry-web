/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 00:15:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-06 15:59:38
 */

"use client"
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useState, useEffect, Suspense} from "react";
import CategorySelection from "@/components/atoms/category-selection";
import {TitleText} from "@/components/atoms/title";
import {OrangeText} from "@/components/atoms/title";
import {Home} from "@/constants/en";
import TutorProfileCard from "@/components/atoms/tutor-profile-card";
import {getPopularTutors} from "@/apis/getPopularTutors";
import TutorSearch from "@/components/organisms/tutor-search";

export default function ExploreTutor() {
    const searchParams = useSearchParams()

    const [openCardId, setOpenCardId] = useState(null);
    const [category, setCategory] = useState("allPreview")
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)

        return () => clearTimeout(timeout)
    }, [query])

    useEffect(() => {
        const searchQ = searchParams.get("q") || ""
        const timeout = setTimeout(() => {
            setQuery(searchQ)
            setDebouncedQuery(searchQ)
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchParams.get("q")])

    const {findTutor} = Home;
    const {data, loading} = getPopularTutors(debouncedQuery);

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
            <>
                <CategorySelection updateCategory={setCategory} category={category}/>
                <TutorSearch setQuery={setQuery} query={query}/>
                {loading ? (
                    <div className="mt-12">
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2" />
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2" />
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2" />
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2" />
                    </div>
                ) : !loading && data && (data[category] === null) ? (
                    <div className="font-medium text-lg mt-12 text-center">{query !== "" ? `ups, '${debouncedQuery}' not found` : "No Data Found"}</div>
                ) : data && data[category]?.map((teacher, index) => (
                    <TutorProfileCard
                        key={index}
                        teacher={teacher}
                        isOpen={openCardId === teacher.tutorId}
                        onHover={() => setOpenCardId(teacher.tutorId)}
                        onClick={() => handleCardClick(teacher.tutorId)}
                    />
                ))}
            </>
        </div>
    )
}