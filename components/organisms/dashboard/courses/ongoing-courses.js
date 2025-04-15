"use client"

import CourseCard from "@/components/organisms/dashboard/courses/course-card";
import {useState} from "react";
import Link from "next/link";

export default function OngoingCourses({ courses }) {
    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <>
            {!courses || !courses.activeCourses || courses?.activeCourses?.length === 0 ? (
                <div className="flex flex-col justify-start">
                    <span className="text-[16px] md:text-[20px] text-[#4E5566] mt-[20px]">
                        You don&#39;t have any course yet.{" "}
                        <Link href="/find-tutor">
                            <span className="underline text-[#E35D33] cursor-pointer">
                                Start learning with us!
                            </span>
                        </Link>
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start mt-6">
                    {courses.activeCourses.map((course, index) => (
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