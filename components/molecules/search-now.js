/*
 * @Author: danteclericuzio
 * @Date: 2025-03-18 15:31:42
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-28 16:03:11
 */

"use client"
import Image from 'next/image';
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchNow({placeholder, buttonSearch, onSearch}) {
    const [value, setValue] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (value.trim()) {
            router.push(`/find-tutor?q=${value}#search`);
            if (onSearch) {
                onSearch(value);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (onSearch) {
            onSearch(newValue);
        }
    };

    return (
        <div className="relative items-center flex md:w-[550px] lg:w-[614px] bg-[#FF723A10] rounded-[40px] border-[1px] border-[#C9C9C9] px-[31px] h-[50px] lg:h-[65px] animation-effect">
            <Image 
              src="/assets/check.svg" 
              alt="Search" 
              width={15}
              height={15}
              className="mr-[8px]"
              priority
            />
            <input
                className="animation-effect text-[14px] md:text-[16px] focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className="hidden md:block absolute right-0 bg-[#E35D33] px-[28px] h-[50px] lg:h-[65px] animation-effect rounded-[40px] text-white cursor-pointer"
                onClick={handleSearch}
            >
                {buttonSearch}
            </button>
        </div>
    )
}