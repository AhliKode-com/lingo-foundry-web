/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:30
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-28 22:11:09
 */

import { FooterData } from '@/constants/en'
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const { title, contactUs, quickLinks, features, socialMedias } = FooterData;
    return (
        <footer className="pt-[70px] sm:pt-[90px] w-full border-t-[1px] border-[#CFCFCF]">
            <div className="lingo-container relative w-full flex flex-col pb-[40px]">
                {/* <span className='text-[14px] md:text-[16px]'>{title.navTitle}</span> */}
                <div className='my-[20px] md:my-[40px]'>
                    {/* <div className='
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
                    </div> */}
                    <div className='
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
                        gap-[20px] sm:gap-0
                    '>
                        <div className='flex flex-col'>
                            <Image 
                                src="/assets/logo.png" 
                                alt="Logo" 
                                width={120}
                                height={120}
                                className="max-w-none w-[90px] md:w-[120px]"
                                priority
                            />
                            <span className='sm:w-[200px] my-4 text-[14px] md:text-[16px]'>{title.address}</span>
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
                        <div className='flex flex-col text-[14px] md:text-[16px]'>
                            <span className='mb-[15px] md:mb-[35px] font-semibold'>{title.contactUs}</span>
                            {contactUs.map((item, index) => {
                                const isInternal = item.href.includes('Whatsapp');
                                return (
                                    <Link
                                        key={index} 
                                        href={item.href}
                                        className='cursor-pointer mb-[12px] text-[#A3A3A3]'
                                        {...(!isInternal && { target: "_blank", rel: "noopener noreferrer" })}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            )}
                        </div>
                        <div className='flex flex-col text-[14px] md:text-[16px]'>
                            <span className='mb-[15px] md:mb-[35px] font-semibold'>{title.followUs}</span>
                            <div className='flex gap-[10px] text-[#E35D33]'>
                                {socialMedias.map((socialMedia, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            className='w-[39px] h-[39px] rounded-full bg-[#FF723A10] flex items-center justify-center'
                                            href={socialMedia.href}
                                        >
                                            {socialMedia.component}
                                        </Link>
                                    )
                                })}
                            </div>
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