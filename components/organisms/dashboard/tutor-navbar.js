/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 08:45:02
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 10:03:56
 */

"use client"
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {useAuth} from "@/context/AuthContext";

export default function StudentNavbar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const links = [
        {
            name: "Home",
            href: "/tutor-dashboard"
        },
        {
            name: "My Students",
            href: "/tutor-dashboard/my-students"
        },
        {
            name: "My Ads",
            href: "/tutor-dashboard/my-ads"
        },
        {
            name: "Messages",
            href: "/tutor-dashboard/message"
        },
        {
            name: "Settings",
            href: "/tutor-dashboard/settings"
        }
    ]

    return (
        <div className="lingo-container flex flex-col h-full pt-[80px] sm:pt-[103.61px]">
            <div className="mt-[50px] border-[1px] border-[#FF723A40] w-full lg:h-[190px] p-[20px] md:p-[40px]">
                <div
                    className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full h-full gap-[20px] lg:gap-0 animation-effect">
                    <div className="flex items-center gap-[23px]">
                        <img 
                            src={user?.photoProfileUrl || "/placeholder.svg"} 
                            alt="student profile"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder.svg";
                            }}
                            className="w-[75px] h-[75px] md:w-[110px] md:h-[110px] animation-effect rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-[6px] md:gap-[14px]">
                            <span
                                className = "font-semibold text-[18px] md:text-[24px] animation-effect" >{!user.firstName || !user.lastName ? user?.username : `${user?.firstName} ${user?.lastName}`}</span>
                            <div className='flex gap-[24px] items-start'>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-[12px]">
                                        <img src="/assets/checkbox.svg" alt="checkbox" className="w-[22px]"/>
                                        <span className="text-[#6E7485] text-[14px] md:text-[16px] animation-effect">Email Verified</span>
                                    </div>
                                    <div className="flex items-center gap-[12px]">
                                        <img src="/assets/checkbox.svg" alt="checkbox" className="w-[22px]"/>
                                        <span className="text-[#6E7485] text-[14px] md:text-[16px] animation-effect">CV Verified</span>
                                    </div>
                                    <div className="flex items-center gap-[12px] md:hidden">
                                        <img src="/assets/checkbox.svg" alt="checkbox" className="w-[22px]"/>
                                        <span className="text-[#6E7485] text-[14px] md:text-[16px] animation-effect">CV Verified</span>
                                    </div>
                                </div>
                                <div className="hidden items-center gap-[12px] md:flex">
                                    <img src="/assets/checkbox.svg" alt="checkbox" className="w-[22px]"/>
                                    <span className="text-[#6E7485] text-[14px] md:text-[16px] animation-effect">CV Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="overflow-x-auto mb-[40px] pt-[15px] md:pt-[20px] px-[20px] md:px-[40px] w-full h-[50px] md:h-[65px] border-[1px] border-[#FF723A40] border-t-0 flex items-center">
                <ul className="flex gap-[40px] h-full">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href ? 'border-b-2 border-[#FF6636]' : '';
                        return (
                            <li key={index}
                                className={`text-[14px] md:text-[16px] text-[#4E5566] ${isActive} h-full px-[10px] md:px-[20px] whitespace-nowrap animation-effect`}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}