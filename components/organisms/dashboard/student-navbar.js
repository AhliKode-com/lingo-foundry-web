/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 08:45:02
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-24 09:21:58
 */

"use client"
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {useAuth} from "@/context/AuthContext";

export default function StudentNavbar() {
    const pathname = usePathname();
    const { user, loading } = useAuth();

    const links = [
        {
            name: "Dashboard",
            href: "/student-dashboard"
        },
        {
            name: "Courses",
            href: "/student-dashboard/courses"
        },
        {
            name: "Message",
            href: "/student-dashboard/message"
        },
        {
            name: "Purchase History",
            href: "/student-dashboard/purchase-history"
        },
        {
            name: "Settings",
            href: "/student-dashboard/settings"
        }
    ]

    return (
        <div id='student-navbar' className="lingo-container flex flex-col h-full pt-[80px] sm:pt-[103.61px]">
            <div className="mt-[50px] border-[1px] border-[#FF723A40] w-full lg:h-[190px] p-[20px] md:p-[40px]">
                <div
                    className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full h-full gap-[20px] lg:gap-0 animation-effect">
                    <div className="flex items-center gap-[23px]">
                        { loading ? (
                            <div className="w-[75px] h-[75px] md:w-[110px] md:h-[110px] bg-gray-300 animate-pulse rounded-full"></div>
                        ) : (
                            <img 
                                src={user?.photoProfileUrl || "/placeholder.svg"} 
                                alt="student profile"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/placeholder.svg";
                                }}
                                className="w-[75px] h-[75px] md:w-[110px] md:h-[110px] animation-effect rounded-full object-cover"
                            />
                        )}
                        <div className="flex flex-col gap-[6px] md:gap-[14px]">
                            { loading ? (
                                <div className="h-[40px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                            ) : (
                                <span
                                    className = "font-semibold text-[18px] md:text-[24px] animation-effect" >{!user?.firstName || !user?.lastName ? user?.username : `${user?.firstName} ${user?.lastName}`}
                                </span>
                            )}
                            <div className="flex flex-col">
                                {/*<div className="flex items-center gap-[12px]">*/}
                                {/*    <img src="/assets/indo-flag.svg" alt="indo flag" className="w-[22px]"/>*/}
                                {/*    <span className="text-[#6E7485] text-[14px] md:text-[16px] animation-effect">From Indonesia</span>*/}
                                {/*</div>*/}
                                <div className="flex items-center gap-[12px]">
                                    <img src="/assets/checkbox.svg" alt="checkbox" className="w-[22px]"/>
                                    <span className="text-[#6E7485] text-[14px] md:text-[16px] animation-effect">Email Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-[30px]">
                        <Link href="/tutor-register">
                            <button className="cursor-pointer bg-[#FFEEE8] px-[32px] py-[16px] items-center gap-[12px] md:flex hidden">
                                <span className='text-[#FF6636]'>Become Tutor</span>
                                <img src="/assets/arrow-right.svg" alt="arrow right" className=""/>
                            </button>
                        </Link>
                    </div>
                    <>
                        <Link href="/tutor-register" className='md:hidden'>
                            <button className="cursor-pointer bg-[#FFEEE8] px-[20px] py-[12px] items-center gap-[12px] flex w-fit">
                                <span className='text-[#FF6636] text-[12px] '>Become Tutor</span>
                                <img src="/assets/arrow-right.svg" alt="arrow right" className="md:w-auto w-[14px]"/>
                            </button>
                        </Link>
                    </>
                </div>
            </div>
            <div
                className="overflow-x-auto mb-[40px] pt-[15px] md:pt-[20px] px-[20px] md:px-[40px] w-full h-[50px] md:h-[65px] border-[1px] border-[#FF723A40] border-t-0 flex items-center">
                <ul className="flex gap-[40px] h-full">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href ? 'border-b-2 border-[#FF6636]' : '';
                        const handleLinkClick = () => {
                            const target = document.getElementById("student-navbar");
                            if (target) {
                                target.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                        };
                        return (
                            <li key={index}
                                className={`text-[14px] md:text-[16px] text-[#4E5566] ${isActive} h-full px-[10px] md:px-[20px] whitespace-nowrap animation-effect`}>
                                <Link href={link.href} onClick={handleLinkClick}>{link.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}