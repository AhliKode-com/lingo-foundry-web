/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 14:40:42
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-18 21:22:01
 */

"use client"
import { useState } from "react";

export default function Shorts({data}) {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        setIsPlaying(true);
    };

    return (
        <div 
            className="flex flex-col relative w-[159px] shrink-0"
            onClick={handleClick}
        >
            <div className="max-w-[138px] text-[10px] text-[#F32C1F] p-[8px] bg-red-100 w-fit rounded-[4px] absolute top-[10px] left-[10px]">{data.videoName}</div>
            {isPlaying ? (
                <video 
                    src={data.videoUrl} 
                    controls 
                    autoPlay 
                    className="h-[262px] w-[159px] rounded-[12px] mb-[14px]"
                />
            ) : (
                <img 
                    src={data.thumbnailUrl} 
                    alt='men' 
                    className="h-[262px] w-[159px] rounded-[12px] mb-[14px]"
                />
            )}
            <span className="text-[13px] font-bold">{data.videoDescription}</span>
        </div>
    )
}