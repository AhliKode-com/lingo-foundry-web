/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 11:09:08
 */

import { TitleStudentDashboard } from "@/components/atoms/title";

export default function StudentDashboard(){
    const data = [
        {img: '/assets/category/1.png', name: 'Enrolled Courses', number: 957, bg: '#FFEEE8'},
        {img: '/assets/category/2.png', name: 'Active Courses', number: 6, bg: '#EBEBFF'},
        {img: '/assets/category/3.png', name: 'Completed Courses', number: 951, bg: '#E1F7E3'},
        {img: '/assets/category/4.png', name: 'Total Hours', number: 85, bg: '#FFF2E5'},
    ]
    return(
        <div className="lingo-container flex flex-col mb-[72px]">
            <TitleStudentDashboard text="Dashboard" />
            <div className='mt-[15px] md:mt-[35px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-[18px] md:gap-[24px] animation-effect'>
                {data.map((item, index) => (
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
                ))}
            </div>
        </div>
    )
}