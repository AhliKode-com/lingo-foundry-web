"use client"

import {useState} from "react"
import {ChevronDown, Search} from "./icons"

export default function CourseSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("Latest")
    const [status, setStatus] = useState("All Courses")
    const [teacher, setTeacher] = useState("All Teachers")

    const [openDropdown, setOpenDropdown] = useState(null)

    const toggleDropdown = (dropdown) => {
        if (openDropdown === dropdown) {
            setOpenDropdown(null)
        } else {
            setOpenDropdown(dropdown)
        }
    }

    const sortOptions = ["Latest", "Oldest", "A-Z", "Z-A", "Most Popular"]
    const statusOptions = ["All Courses", "In Progress", "Completed", "Not Started"]
    const teacherOptions = ["All Teachers", "John Doe", "Jane Smith", "Robert Johnson"]

    return (
        <div className="w-full max-w-7xl mx-auto py-5">
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-3 border border-gray-200 rounded-md text-base outline-none focus:border-gray-400"
                        />
                    </div>
                </div>

                {/* Sort By Dropdown */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <div className="relative">
                        <button
                            className="flex items-center justify-between w-full min-w-[180px] h-10 px-3 bg-white border border-gray-200 rounded-md text-base text-left hover:border-gray-400"
                            onClick={() => toggleDropdown("sort")}
                            aria-haspopup="listbox"
                            aria-expanded={openDropdown === "sort"}
                        >
                            {sortBy}
                            <ChevronDown/>
                        </button>
                        {openDropdown === "sort" && (
                            <ul
                                className="absolute top-full left-0 w-full max-h-[200px] mt-1 py-1 bg-white border border-gray-200 rounded-md shadow-md overflow-y-auto z-10"
                                role="listbox"
                            >
                                {sortOptions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => {
                                            setSortBy(option)
                                            setOpenDropdown(null)
                                        }}
                                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${option === sortBy ? "bg-gray-50 font-medium" : ""}`}
                                        role="option"
                                        aria-selected={option === sortBy}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Status Dropdown */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Status:</label>
                    <div className="relative">
                        <button
                            className="flex items-center justify-between w-full min-w-[180px] h-10 px-3 bg-white border border-gray-200 rounded-md text-base text-left hover:border-gray-400"
                            onClick={() => toggleDropdown("status")}
                            aria-haspopup="listbox"
                            aria-expanded={openDropdown === "status"}
                        >
                            {status}
                            <ChevronDown/>
                        </button>
                        {openDropdown === "status" && (
                            <ul
                                className="absolute top-full left-0 w-full max-h-[200px] mt-1 py-1 bg-white border border-gray-200 rounded-md shadow-md overflow-y-auto z-10"
                                role="listbox"
                            >
                                {statusOptions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => {
                                            setStatus(option)
                                            setOpenDropdown(null)
                                        }}
                                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${option === status ? "bg-gray-50 font-medium" : ""}`}
                                        role="option"
                                        aria-selected={option === status}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Teacher Dropdown */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Teacher:</label>
                    <div className="relative">
                        <button
                            className="flex items-center justify-between w-full min-w-[180px] h-10 px-3 bg-white border border-gray-200 rounded-md text-base text-left hover:border-gray-400"
                            onClick={() => toggleDropdown("teacher")}
                            aria-haspopup="listbox"
                            aria-expanded={openDropdown === "teacher"}
                        >
                            {teacher}
                            <ChevronDown/>
                        </button>
                        {openDropdown === "teacher" && (
                            <ul
                                className="absolute top-full left-0 w-full max-h-[200px] mt-1 py-1 bg-white border border-gray-200 rounded-md shadow-md overflow-y-auto z-10"
                                role="listbox"
                            >
                                {teacherOptions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => {
                                            setTeacher(option)
                                            setOpenDropdown(null)
                                        }}
                                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${option === teacher ? "bg-gray-50 font-medium" : ""}`}
                                        role="option"
                                        aria-selected={option === teacher}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

