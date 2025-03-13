/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:33
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 21:25:36
 */

"use client"
import { useState, useEffect } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { OrangeText } from '@/components/atoms/title';
import { Home } from '@/constants/en';

const Carousel = () => {
    const { carousel } = Home;
    const slides = [
        { id: 1, src: './assets/man-1.png', alt: carousel.englishTutors.title, price: carousel.englishTutors.price },
        { id: 2, src: './assets/man-2.png', alt: carousel.japaneseTutors.title, price: carousel.japaneseTutors.price },
        { id: 3, src: './assets/women-1.png', alt: carousel.koreanTutors.title, price: carousel.koreanTutors.price },
        { id: 4, src: './assets/women-2.png', alt: carousel.italianTutors.title, price: carousel.italianTutors.price },
        { id: 5, src: './assets/men-3.jpg', alt: carousel.thailandTutors.title, price: carousel.thailandTutors.price },
        { id: 6, src: './assets/women-3.jpg', alt: carousel.russianTutors.title, price: carousel.russianTutors.price }
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
        <div className="lingo-container pt-[220px] flex flex-col">
          <OrangeText text={carousel.title} position="justify-start"/>
          <div className="relative w-full mx-auto flex flex-col overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[18px] sm:text-[24px] md:text-[32px] animation-effect">
                {carousel.subtitle}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded" />
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="rounded object-cover w-full"
                  />
                  <div className="justify-center items-center flex flex-col whitespace-nowrap absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white">
                    <span className="font-semibold text-[18px] md:text-[22px] lg:text-[24px] mb-[5px] animation-effect">
                      {slide.alt}
                    </span>
                    <span className="font-medium text-[14px] md:text-[16px] animation-effect">
                      {slide.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}

export default Carousel