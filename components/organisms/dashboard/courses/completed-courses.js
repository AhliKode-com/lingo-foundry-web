"use client"

import CourseCard from "@/components/organisms/dashboard/courses/course-card";
import {useState} from "react";

export default function CompletedCourses() {
    //const completedCourses = null;
    const completedCourses = [
        {
            title: "Application of AI in UI/UX design",
            author: "Robert Hook",
            tag: "Free Trial",
            progress: 25,
            total: 25,
            unit: "minute",
            downloadable: false,
            downloadLink: null,
        },
        {
            title: "Design Thinking From Scratch",
            author: "Robert Hook",
            tag: "Beginner",
            progress: 17,
            total: 17,
            unit: "hrs",
            downloadable: false,
            downloadLink: null,
        },
        {
            title: "Figma: Create Better Design System A really really long text that going to be clamped",
            author: "Robert Hook",
            tag: "Advanced",
            progress: 20,
            total: 20,
            unit: "hrs",
            downloadable: false,
            downloadLink: null,
        },
        {
            title: "Figma: Create Better Design System A really really long text that going to be clamped",
            author: "Robert Hook",
            tag: "Advanced",
            progress: 20,
            total: 20,
            unit: "hrs",
            downloadable: true,
            downloadLink: "https://google.com",
        },
    ];

    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <>
            {!completedCourses || completedCourses?.length === 0 ? (
                <div className="flex flex-col items-start">
                    <span className="text-[16px] md:text-[20px] text-[#4E5566] mt-[20px]">You have no completed courses</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start mt-6">
                    {completedCourses?.map((course, index) => (
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