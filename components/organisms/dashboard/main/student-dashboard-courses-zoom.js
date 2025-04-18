/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-18 21:09:24
 */
"use client"
import { TitleSubDashboard, OrangeTextDashboard } from "@/components/atoms/title";
import MyCourses from "@/components/organisms/dashboard/my-courses";
import UpcomingZoom from "@/components/organisms/dashboard/upcoming-zoom";
import EducationalMetricsChart from "@/components/organisms/dashboard/productivity";
import { getStudentDashboard } from '@/apis/dashboard/getStudentDashboard';
import Link from "next/link";

export default function StudentDashboardCoursesZoom(){
    const { data: {activeCourses, dailyCourseStatistics}, loading } = getStudentDashboard();
    const data2 = [
        {img: '/assets/hero-bottom.png', name: 'QnA: Backend Thinking From Scratch', date: 'July 20, 2025', time: '08:00 - 09:00 am'},
        {img: '/assets/hero-bottom.png', name: 'QnA: Frontend Thinking From Scratch', date: 'August 20, 2025', time: '08:00 - 09:00 am'}
    ]
    return(
        <div className="lingo-container flex flex-col mb-[80px]">
            <div className="flex lg:flex-row flex-col gap-[30px]">
                <div className="lg:w-3/5">
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="My Courses" custom="w-full border-[#FFBA7D]"/>
                        <Link href="student-dashboard/courses" className="w-full">
                            <OrangeTextDashboard text="See all courses" position="justify-end"/>
                        </Link>
                    </div>
                    <div className="gap-[8px] flex flex-col">
                        { loading ? (
                                <div className="flex flex-col gap-[8px]">
                                    <div className="h-[70px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                                    <div className="h-[70px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                                    <div className="h-[70px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                                </div>
                            ) : activeCourses?.length > 0 ? (
                                    activeCourses?.map((item, index) => {
                                        return (
                                            <MyCourses key={index} data={item}/>
                                        )
                                    })
                            ) : (
                                <div className="py-10">No Courses available.</div>
                            )}
                    </div>
                </div>
                <div className="lg:w-2/5 flex flex-col">
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="Upcoming Google meet Class" custom="w-full border-[#FFBA7D]"/>
                        <OrangeTextDashboard text="See all" position="justify-end"/>
                    </div>
                    <div className="flex flex-col gap-[8px] mb-[24px]">
                        {/* {data2.map((item, index) => (
                            <UpcomingZoom key={index} data={item}/>
                        ))} */}
                        <div className="py-10">No Goole meet available.</div>
                    </div>
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="Productivity" custom="w-full border-[#FFBA7D]"/>
                    </div>
                    { loading ? (
                        <div className="h-[200px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                    ) : dailyCourseStatistics?.length > 0 ? (
                        <EducationalMetricsChart chart={dailyCourseStatistics}/>
                    ) : (
                        <div className="py-10">No Productivity Yet.</div>
                    )}
                </div>
            </div>
        </div>
    )
}