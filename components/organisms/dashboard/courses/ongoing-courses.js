"use client"

import CourseCard from "@/components/organisms/dashboard/courses/course-card";
import {useState} from "react";
import Link from "next/link";

export default function OngoingCourses({ courses }) {
    // const ongoingCourses = null;
    const ongoingCourses = [
        {
            title: "Application of AI in UI/UX design",
            author: "Robert Hook",
            tag: "Free Trial",
            tagColor: "bg-blue-100 text-blue-600",
            progress: 0,
            total: 25,
            unit: "minute",
            downloadable: false,
            downloadLink: null,
        },
        {
            title: "Design Thinking From Scratch",
            author: "Robert Hook",
            tag: "Beginner",
            tagColor: "bg-green-100 text-green-600",
            progress: 1,
            total: 17,
            unit: "hrs",
            downloadable: false,
            downloadLink: null,
        },
        {
            title: "Figma: Create Better Design System A really really long text that going to be clamped",
            author: "Robert Hook",
            tag: "Intermediate",
            tagColor: "bg-yellow-100 text-yellow-600",
            progress: 0,
            total: 20,
            unit: "hrs",
            downloadable: false,
            downloadLink: null,
        },
        {
            title: "Figma: Create Better Design System A really really long text that going to be clamped",
            author: "Robert Hook",
            tag: "Intermediate",
            tagColor: "bg-yellow-100 text-yellow-600",
            progress: 0,
            total: 20,
            unit: "hrs",
            downloadable: false,
            downloadLink: null,
        },
    ];

    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <>
            {!ongoingCourses || ongoingCourses?.length === 0 ? (
                <div className="flex flex-col justify-start">
                    <span className="text-[16px] md:text-[20px] text-[#4E5566] mt-[20px]">
                        You don&#39;t have any course yet.{" "}
                        <Link href="/">
                            <span className="underline text-[#E35D33] cursor-pointer">
                                Start learning with us!
                            </span>
                        </Link>
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start mt-6">
                    {ongoingCourses?.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                            isSelected={selectedCourse === index}
                            onClick={() => setSelectedCourse(index)}
                        />
                    ))}
                </div>
            )}
        </>
    )
}