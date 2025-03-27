/*
 * @Author: advistasyam
 * @Date: 2025-03-24 08:41:45
 * @Last Modified by: advistasyam
 * @Last Modified time: 2025-03-24 11:08:47
 */
"use client"

import CourseSearch from "@/components/organisms/dashboard/courses/course-search";
import { TitleSubDashboard } from "@/components/atoms/title";
import OngoingCourses from "@/components/organisms/dashboard/courses/ongoing-courses";
import CompletedCourses from "@/components/organisms/dashboard/courses/completed-courses";
import {getStudentDashboard} from "@/api/dashboard/getStudentDashboard";
import React from "react";

export default function StudentDashboardCourses() {
    const { data, loading } = getStudentDashboard();

    return (
        <div className="lingo-container flex flex-col mb-[72px]">
            <p>Courses (957)</p>
            <CourseSearch />
            <TitleSubDashboard text="Ongoing" custom="mt-[20px] border-[#42CBF7]" />
            { loading ? (
                <div className="w-full h-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
            ) : (
                <OngoingCourses courses={data} />
            )}
            <TitleSubDashboard text="Completed Course" custom="mt-[60px] border-[#42CBF7]" />
            { loading ? (
                <div className="w-full h-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
            ) : (
                <CompletedCourses courses={data} />
            )}
        </div>
    )
}