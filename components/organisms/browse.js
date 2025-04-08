/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 14:21:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-08 21:13:36
 */

import Image from 'next/image';
import { TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en'
import { getLandingSubjects } from '@/api/getLandingSubjects';
import Link from 'next/link';

export default function Browse() {
    const { category } = Home;

    const { data: subjects, loading } = getLandingSubjects();
    const bgColors = ["#EBEBFF","#E1F7E3","#FFF2E5","#FFF0F0","#F5F7FA","#FFEEE8",]
    const showSkeleton = loading || !subjects;

    return (
        <div className="bg-[#FFFFFF] w-full flex justify-center pt-[100px] flex-col">
            <TitleText text={category.title} marginBottom='mb-[55px]' marginX='mx-auto'/>
            <div className='lingo-container px-[20px] mb-[55px] xl:px-0 z-10 animation-effect'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-[18px] md:gap-[24px] animation-effect'>
                    { showSkeleton ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-300 animate-pulse p-[10px] sm:p-[14px] md:p-[16px] lg:p-[20px] animation-effect flex items-center"
                            >
                                    <div className='flex justify-center items-center bg-gray-300 animate-pulse drop-shadow-lg w-[45px] h-[45px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] animation-effect'>
                                    </div>
                            </div>
                        ))
                    ) : (
                        subjects && subjects.map((subject, index) => {
                            const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
                            return(
                                <Link
                                    key={index}
                                    href={{
                                        pathname: '/find-tutor',
                                        query: { name: subject.name }
                                    }}
                                >
                                    <div style={{ backgroundColor: randomColor }} className="p-[10px] sm:p-[14px] md:p-[16px] lg:p-[20px] animation-effect flex items-center" key={index}>
                                        <div className='flex items-center'>
                                            <div className='flex justify-center items-center bg-[#FFFFFF] drop-shadow-lg w-[45px] h-[45px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] animation-effect'>
                                                <img 
                                                    src={subject.iconUrl} 
                                                    alt={subject.name} 
                                                    className='w-[18px] h-[18px] md:w-[24px] md:h-[24px] lg:w-[32px] lg:h-[32px] animation-effect'
                                                />
                                            </div>
                                            <div className='flex flex-col ml-[5px] sm:ml-[20px] gap-[4px] sm:gap-[8px] animation-effect'>
                                                <span className='text-[14px] sm:text-[16px] font-medium animation-effect'>{subject.name}</span>
                                                <span className='text-[12px] sm:text-[14px] animation-effect'>{subject.numberOfCourses}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>
            <div className='flex flex-col md:flex-row mx-auto gap-[8px] md:gap-[36px] items-center animation-effect'>
                <span className='text-[14px] text-[#4E5566]'>{category.seeAll}</span>
                <Link href="/find-tutor">
                    <div className='flex items-center gap-[8px]'>
                        <span className='text-[14px] text-[#E35D33]'>{category.browseAll}</span>
                        <Image 
                            src='./assets/arrow-right.svg' 
                            alt='arrow-right' 
                            width={120}
                            height={120}
                            className='w-[18px] h-[18px] md:w-[24px] md:h-[24px] animation-effect'
                            priority
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}