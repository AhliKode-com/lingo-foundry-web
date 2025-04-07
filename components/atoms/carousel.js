/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-08 00:48:30
 */

"use client"
import { useState, useEffect, useRef } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { OrangeText, TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en';
import { getTutorSubjects } from '@/api/getTutorSubjects';

export function Carousel (){
    const { carousel } = Home;

    const { data: tutorSubjects, loading } = getTutorSubjects();

    const [currentIndex, setCurrentIndex] = useState(0)
    const [enableTransition, setEnableTransition] = useState(true)
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1)
    }

    const [slideWidth, setSlideWidth] = useState(260);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const updateSlideWidth = () => {
          setSlideWidth(window.innerWidth >= 768 ? 310 : 260);
        };
    
        updateSlideWidth();
    
        window.addEventListener("resize", updateSlideWidth);
        return () => window.removeEventListener("resize", updateSlideWidth);
      }
    }, []);

    useEffect(() => {
        const originalLength = tutorSubjects.length
    
        if (currentIndex >= originalLength) {
          setEnableTransition(false)
          setCurrentIndex((prev) => prev - originalLength)
        }
        else if (currentIndex < 0) {
          setEnableTransition(false)
          setCurrentIndex((prev) => prev + originalLength)
        } 
        else {
          setEnableTransition(true)
        }
    }, [currentIndex, tutorSubjects.length])

    const showSkeleton = loading || !tutorSubjects;

    return (
        <div className="lingo-container pt-[220px] flex flex-col">
          <OrangeText text={carousel.title} position="justify-start"/>
          <div className="relative w-full mx-auto flex flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <TitleText text={carousel.subtitle}/>
              <div className="flex gap-[10px]">
                <button
                  onClick={prevSlide}
                  className="bg-[#FF723A20] text-[#E35D33] h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer"
                >
                  <MdArrowBackIos className="text-[18px] ml-2" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-[#E35D33] text-[#FFFFFF] h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer"
                >
                  <MdArrowForwardIos className="text-[18px]" />
                </button>
              </div>
            </div>
      
            <div
              className={`flex gap-[60px] my-[30px] ${
                enableTransition ? 'animation-effect' : ''
              }`}
              style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
            >
                {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className='flex bg-gray-300 animate-pulse flex-shrink-0 animation-effect w-[200px] h-[240px] md:w-[250px] md:h-[290px]'/>
                        ))
                    ) : (
                        tutorSubjects.map((subject, index) => (
                            <div key={index} className="flex relative flex-shrink-0 animation-effect w-[200px] h-[240px] md:w-[250px] md:h-[290px]">
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded" />
                                <img 
                                    src={subject.thumbnailUrl} 
                                    alt={subject.subject} 
                                    className="rounded object-cover w-full"
                                />
                                <div className="justify-center items-center flex flex-col whitespace-nowrap absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white">
                                    <span className="font-semibold text-[18px] md:text-[22px] lg:text-[24px] mb-[5px] animation-effect">
                                    {subject.subject}
                                    </span>
                                    <span className="font-medium text-[14px] md:text-[16px] animation-effect">
                                    Rp.{subject.averagePrice.toLocaleString()}/Lesson
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
            </div>
          </div>
        </div>
      )
}


export function TutorCarousel({tutors}) {
    const scrollRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)
  
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 180, behavior: "smooth" })
        }
    }

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -180, behavior: "smooth" })
        }
    }

    const updateScrollMetrics = () => {
        if (scrollRef.current) {
            setScrollPosition(scrollRef.current.scrollLeft)
            setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth)
        }
    }
  
    useEffect(() => {
        const scrollContainer = scrollRef.current

        updateScrollMetrics()

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", updateScrollMetrics)
        }
        window.addEventListener("resize", updateScrollMetrics)

        // Observe changes to the container size
        const resizeObserver = new ResizeObserver(() => {
            updateScrollMetrics()
        })
        if (scrollContainer) {
            resizeObserver.observe(scrollContainer)
        }

        // Cleanup event listeners and observer on unmount
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", updateScrollMetrics)
                resizeObserver.unobserve(scrollContainer)
            }
            window.removeEventListener("resize", updateScrollMetrics)
        }
        
    }, [])
  
    return (
        <div className="relative flex flex-col">
            <div className='flex justify-between items-center mb-[20px]'>
                <span className="text-[23px] font-medium">You might also like</span>
                <div className='flex gap-2'>
                    <button
                        onClick={scrollLeft}
                        className="bg-[#E35D33] text-[#FFFFFF] h-[30px] w-[30px] flex justify-center items-center rounded-full cursor-pointer"
                        >
                        <MdArrowBackIos className="text-[18px] ml-2" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="bg-[#E35D33] text-[#FFFFFF] h-[30px] w-[30px] flex justify-center items-center rounded-full cursor-pointer"
                        >
                        <MdArrowForwardIos className="text-[18px]" />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 pb-4 cursor-pointer hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {tutors.map((tutor) => (
                    <div key={tutor.id} className="flex-shrink-0 w-[180px] overflow-hidden bg-white">
                        <div className="relative">
                            <img src={tutor.img} alt={tutor.name} className="w-[180px] h-[180px]"/>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-black to-black/70 pt-[18px] p-[8px]">
                                <div className="flex items-center">
                                    <span className="text-white text-[14px] font-semibold line-clamp-1 mr-[8px]">{tutor.name}</span>
                                    <span className="text-lg flex-shrink-0">{tutor.flag}</span>
                                </div>
                            </div>
                        </div>
        
                        {/* Tutor info */}
                        <div className="py-4 bg-white flex flex-col min-h-[160px] justify-between">
                            <div className="flex items-center mb-[8px]">
                                <img src="/assets/star-review.svg" alt="star" className="w-[16px] h-[16px]"/>
                                <span className="font-semibold ml-1">{tutor.rating}</span>
                                <span className="text-[#4D4C5C] ml-1">({tutor.reviews})</span>
                            </div>    
                            <span className="text-[14px] mb-[10px] line-clamp-2">{tutor.description}</span>
        
                            <div className="flex items-baseline mt-auto">
                                <span className="text-[18px] font-bold">Rp.{tutor.price.toLocaleString()}</span>
                                <span className="text-[#4D4C5C] ml-[2px]">/ h</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                display: none;
                }
            `}</style>
        </div>
    )
}