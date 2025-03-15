/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:30
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-15 17:45:52
 */

import { FooterData } from '@/constants/en'
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaGooglePlusG, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const { title, list1, list2, list3, list4, contactUs, quickLinks, features } = FooterData;
    return (
        <footer className="pt-[70px] sm:pt-[90px] w-full border-t-[1px] border-[#CFCFCF]">
            <div className="lingo-container relative w-full flex flex-col pb-[40px]">
                <span className='text-[14px] md:text-[16px]'>{title.navTitle}</span>
                <div className='my-[20px] md:my-[40px]'>
                    <div className='
                        animation-effect
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                        gap-[20px] sm:gap-0
                        text-[#A3A3A3] text-[14px] md:text-[16px] 
                        mb-[70px] lg:mb-[125px]
                    '>
                        <div className='flex flex-col'>
                            {list1.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                        <div className='flex flex-col'>
                            {list2.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                        <div className='flex flex-col'>
                            {list3.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                        <div className='flex flex-col'>
                            {list4.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                    </div>
                    <div className='
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                        gap-[20px] sm:gap-0
                    '>
                        <div className='flex flex-col'>
                            <img src="./assets/logo.png" alt="Logo" className="max-w-none w-[90px] md:w-[120px]"/>
                            <span className='sm:w-[200px] my-4 text-[14px] md:text-[16px]'>{title.address}</span>
                            <div className='flex gap-[10px] text-[#E35D33]'>
                                <div className='w-[39px] h-[39px] rounded-full bg-[#FF723A10] flex items-center justify-center'>
                                    <FaFacebookF/>
                                </div>
                                <div className='w-[39px] h-[39px] rounded-full bg-[#FF723A10] flex items-center justify-center'>
                                    <FaWhatsapp/>
                                </div>
                                <div className='w-[39px] h-[39px] rounded-full bg-[#FF723A10] flex items-center justify-center'>
                                    <FaGooglePlusG/>
                                </div>
                                <div className='w-[39px] h-[39px] rounded-full bg-[#FF723A10] flex items-center justify-center'>
                                    <FaInstagram/>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col text-[14px] md:text-[16px]'>
                            <span className='mb-[15px] md:mb-[35px] font-semibold'>{title.contactUs}</span>
                            {contactUs.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px] text-[#A3A3A3]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                        <div className='flex flex-col text-[14px] md:text-[16px]'>
                            <span className='mb-[15px] md:mb-[35px] font-semibold'>{title.quickLinks}</span>
                            {quickLinks.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px] text-[#A3A3A3]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                        <div className='flex flex-col text-[14px] md:text-[16px]'>
                            <span className='mb-[15px] md:mb-[35px] font-semibold'>{title.feature}</span>
                            {features.map((item, index) => {
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px] text-[#A3A3A3]'
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[1px] w-full bg-[#CFCFCF]'></div>
            <div className='lingo-container py-[20px] md:py-[40px] justify-center flex w-full text-[10px] sm:text-[12px] md:text-[16px]'>
                Copyright@ 2025 &nbsp;<span className='font-semibold'>Lingo Foundry</span>. All Rights Reserved
            </div>
        </footer>
    )
}