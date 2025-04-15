/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:13:24
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-07 22:13:19
 */
"use client"
import React, {useState, useRef, useEffect} from "react";
import {FiChevronDown} from "react-icons/fi";
import {GoArrowUp} from "react-icons/go";

export function Speciality({title, desc, defaultOpen = false}) {
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
    }, [open, desc]);

    return (
        <div className="w-full gap-0">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex 
                    w-full 
                    items-center 
                    justify-between
                    py-[10px] px-[12px] md:py-[20px]
                    cursor-pointer
                    gap-[5px]
                    animation-effect`}
            >
                <span
                    className={`
                        text-left font-medium
                        animation-effect
                        text-[14px] sm:text-[16px]
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
                            ${open ? "rotate-180" : "rotate-0"}
                        `}
                    />
                </div>
            </button>

            <div
                className="
                    text-[12px] sm:text-[14px]
                    overflow-hidden
                    animation-effect
                    border-b-[2px] border-[#E9EAF0]
                "
                style={{
                    height: height
                }}
            >
                <div
                    ref={contentRef}
                    className="pb-[20px] px-[12px]"
                >
                    {desc}
                </div>
            </div>
        </div>
    );
}

export function Question({title, answer, defaultOpen = false}) {
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
                        text-left font-medium
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

function formatDateString(input) {
    const date = new Date(input.replace(" ", "T")) // Ensures correct ISO format

    const options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }

    const formatted = date.toLocaleString("id-ID", options)
    return formatted.replace(",", "")  // Remove comma after day
        .replace("pukul", " at")
        .replace(/(.+) (\d{2}) (\d{4}), (.+)/, "$1 $2, $3 at $4")
}

export function PurchaseHistory({data, defaultOpen = false}) {
    const [open, setOpen] = useState(defaultOpen);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    const createdAt = formatDateString(data?.transactions[0]?.createdAt);
    let totalAmount = 0;
    for (const transaction of data.transactions) {
        totalAmount += transaction.orderAmount;
    }

    useEffect(() => {
        if (contentRef.current) {
            if (open) {
                setHeight(contentRef.current.scrollHeight);
            } else {
                setHeight(0);
            }
        }
    }, [open]);

    return (
        <div className="w-full gap-0">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
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
                <div className="flex flex-col gap-[12px]">
                    <span
                        className={`
                            text-left font-medium
                            animation-effect
                            text-[14px] md:text-[18px]
                            ${open ? "text-[#E35D33]" : "text-[#1D2026]"}
                        `}
                    >
                        {createdAt}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-[8px] sm:gap-[16px] animation-effect">
                        <div className="flex items-center gap-[6px]">
                            <img src="/assets/play.svg" alt="coin"
                                 className="animation-effect w-[16px] h-[16px] md:w-[20px] md:h-[20px]"/>
                            <span
                                className="animation-effect text-[12px] md:text-[14px] text-[#4E5566]">{data.courses.length} Courses</span>
                        </div>
                        <span
                            className="flex animation-effect text-[12px] md:text-[14px] text-[#4E5566]">Rp.{Number(totalAmount).toLocaleString('id-ID')}</span>
                        {/*<div className="flex items-center gap-[6px]">*/}
                        {/*    <img src="/assets/cc.svg" alt="coin"*/}
                        {/*         className="animation-effect w-[16px] h-[16px] md:w-[20px] md:h-[20px]"/>*/}
                        {/*    <span*/}
                        {/*        className="animation-effect text-[12px] md:text-[14px] text-[#4E5566]">{data.paymentMethod}</span>*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div
                    className={`
                        w-[38px] h-[38px] md:h-[48px] md:w-[48px] flex items-center justify-center
                        ${open ? "bg-[#E35D33]" : "bg-[#F5F7FA]"}
                        animation-effect
                        `}
                >
                    <GoArrowUp
                        className={`
                            text-[18px] sm:text-[24px]
                            animation-effect
                            duration-300
                            ${open ? "rotate-180 text-[#FFFFFF]" : "rotate-0 text-[#1D2026]"}
                        `}
                    />
                </div>
            </button>

            <div
                className="
                    text-[12px] sm:text-[14px]
                    overflow-hidden
                    animation-effect
                    shadow-md
                "
                style={{
                    height: height
                }}
            >
                <div
                    ref={contentRef}
                    className="py-[30px] px-[40px] bg-[#FFFFFF] border-[1px] border-[#E9EAF0] border-t-0"
                >
                    {data.courses.map((item, index) => {
                        return (
                            <div key={index}
                                 className="animation-effect grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-6 gap-[8px] md:gap-[20px] border-b-[1px] last:border-b-0 border-[#C1C8D0] py-[24px] md:py-[36px]">
                                <div className="sm:col-span-2 animation-effect">
                                    <div className="flex items-center gap-[10px] md:gap-[20px] animation-effect">
                                        <img
                                            src={item.tutorProfileUrl || "/placeholder.svg"}
                                            alt="user"
                                            className="rounded-full w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] block animation-effect object-cover"
                                        />
                                        <div className="flex flex-col gap-[4px] md:gap-[8px] animation-effect">
                                            {/*TODO: ask courses[].rating and courses[].reviewCount to BE*/}
                                            {/*<div className="flex items-center gap-[2px] md:gap-[6px] animation-effect">*/}
                                            {/*    <img*/}
                                            {/*        src="/assets/star-review.svg"*/}
                                            {/*        alt="star"*/}
                                            {/*        className="rounded-full w-[12px] h-[12px] md:w-[18px] md:h-[18px] animation-effect"*/}
                                            {/*    />*/}
                                            {/*    <span*/}
                                            {/*        className="text-[#1D2026] text-[10px] md:text-[14px] font-medium animation-effect">{item.rating}</span>*/}
                                            {/*    <span*/}
                                            {/*        className="text-[#8C94A3] text-[10px] md:text-[14px] font-medium animation-effect">({Number(item.reviewCount).toLocaleString('id-ID')})</span>*/}
                                            {/*</div>*/}
                                            <span
                                                className="text-[10px] lg:text-[16px] animation-effect">{`${item.tutorFirstName} ${item.tutorLastName}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 flex items-center animation-effect">
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex gap-[25px] items-center">
                                            <span
                                                className="text-[#A1A5B3] text-[12px] md:text-[14px] w-[50px] md:w-[70px] animation-effect">Course:</span>
                                            <span
                                                className="text-[##4E5566] text-[12px] md:text-[14px] animation-effect">{item.subjectName}</span>
                                        </div>
                                        <div className="flex gap-[25px] items-center">
                                            <span
                                                className="text-[#A1A5B3] text-[12px] md:text-[14px] w-[50px] md:w-[70px] animation-effect">Sessions:</span>
                                            <span
                                                className="text-[##4E5566] text-[12px] md:text-[14px] animation-effect">{item.sessionCount}</span>
                                        </div>
                                    </div>
                                </div>
                                 {/*TODO: ask courses.price and courses.status in BE*/}
                                {/*<div*/}
                                {/*    className="flex lg:justify-center items-center text-[#E35D33] font-medium text-[14px] md:text-[20px] animation-effect">Rp.{Number(item.price).toLocaleString('id-ID')}</div>*/}
                                <div className={`
                                    flex lg:justify-right items-center font-medium text-[14px] md:text-[20px] animation-effect
                                    ${data.status === 'On Going' ? 'text-[#43B7A0]' : 'text-[#1D2026]'}
                                `}>
                                    {data.status}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}