/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 22:05:17
 */

import { TitleSubDashboard, OrangeTextDashboard } from "@/components/atoms/title";
import MyCourses from "@/components/organisms/dashboard/my-courses";
import UpcomingZoom from "@/components/organisms/dashboard/upcoming-zoom";
import Productivity from "@/components/organisms/dashboard/productivity";

export default function StudentDashboardCoursesZoom(){
    const data = [
        {img: '/assets/man-1.png', name: 'English for Business With Reinhard', desc: 'Sessions completed 4/20'},
        {img: '/assets/man-2.png', name: 'Mandarin for Business With Ronaldo', desc: 'Sessions completed 4/20'},
        {img: '/assets/men-3.jpg', name: 'Spanish for Business With Juanito', desc: 'Sessions completed 4/20'},
    ]

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
                        <OrangeTextDashboard text="See all courses" position="justify-end"/>
                    </div>
                    <div className="gap-[8px] flex flex-col">
                        {data.map((item, index) => (
                            <MyCourses key={index} data={item}/>
                        ))}
                    </div>
                </div>
                <div className="lg:w-2/5 flex flex-col">
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="Upcoming Zoom Class" custom="w-full border-[#FFBA7D]"/>
                        <OrangeTextDashboard text="See all" position="justify-end"/>
                    </div>
                    <div className="flex flex-col gap-[8px] mb-[24px]">
                        {data2.map((item, index) => (
                            <UpcomingZoom key={index} data={item}/>
                        ))}
                    </div>
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="Productivity" custom="w-full border-[#FFBA7D]"/>
                        <OrangeTextDashboard text="See details" position="justify-end"/>
                    </div>
                    <Productivity/>
                </div>
            </div>
        </div>
    )
}