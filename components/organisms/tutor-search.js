"use client"

import {useEffect, useState} from "react"
import {ChevronDown, Search} from "./dashboard/courses/icons"
import {useSearchParams} from "next/navigation";
import {getPopularTutors} from "@/api/getPopularTutors";

export default function TutorSearch({setQuery, query}) {
    const [searchQuery, setSearchQuery] = useState("")

    const searchParams = useSearchParams()

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

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
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-md text-base outline-none focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

