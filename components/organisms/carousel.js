/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-23 17:19:53
 */

"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { OrangeText, TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en';
import { getTutorSubjects } from '@/api/getTutorSubjects';

export default function Carousel (){
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
                  className="bg-[#FF723A20] text-[#E35D33] h-[60px] w-[60px] flex justify-center items-center rounded-full"
                >
                  <MdArrowBackIos className="text-[18px] ml-2" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-[#E35D33] text-[#FFFFFF] h-[60px] w-[60px] flex justify-center items-center rounded-full"
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