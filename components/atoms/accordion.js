/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:13:24
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-11-10 14:09:17
 */
"use client"
import React, {useState, useRef, useEffect} from "react";
import {FiChevronDown} from "react-icons/fi";
import {GoArrowUp} from "react-icons/go";
import {useRouter} from "next/navigation";
import {useStudentOrder} from "@/apis/studentOrder";
import {toast} from "react-toastify";

export function Speciality({data, isLast}) {
    // const [open, setOpen] = useState(defaultOpen);
    // const [height, setHeight] = useState(0);
    // const contentRef = useRef(null);

    // useEffect(() => {
    //     if (contentRef.current) {
    //         if (open) {
    //             setHeight(contentRef.current.scrollHeight);
    //         } else {
    //             setHeight(0);
    //         }
    //     }
    // }, [open, desc]);

    return (
        <div className="w-full gap-0">
            <button
                // onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex 
                    w-full 
                    items-center 
                    justify-between
                    py-[10px] px-[12px] md:py-[20px]
                    gap-[5px]
                    ${!isLast ? "border-b-[2px] border-[#E9EAF0]" : ""}
                    animation-effect`}
            >
                <span
                    className={`
                        text-left font-medium
                        animation-effect
                        text-[14px] sm:text-[16px]
                    `}
                >
                    {data}
                </span>

                {/* <div>
                    <FiChevronDown
                        className={`
                            text-[18px] sm:text-[24px]
                            animation-effect
                            duration-300
                            ${open ? "rotate-180" : "rotate-0"}
                        `}
                    />
                </div> */}
            </button>

            {/* <div
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
            </div> */}
        </div>
    );
}

// Helper function to format answer text with links and lists
function formatAnswer(text) {
    if (!text) return null;
    
    // Split by line breaks or steps
    const parts = text.split(/(?:Step \d+[:\s—]+|^\d+\.\s+)/gm);
    const stepMatches = text.match(/Step \d+[:\s—]+|\d+\.\s+/g);
    
    // Check if content has steps
    const hasSteps = stepMatches && stepMatches.length > 0;
    
    if (hasSteps) {
        return (
            <ol className="list-decimal list-inside space-y-3">
                {parts.slice(1).map((part, index) => {
                    const lines = part.trim().split('\n');
                    const mainText = [];
                    const subItems = [];
                    
                    lines.forEach((line) => {
                        if (line.trim().startsWith('-')) {
                            subItems.push(line.trim().substring(1).trim());
                        } else if (line.trim()) {
                            mainText.push(line.trim());
                        }
                    });
                    
                    return (
                        <li key={index} className="text-[#4E5566] leading-relaxed">
                            <div>
                                {mainText.map((line, i) => (
                                    <div key={i}>{formatTextWithLinks(line)}</div>
                                ))}
                                {subItems.length > 0 && (
                                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                        {subItems.map((item, i) => (
                                            <li key={i} className="text-[#4E5566]">
                                                {formatTextWithLinks(item)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>
        );
    }
    
    // Check for simple numbered list (1. 2. 3.)
    const simpleList = text.match(/^\d+\.\s+.+$/gm);
    if (simpleList && simpleList.length > 1) {
        return (
            <ol className="list-decimal list-inside space-y-2">
                {simpleList.map((item, index) => (
                    <li key={index} className="text-[#4E5566] leading-relaxed">
                        {formatTextWithLinks(item.replace(/^\d+\.\s+/, ''))}
                    </li>
                ))}
            </ol>
        );
    }
    
    // Regular text with potential links
    return <div className="space-y-2">{formatTextWithLinks(text)}</div>;
}

// Helper to convert URLs and email to clickable links
function formatTextWithLinks(text) {
    if (!text) return null;
    
    // Pattern to match URLs, emails, and phone numbers
    const urlPattern = /(https?:\/\/[^\s,]+|wa\.me\/[^\s,]+|www\.[^\s,]+|\S+@\S+\.\S+|@\w+|\+?\d{1,3}[\s-]?\d{3,4}[\s-]?\d{3,4}[\s-]?\d{3,4})/g;
    
    const parts = text.split(urlPattern);
    const matches = text.match(urlPattern) || [];
    
    return parts.map((part, index) => {
        if (matches.includes(part)) {
            // Email
            if (part.includes('@') && part.includes('.')) {
                return (
                    <a 
                        key={index}
                        href={`mailto:${part}`}
                        className="text-[#E15C31] hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            // Instagram handle
            if (part.startsWith('@')) {
                return (
                    <a 
                        key={index}
                        href={`https://instagram.com/${part.substring(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E15C31] hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            // WhatsApp
            if (part.includes('wa.me') || part.startsWith('+')) {
                const number = part.replace(/[^\d]/g, '');
                return (
                    <a 
                        key={index}
                        href={`https://wa.me/${number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E15C31] hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            // Regular URL
            const href = part.startsWith('http') ? part : `https://${part}`;
            return (
                <a 
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E15C31] hover:underline font-medium"
                    onClick={(e) => e.stopPropagation()}
                >
                    {part}
                </a>
            );
        }
        return <span key={index}>{part}</span>;
    });
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
                className="
                    bg-[#FFFFFF]
                    flex 
                    w-full 
                    items-center 
                    justify-between
                    py-[20px] px-[24px] md:py-[24px] md:px-[32px] 
                    cursor-pointer
                    gap-[16px]
                    hover:bg-[#F7F7F7]
                    transition-all
                    duration-200
                "
            >
                <span
                    className="
                        text-left font-medium
                        text-[16px] md:text-[18px]
                        text-[#3C3C3C]
                    "
                >
                    {title}
                </span>

                <div className="flex-shrink-0">
                    <FiChevronDown
                        className={`
                            text-[20px] md:text-[24px]
                            text-[#AFAFAF]
                            transition-transform
                            duration-300
                            ${open ? "rotate-180" : "rotate-0"}
                        `}
                    />
                </div>
            </button>

            <div
                className="
                    text-[14px] md:text-[16px]
                    overflow-hidden
                    transition-all
                    duration-300
                    text-[#4E5566]
                    bg-[#FAFAFA]
                "
                style={{
                    height: height
                }}
            >
                <div
                    ref={contentRef}
                    className="py-[24px] px-[24px] md:px-[32px] leading-relaxed"
                >
                    {formatAnswer(answer)}
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

export function PurchaseHistory({data, defaultOpen = false, onRefetch}) {
    const [open, setOpen] = useState(defaultOpen);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);
    const {payOrder, cancelOrder} = useStudentOrder();

    const router = useRouter()

    const handleCancel = async () => {
        const payload = {
            orderId: data.orderId,
        }
        toast.loading("Cancelling your order...")
        await cancelOrder(payload)
        toast.dismiss()
        toast.success("Order cancelled")
        toast.dismiss()
        onRefetch?.();
    }

    const createdAt = formatDateString(data?.transactions[0]?.createdAt);
    const totalAmount = data?.transactions[0]?.orderAmount || 0;

    const handlePay = async () => {
        const payload = {
            orderId: data.orderId,
        }
        toast.loading("Making your payment...")
        const response = await payOrder(payload)
        toast.dismiss()
        if (response) {
            window.open(response.invoiceUrl, "_blank")
        }
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
                            className="flex animation-effect text-[12px] md:text-[14px] text-[#4E5566]"
                        >
                            Rp.{Number(totalAmount).toLocaleString('id-ID')}
                        </span>
                    </div>
                    <div className={`
                                        flex lg:justify-right items-center font-medium text-[14px] md:text-[20px] animation-effect
                                        ${data.status === 'PAID' ? 'text-[#43B7A0]' : 'text-[#1D2026]'}
                                    `}>
                        {data.status}
                    </div>
                </div>

                <div className="flex items-center gap-[15px]">
                    {data.status !== 'PAID' && (
                        <>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancel();
                                }}
                                className="flex items-center justify-center bg-white border border-[#E35D33] text-[#E35D33] px-4 py-2 cursor-pointer text-[14px] md:text-[16px] animation-effect h-[38px] md:h-[48px]"
                            >
                                Cancel
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePay();
                                }}
                                className="flex items-center justify-center bg-[#E35D33] text-white px-4 py-2 cursor-pointer text-[14px] md:text-[16px] animation-effect h-[38px] md:h-[48px]"
                            >
                                Pay
                            </div>
                        </>
                    )}
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
                                 className="animation-effect grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-6 gap-[8px] md:gap-[20px] border-b-[1px] last:border-b-0 border-[#C1C8D0] py-[24px] md:py-[36px] items-center">
                                <div className="sm:col-span-2 animation-effect">
                                    <div className="flex items-center gap-[10px] md:gap-[20px] animation-effect">
                                        <img
                                            src={item.tutorProfileUrl || "/placeholder.svg"}
                                            alt="user"
                                            className="rounded-full w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] block animation-effect object-cover"
                                        />
                                        <div className="flex flex-col gap-[4px] md:gap-[8px] animation-effect">
                                            <span
                                                className="text-[10px] lg:text-[16px] animation-effect">{`${item.tutorFirstName} ${item.tutorLastName}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center animation-effect">
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
                                <div className="sm:col-span-2 flex items-center animation-effect">
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex gap-[25px] items-center">
                                            <span
                                                className="text-[#A1A5B3] text-[12px] md:text-[14px] animation-effect">Remaining Session:</span>
                                            <span
                                                className="text-[##4E5566] text-[12px] md:text-[14px] animation-effect">{item.remainingSession}</span>
                                        </div>
                                        {/* <div className="flex gap-[25px] items-center">
                                            <span
                                                className="text-[#A1A5B3] text-[12px] md:text-[14px] w-[50px] md:w-[70px] animation-effect">Sessions:</span>
                                            <span
                                                className="text-[##4E5566] text-[12px] md:text-[14px] animation-effect">{item.sessionCount}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <button
                                    className={`${
                                        data.status === 'PAID'
                                          ? item.remainingSession === 0
                                            ? 'bg-gray-400'
                                            : 'bg-[#E35D33] cursor-pointer'
                                          : 'cursor-not-allowed bg-gray-400 animate-pulse'
                                        } flex h-[38px] md:h-[48px] justify-center items-center text-white p-4 font-medium text-[14px] md:text-[16px] animation-effect whitespace-nowrap w-full`
                                    }
                                    onClick={() => {
                                        if (data.status === 'PAID' && item.remainingSession !== 0) {
                                          router.push(`/book-class/${item.orderItemId}`)
                                        }
                                    }}
                                >
                                    {item.remainingSession === 0 ? 'Booked' : data.status === 'PAID' ? 'Set your schedule' : 'Pending payment'}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}