/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:23
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 09:28:03
 */
"use client"
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";

export function LastDaysButton({custom}) {
  const daysData = [
          'Lifetime',
          'Last 90 days',
          'Last 30 days',
          'Last 7 days',
          'Last 1 day'
      ]
      const [showDaysDropdown, setShowDaysDropdown] = useState(false);
      const handleDaysDropdown = () => {
          setShowDaysDropdown(!showDaysDropdown)
      }
      const [selectedDays, setSelectedDays] = useState(1);
  return (
    <div className={`relative max-w-[250px] ${custom}`}>
      <button 
        onClick={handleDaysDropdown}
        className='gap-[20px] w-full cursor-pointer flex justify-between items-center px-[21px] py-[15px] bg-white border-[2px] border-[#DCDCE5] rounded-[8px]'
      >
        <Image
            src="/assets/tutor-dashboard/calendar.svg"
            height={17}
            width={18}
            className=""
            alt="logo"
        />
        {daysData[selectedDays]}
        <IoIosArrowDown/>
      </button>
      {showDaysDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg">
              {daysData.map((item, index) => (
                  <div
                      key={index}
                      className="px-[18px] py-[12px] hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                          setSelectedDays(index)
                          setShowDaysDropdown(false)
                      }}
                  >
                      <span className="text-[16px]">{item}</span>
                  </div>
              ))}
          </div>
      )}
    </div>
    
  );
}


export function TutorButton({text, custom}) {
  return(
      <button className={`${custom} animation-effect bg-[#E15C31] text-[16px] sm:text-[24px] px-[28px] py-[13px] font-bold rounded-[6px] text-white cursor-pointer animation-effect`}>
        {text}
      </button>
  )
}

export function StepButton({text, onClick, bgColor}) {
    return (
        <button
          onClick={onClick}
          className={`px-[35px] py-[10px] rounded-[10px] ${bgColor} text-white font-bold`}
        >
          {text}
        </button>
    )
}

export function OrangeButton({text, marginTop, custom}) {
    return (
        <button className={`
          bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] rounded-[40px] text-white cursor-pointer animation-effect 
          ${marginTop} ${custom}`}>
            {text}
        </button>
    )
}

export function WhiteButton({text}) {
    return (
        <button className="bg-[#FFFFFF] text-[14px] sm:text-[16px] px-[28px] py-[11px] rounded-[40px] text-[#E15C31] cursor-pointer border-2 border-[#E15C31] animation-effect">
            {text}
        </button>
    )
}

export function CategoryButton({ text, isSelected, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`px-[20px] py-[10px] md:px-[35px] md:py-[16px] rounded-[40px] text-[16px] font-bold animation-effect cursor-pointer
          ${
            isSelected
              ? "bg-[#E35D33] text-white"
              : "bg-[#FF723A10] text-[#E35D33]"
          }
        `}
      >
        {text}
      </button>
    );
}