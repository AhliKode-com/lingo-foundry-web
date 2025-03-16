/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:13:24
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-16 19:50:24
 */

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export function Question ({ title, answer, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
        if (open) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
        }
    }, [open, answer]); 
    
      return (
        <div className="w-full gap-0">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    ${open ? "bg-[#E35D33]" : "bg-[#FFFFFF]"}
                    border-[1px] border-[#E9EAF0] 
                    flex 
                    w-full 
                    items-center 
                    justify-between
                    py-[10px] px-[12px] md:py-[20px] md:px-[24px] 
                    cursor-pointer
                    gap-[5px]
                    animation-effect`}
            >
                <span
                    className={`
                        text-left text-lg font-medium
                        animation-effect
                        text-[14px] sm:text-[16px]
                        ${open ? "text-[#FFFFFF]" : "text-[#E35D33]"}
                    `}
                >
                    {title}
                </span>
                
                <div>
                    <FiChevronDown
                        className={`
                            text-[18px] sm:text-[24px]
                            animation-effect
                            duration-300
                            ${open ? "rotate-180 text-[#FFFFFF]" : "rotate-0 text-[#E35D33]"}
                        `}
                    />
                </div>
            </button>
    
            <div
                className="
                    text-[12px] sm:text-[14px]
                    overflow-hidden
                    animation-effect
                    text-[#4E5566]
                    shadow-lg
                "
                style={{
                    height: height
                }}
            >
                <div 
                    ref={contentRef}
                    className="py-[20px] px-[24px] bg-[#F9F9F9] border-[1px] border-[#E9EAF0]"
                >
                    {answer}
                </div>
            </div>
        </div>
      );
}