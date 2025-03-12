/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 00:09:11
 */

"use client"
import { useState, useEffect } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Carousel = () => {
    const slides = [
        { id: 1, src: './assets/man-1.png', alt: 'English Tutors' },
        { id: 2, src: './assets/man-2.png', alt: 'Japanese Tutors' },
        { id: 3, src: './assets/women-1.png', alt: 'Korean Tutors' },
        { id: 4, src: './assets/women-2.png', alt: 'Italian Tutors' },
        { id: 5, src: './assets/men-3.jpg', alt: 'Thailand Tutors' },
        { id: 6, src: './assets/women-3.jpg', alt: 'Russian Tutors' },
    ]

    const extendedSlides = [...slides]
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
        const originalLength = slides.length
    
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
    }, [currentIndex, slides.length])

    return (
        <div className="relative w-full mx-auto flex flex-col overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[18px] sm:text-[24px] md:text-[32px] animation-effect">
              31 million teachers have been evaluated.
            </span>
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
            {extendedSlides.map((slide, index) => (
              <div
                key={index}
                className="flex relative flex-shrink-0 animation-effect w-[200px] h-[240px] md:w-[250px] md:h-[290px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded" />
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="rounded object-cover w-full"
                />
                <div className="justify-center items-center flex flex-col whitespace-nowrap absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white">
                  <span className="font-semibold text-[24px] mb-[5px]">
                    {slide.alt}
                  </span>
                  <span className="font-medium text-[16px]">
                    Rp. 350.000/Lesson
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
}

export default Carousel