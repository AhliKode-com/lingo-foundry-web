/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-27 21:08:15
 */
"use client"
import { TitleStudentDashboard } from "@/components/atoms/title";
import { getStudentDashboard } from '@/api/dashboard/getStudentDashboard';

export default function StudentDashboard(){
    const { data: {
        enrolledCourseCount,
        activeCourseCount,
        completedCourseCount,
        totalHours
        }, loading } = getStudentDashboard();

    const dataNew = [
        {img: '/assets/category/1.png', name: 'Enrolled Courses', number: enrolledCourseCount, bg: '#FFEEE8'},
        {img: '/assets/category/2.png', name: 'Active Courses', number: activeCourseCount, bg: '#EBEBFF'},
        {img: '/assets/category/3.png', name: 'Completed Courses', number: completedCourseCount, bg: '#E1F7E3'},
        {img: '/assets/category/4.png', name: 'Total Hours', number: totalHours, bg: '#FFF2E5'},
    ]
    return(
        <div className="lingo-container flex flex-col mb-[72px]">
            <TitleStudentDashboard text="Dashboard" />
            <div className='mt-[15px] md:mt-[35px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-[18px] md:gap-[24px] animation-effect'>
                {loading ? (
                     Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-gray-200 animate-pulse p-[10px] sm:p-[14px] md:p-[16px] lg:p-[20px] animation-effect flex items-center">
                            <div className='flex items-center'>
                                <div 
                                    className='w-[45px] h-[45px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] bg-gray-300 animate-pulse'
                                />
                            </div>
                        </div>
                    ))
                    
                ) : 
                (
                    dataNew.map((item, index) => (
                        <div style={{ backgroundColor: item.bg }} className="p-[10px] sm:p-[14px] md:p-[16px] lg:p-[20px] animation-effect flex items-center" key={index}>
                            <div className='flex items-center'>
                                <img 
                                    src={item.img} 
                                    alt={item.name} 
                                    className='w-[45px] h-[45px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px]  animation-effect'
                                />
                                <div className='flex flex-col ml-[5px] sm:ml-[20px] gap-[4px] sm:gap-[8px] animation-effect'>
                                    <span className='text-[14px] sm:text-[16px] font-medium animation-effect'>{item.name}</span>
                                    <span className='text-[12px] sm:text-[14px] animation-effect'>{item.number}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}