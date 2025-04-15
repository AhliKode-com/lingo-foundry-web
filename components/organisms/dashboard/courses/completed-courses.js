"use client"

import CourseCard from "@/components/organisms/dashboard/courses/course-card";
import {useState} from "react";

export default function CompletedCourses({ courses }) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <>
            {!courses?.completedCourses || courses?.completedCourses?.length === 0 ? (
                <div className="flex flex-col items-start">
                    <span className="text-[16px] md:text-[20px] text-[#4E5566] mt-[20px]">You have no completed courses</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start mt-6">
                    {courses?.completedCourses?.map((course, index) => (
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