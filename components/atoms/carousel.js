/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-13 00:22:46
 */

"use client"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {OrangeText, TitleText} from '@/components/atoms/title';
import {Home} from '@/constants/en';
import {getTutorSubjects} from '@/apis/getTutorSubjects';
import Link from "next/link";

export function Carousel() {
    const {carousel} = Home;

    const {data: tutorSubjects = [], loading} = getTutorSubjects();

    const scrollRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    const updateScrollMetrics = useCallback(() => {
        const el = scrollRef.current
        if (!el) return
        setScrollPosition(el.scrollLeft)
        setMaxScroll(el.scrollWidth - el.clientWidth)
    }, [])

    const scrollRight = () => scrollRef.current?.scrollBy({left: 315, behavior: "smooth"})
    const scrollLeft = () => scrollRef.current?.scrollBy({left: -315, behavior: "smooth"})

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        el.addEventListener("scroll", updateScrollMetrics)
        window.addEventListener("resize", updateScrollMetrics)

        const ro = new ResizeObserver(updateScrollMetrics)
        ro.observe(el)

        updateScrollMetrics()

        return () => {
            el.removeEventListener("scroll", updateScrollMetrics)
            window.removeEventListener("resize", updateScrollMetrics)
            ro.disconnect()
        }
    }, [updateScrollMetrics])

    useEffect(() => {
        updateScrollMetrics()
    }, [tutorSubjects, updateScrollMetrics])

    return (
        <div className="lingo-container pt-[220px] flex flex-col">
            <OrangeText text={carousel.title} position="justify-start"/>
            <div className="relative w-full mx-auto flex flex-col overflow-hidden">
                <div className="flex items-center justify-between">
                    <TitleText text={carousel.subtitle}/>
                    <div className="flex gap-[10px]">
                        <button
                            onClick={scrollLeft}
                            className="bg-[#FF723A20] text-[#E35D33] h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer"
                        >
                            <MdArrowBackIos className="text-[18px] ml-2"/>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="bg-[#E35D33] text-[#FFFFFF] h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer"
                        >
                            <MdArrowForwardIos className="text-[18px]"/>
                        </button>
                    </div>
                </div>
                {tutorSubjects.length > 0 ? (
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-[60px] pb-4 hide-scrollbar mt-[30px]"
                        style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
                    >
                        {tutorSubjects.map((tutor, index) => (
                            <div key={index} className="flex-shrink-0 w-[255px] overflow-hidden bg-white">
                                <div className="relative">
                                    <img src={tutor.thumbnailUrl || "/placeholder.svg"} alt={tutor.subject} className="w-[255px] h-[290px] object-cover"/>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-full"></div>
                                    <div
                                        className="justify-center items-center flex flex-col whitespace-nowrap absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white">
                                        <span
                                            className="font-semibold text-[18px] md:text-[22px] lg:text-[24px] mb-[5px] animation-effect">
                                        {tutor.subject}
                                        </span>
                                        <span className="font-medium text-[14px] md:text-[16px] animation-effect">
                                        Rp.{tutor.averagePrice.toLocaleString()}/Lesson
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">No Tutor Yet.</div>
                )}
            </div>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}


export function TutorCarousel({tutors, loading, currentId}) {
    const scrollRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: 196, behavior: "smooth"})
        }
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -196, behavior: "smooth"})
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                setScrollPosition(scrollRef.current.scrollLeft)
                setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth)
            }
        }

        const scrollContainer = scrollRef.current
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll)

            setMaxScroll(scrollContainer.scrollWidth - scrollContainer.clientWidth)

            return () => scrollContainer.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div className="relative flex flex-col">
            <div className='flex justify-between items-center mb-[20px]'>
                <span className="text-[23px] font-medium">You might also like</span>
                <div className='flex gap-2 animation-effect'>
                    {scrollPosition > 0 && (
                        <button
                            onClick={scrollLeft}
                            className="bg-[#E35D33] text-[#FFFFFF] h-[30px] w-[30px] flex justify-center items-center rounded-full cursor-pointer"
                        >
                            <MdArrowBackIos className="text-[18px] ml-2"/>
                        </button>
                    )}
                    {scrollPosition < maxScroll && (
                        <button
                            onClick={scrollRight}
                            className="bg-[#E35D33] text-[#FFFFFF] h-[30px] w-[30px] flex justify-center items-center rounded-full cursor-pointer"
                        >
                            <MdArrowForwardIos className="text-[18px]"/>
                        </button>
                    )}
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
                style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
            >
                {loading && (
                    <div className="mt-12">
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2"/>
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2"/>
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2"/>
                        <div className="w-full h-[25px] bg-gray-100 animate-pulse rounded-lg mb-2"/>
                    </div>
                )}
                {!loading && tutors?.newest?.map((tutor) => {
                    if (tutor.tutorId === Number(currentId)) {
                        return
                    }
                    return (
                        <Link
                            href={`/tutor/${tutor.tutorId}`}
                            key={tutor.tutorId}
                        >
                            <div className="flex-shrink-0 w-[180px] overflow-hidden bg-white cursor-pointer">
                                <div className="relative">
                                    <img src={tutor.tutorProfilePhotoUrl || "/placeholder.svg"} alt={tutor.name}
                                         className="w-[180px] h-[180px] object-cover"/>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-black to-black/70 pt-[18px] p-[8px]">
                                        <div className="flex items-center">
                                    <span
                                        className="text-white text-[14px] font-semibold line-clamp-1 mr-[8px]">{tutor.tutorName}</span>
                                            {/*<span className="text-lg flex-shrink-0">{tutor.flag}</span>*/}
                                        </div>
                                    </div>
                                </div>

                                {/* Tutor info */}
                                <div className="py-4 bg-white flex flex-col min-h-[160px] justify-between">
                                    <div className="flex items-center mb-[8px]">
                                        <img src="/assets/star-review.svg" alt="star" className="w-[16px] h-[16px]"/>
                                        <span className="font-semibold ml-1">{tutor.tutorRating}</span>
                                        {/*<span className="text-[#4D4C5C] ml-1">({tutor.reviews})</span>*/}
                                    </div>
                                    <span className="text-[14px] mb-[10px] line-clamp-2">{tutor.tutorBio}</span>

                                    <div className="flex items-baseline mt-auto">
                                <span
                                    className="text-[18px] font-bold">Rp.{Number(tutor.averageHourlyRate).toLocaleString()}</span>
                                        <span className="text-[#4D4C5C] ml-[2px]">/ h</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}