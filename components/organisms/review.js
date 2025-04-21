/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 17:29:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-22 00:52:30
 */
"use client"
import { usePathname } from 'next/navigation';
import { TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en';
import { OrangeButton } from '@/components/atoms/buttons';
import Image from 'next/image';
import { getReviews } from '@/apis/getUserReview';
import Link from 'next/link';

export default function Review({authorType}) {
    const { review } = Home

    const { data: reviews, loading } = getReviews(authorType);
    const pathname = usePathname();

    const displayedReviews = pathname === '/review'
  ? reviews?.content || []
  : reviews?.content?.slice(0, 3) || [];


    return (
        <div className={`lingo-container flex flex-col relative ${pathname === '/review' ? 'pt-[200px]' : 'pt-[115px]'}`}>
            <div className={`flex justify-between items-center mb-[90px] ${pathname === '/review' ? 'hidden' : ''}`}>
                <TitleText text={review.title}/>
                <Link href='review'>
                    <OrangeButton text={review.readButton}/>
                </Link>
            </div>

            {displayedReviews?.length > 0 ? (
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-[76px] lg:gap-[38px] mb-[60px] animation-effect">
                {
                    loading ? (
                        <>
                            <div className="animate-pulse bg-gray-300 p-5 h-[200px] w-full" />
                            <div className="animate-pulse bg-gray-300 p-5 h-[200px] w-full" />
                            <div className="animate-pulse bg-gray-300 p-5 h-[200px] w-full" />
                        </>
                    ) : 
                        displayedReviews.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    animation-effect
                                    relative h-fit w-full flex flex-col justify-between
                                    px-[25px] pt-[75px] pb-[35px] bg-[#FFFFFF] rounded-[16px]
                                    shadow-[0px_28.93px_61.56px_0px_rgba(21,21,21,0.12)]
                                    ${pathname === '/review' ? 'mb-[0px] lg:mb-[76px]' : 'mb-[0px]'}
                                `}
                            >
                                <img
                                    src={item.photoObjectKey}
                                    alt={item.author}
                                    className="absolute top-[-40px] w-[75px] h-[75px] rounded-full"
                                />
                                <div className="absolute right-[25px] top-[25px] flex gap-[4px]">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                    <Image
                                        key={i}
                                        src="/assets/star-review.svg"
                                        alt="star-review"
                                        width={120}
                                        height={120}
                                        className="h-[20px] w-[20px]"
                                        priority
                                    />
                                    ))}
                                </div>
                                <span className="animation-effect text-[16px] sm:text-[20px] mb-[30px] lg:mb-[50px]">
                                    {item.description}
                                </span>
                                <div className="flex justify-between gap-[1px]">
                                    <div className="flex flex-col">
                                    <span className="text-[14px] font-extrabold">{item.author}</span>
                                    <span className="text-[10px]">{item.authorType}</span>
                                    </div>
                                    <div className="flex w-[120px] gap-[10px]">
                                    <Image
                                        src="./assets/thumb-up.svg"
                                        alt="thumb-up"
                                        width={120}
                                        height={120}
                                        className="h-[17px] w-[17px]"
                                        priority
                                    />
                                    <span className="text-[12px] text-[#E35D33]">
                                        {item.tutorName}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        ))
                }
                </div>
            ) : (
                <div>
                    <TitleText text='Review' custom={`${pathname !== '/review' ? 'hidden' : ''}`}/>
                    <div className={`text-center w-full ${pathname === '/review' ? 'pb-[80px] min-h-[500px] flex items-center justify-center' : ''}`}>No Reviews Yet.</div>
                </div>
            )}
            
        </div>
    )
}