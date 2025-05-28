/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:23
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-15 09:00:21
 */
"use client"
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPlus } from 'react-icons/fa';

export function LastDaysButton({custom, onChange, value = 7}) {
  const daysData = [
          {text: 'Lifetime', value: 0},
          {text: 'Last 90 days', value: 90},
          {text: 'Last 30 days', value: 30},
          {text: 'Last 7 days', value: 7},
          {text: 'Last 1 day', value: 1}
      ]
      const [showDaysDropdown, setShowDaysDropdown] = useState(false);
      const handleDaysDropdown = () => {
          setShowDaysDropdown(!showDaysDropdown)
      }
      
      // Find the index based on the value prop
      const selectedIndex = daysData.findIndex(item => item.value === value);
      const [selectedDays, setSelectedDays] = useState(selectedIndex);

      // Update selectedDays when value prop changes
      useEffect(() => {
          const newIndex = daysData.findIndex(item => item.value === value);
          if (newIndex !== -1) {
              setSelectedDays(newIndex);
          }
      }, [value]);

  return (
    <div className={`relative max-w-[250px] ${custom}`}>
      <button 
        onClick={handleDaysDropdown}
        className='whitespace-nowrap gap-[20px] w-full cursor-pointer flex justify-between items-center px-[21px] py-[15px] bg-white border-[2px] border-[#DCDCE5] rounded-[8px]'
      >
        <Image
            src="/assets/tutor-dashboard/calendar.svg"
            height={17}
            width={18}
            className=""
            alt="logo"
        />
        {daysData[selectedDays].text}
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
                          if (onChange) {
                              onChange(item.value)
                          }
                      }}
                  >
                      <span className="text-[16px]">{item.text}</span>
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

export function OrangeButton({text, marginTop, custom, onClick}) {
    return (
        <button 
            onClick={onClick}
            className={`
          bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] rounded-[40px] text-white cursor-pointer animation-effect 
          ${marginTop} ${custom}`}>
            {text}
        </button>
    )
}

export function CreateOrangeButton({text, onClick, custom}) {
  return (
      <button 
        onClick={onClick}
        className={`
        flex items-center gap-4 bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] rounded-[32px] text-white cursor-pointer animation-effect ${custom}`}
      >
        <FaPlus/>{text}
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