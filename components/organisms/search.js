"use client"

import {Search} from "./dashboard/courses/icons"
import { useRouter } from "next/navigation";

export function TutorSearch({setQuery, query}) {
    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        router.push(`/find-tutor?q=${value}#search`);
    };
    return (
        <div className="w-full max-w-3xl mx-auto py-5">
            <div className="flex flex-wrap gap-4 items-start">
                {/* Search Field */}
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <label htmlFor="search" className="text-sm text-gray-600">
                        Search:
                    </label>
                    <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-500">
                            <Search/>
                        </div>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search in your courses..."
                            value={query}
                            onChange={handleChange}
                            className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-md text-base outline-none focus:border-[#E15C31] focus:ring-1 focus:ring-[#E15C31] animation-effect"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function StudentSearch({setQuery, query}) {
    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        router.push(`/tutor-dashboard/my-students?q=${value}`);
    };
    return (
        <div className="w-full max-w-3xl py-5">
            <div className="flex flex-wrap gap-4 items-start">
                {/* Search Field */}
                <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                    <label htmlFor="search" className="text-sm text-gray-600">
                        Search:
                    </label>
                    <div className="relative flex items-center">
                        <div className="absolute left-3 text-gray-500">
                            <Search/>
                        </div>
                        <input
                            type="text"
                            placeholder="Search in your students..."
                            value={query}
                            onChange={handleChange}
                            className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-md text-base outline-none focus:border-[#E15C31] focus:ring-1 focus:ring-[#E15C31] animation-effect"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

