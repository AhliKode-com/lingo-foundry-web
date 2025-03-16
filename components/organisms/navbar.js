/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:00
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-16 18:56:44
 */
"use client"
import { usePathname } from 'next/navigation';
import React, {useState, useEffect} from 'react'

import { OrangeButton } from '@/components/atoms/buttons'
import { NavbarData } from '@/constants/en'
import Link from 'next/link';

export default function Navbar() {

    const { links, auth } = NavbarData;
    
    const pathname = usePathname();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
        }
      
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [open]);

    return (
        <nav className="fixed z-50 bg-[#FFFFFF] w-full border-b-2 border-[#FF723A10] font-semibold">
            <div className="lingo-container flex justify-between items-center py-[5px] relative">
                <img src="./assets/dot-nav.svg" alt="Dot" className="block absolute left-[150px] sm:left-[275px] top-[9px]"/>
                <Link className='cursor-pointer z-30' href='/' onClick={() => setOpen(false)}>
                    <img src="./assets/logo.png" alt="Logo" className="max-w-none w-[90px] md:w-[120px] animation-effect"/>
                </Link>
                <div className="hidden xl:flex">
                    <ul className="flex gap-11 text-[16px]">
                        {links.map((link, index) => {
                            const marginClass = index === 0 ? 'mr-[80px]' : '';
                            const activeClass = pathname === link.href ? 'text-[#E15C31]' : '';
                            return (
                                <li key={index} className={`${marginClass} ${activeClass}`}>
                                    <Link href={link.href}>{link.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='hidden md:flex items-center'>
                    <Link href='/'>
                        <OrangeButton text="Apply as Tutor"/>
                    </Link>
                    {auth.map((link, index) => {
                        const marginClass = index === 0 ? 'mx-[30px]' : '';
                        return (
                            <Link 
                                key={index} 
                                className={`cursor-pointer ${marginClass}`}
                                href={link.href}
                            >
                                {link.title}
                            </Link>
                        )}
                    )}
                </div>

                {/* hamburger */}
                <div className='flex ml-auto md:hidden group z-50 w-6 h-6 cursor-pointer flex-col justify-between items-center' onClick={() => { setOpen(!open) }}>
                    <span className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out bg-[#FF5733] ${open ? "rotate-45 translate-y-2.5" : ""}`} />
                    <span className={`h-1 rounded-lg cursor-pointer transition-all duration-300 ease-in-out bg-[#1D419D] ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full rounded-lg cursor-pointer transform transition duration-300 ease-in-out bg-[#FF5733] ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
                </div>

                {/* mobile */}
                <div 
                    className={
                    `fixed top-0 right-0 z-40 w-2/3 h-full bg-white 
                    animation-effect drop-shadow-2xl
                    ${open ? 'translate-x-0' : 'translate-x-full'}`
                    }
                >
                    <div className="flex flex-col justify-center h-full p-5 sm:p-12">
                        <ul className="flex flex-col gap-6 text-[14px] sm:text-[16px]">
                            {links.map((link, index) => {
                                const activeClass = pathname === link.href ? 'text-[#E15C31]' : '';
                                return (
                                    <li key={index} className={`${activeClass}`}>
                                        <Link href={link.href} onClick={() => setOpen(false)}>{link.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='flex flex-col mt-6'>
                            <Link href='/' onClick={() => setOpen(false)}>
                                <OrangeButton text="Apply as Tutor"/>
                            </Link>
                            <div className='flex mt-6 gap-6'>
                                {auth.map((link, index) => {
                                    return (
                                        <Link
                                            key={index} 
                                            className='cursor-pointer'
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </nav>
    )
}