/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 11:22:04
 */
"use client"
import {useState, useEffect} from "react";
import { TitleSubDashboard, OrangeTextDashboard, TitleStudentDashboard } from "@/components/atoms/title";
import MyCourses from "@/components/organisms/dashboard/my-courses";
import UpcomingGmeet from "@/components/organisms/dashboard/upcoming-gmeet";
import EducationalMetricsChart from "@/components/organisms/dashboard/productivity";
import { getStudentDashboard } from '@/apis/dashboard/getStudentDashboard';
import {useStudentBooking} from "@/apis/studentBooking";
import Link from "next/link";

export default function StudentDashboardCoursesGmeet(){
    const { data: {activeCourses, dailyCourseStatistics}, loading } = getStudentDashboard();
    const {listBooking} = useStudentBooking()
    const [bookings, setBookings] = useState([]);
    const [showAllBookings, setShowAllBookings] = useState(false);
    const toggleShowAll = () => setShowAllBookings(prev => !prev);
    useEffect(() => {
        const fetchBookings = async () => {
            const response = await listBooking();
            const content = response?.data?.content || response?.content || [];
            const transformed = content.map(item => ({
                img: item.tutorProfileUrl || '/placeholder.svg',
                name: `${item.subjectName}: ${item.subjectLevel}`,
                date: new Date(item.startTimeLocale).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: `${new Date(item.startTimeLocale).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endTimeLocale).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                link: item.meetingLink
            }));
            setBookings(transformed);
        };
    
        fetchBookings();
    }, []);
    
    
    return(
        <div className="lingo-container flex flex-col mb-[80px]">
            <TitleStudentDashboard text="Dashboard" custom="mb-[30px]"/>
            <div className="flex lg:flex-row flex-col gap-[30px]">
                <div className="lg:w-1/2">
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
                                    <div className="h-[70px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                                    <div className="h-[70px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                                </div>
                            ) : activeCourses?.length > 0 ? (
                                    activeCourses?.slice(0, 5).map((item, index) => {
                                        return (
                                            <MyCourses key={index} data={item}/>
                                        )
                                    })
                            ) : (
                                <div className="py-10">No Courses available.</div>
                            )}
                    </div>
                </div>
                <div className="lg:w-1/2 flex flex-col">
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="Upcoming Google meet Class" custom="w-full border-[#FFBA7D]"/>
                        <button onClick={toggleShowAll} className="w-full">
                            <OrangeTextDashboard text={showAllBookings ? "Show less" : "See all"} position="justify-end"/>
                        </button>
                    </div>
                    <div className="flex flex-col gap-[8px] mb-[24px]">
                       {loading ? (
                            <div className="h-[200px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                       ) : (
                            bookings.length > 0 ? (
                                (showAllBookings ? bookings : bookings.slice(0, 3)).map((item, index) => (
                                    <UpcomingGmeet key={index} data={item} />
                                ))
                            ) : (
                                <div className="py-10">No Google meet available.</div>
                            )
                       )}
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