"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { StudentCard } from '@/components/atoms/card';
import Pagination from '@/components/atoms/pagination';
import { StudentSearch } from "@/components/organisms/search";
import { getLandingSubjects } from "@/apis/getLandingSubjects";
import { getTutorStudents } from "@/apis/getTutorStudents";

export default function MyStudents() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const [activeTab, setActiveTab] = useState("current");
    const { data: studentsData, loading, error } = getTutorStudents();

    const handleSendMessage = (studentId) => {
        router.push(`/tutor-dashboard/message?userId=${studentId}`);
    };

    const tabs = [
        { 
            id: "current", 
            label: "Current Students", 
            count: studentsData?.activeStudentProfiles?.length || 0 
        },
        { 
            id: "archived", 
            label: "Archived Students", 
            count: studentsData?.completedStudentsProfiles?.length || 0 
        },
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const searchQ = searchParams.get("q") || "";
        const timeout = setTimeout(() => {
            setQuery(searchQ);
            setDebouncedQuery(searchQ);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchParams.get("q")]);

    const { data: subjects, loading: subjectsLoading } = getLandingSubjects();
    const [selectedSubject, setSelectedSubject] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(null);

    const studentsPerPage = 8;
    const activeData = activeTab === "current" 
        ? studentsData?.activeStudentProfiles || []
        : studentsData?.completedStudentsProfiles || [];
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedQuery, selectedSubject, activeTab]);

    // Filter students based on search query and selected subject
    const filteredStudents = activeData.filter(student => {
        const fullName = `${student.firstName || ''} ${student.lastName || ''}`.toLowerCase();
        const matchesSearch = fullName.includes(debouncedQuery.toLowerCase()) || 
                            student.username.toLowerCase().includes(debouncedQuery.toLowerCase());
        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const currentStudents = filteredStudents.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
    );

    if (error) {
        return <div className="text-red-500">Error loading students data: {error}</div>;
    }

    return (
        <div className="lingo-container flex flex-col mb-[72px]">
            {/* Tabs */}
            <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row gap-[36px] relative">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`cursor-pointer w-fit relative pb-2 text-[18px] font-semibold transition-colors duration-300 ${
                                activeTab === tab.id ? "text-black" : "text-gray-400"
                            }`}
                        >
                            {tab.label} <span className="font-normal">({tab.count})</span>
                            <div
                                className={`absolute left-0 bottom-0 h-[4px] bg-[#E15C31] rounded-full transition-all duration-300 ${
                                    activeTab === tab.id ? "w-full" : "w-0"
                                }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="flex md:flex-row flex-col items-center md:gap-[24px]">
                    <StudentSearch setQuery={setQuery} query={query} />
                    <div className="relative w-full gap-2 flex flex-col">
                        <label htmlFor="search" className="text-sm text-gray-600">
                            Courses:
                        </label>
                        <div>
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(dropdownOpen === "subject" ? null : "subject")}
                                className="min-w-[300px] w-full flex items-center h-10 px-[18px] border border-gray-200 rounded-md text-base outline-none focus:border-[#E15C31] focus:ring-1 focus:ring-[#E15C31] animation-effect"
                            >
                                <span className="text-left flex-1">
                                    {selectedSubject || "Select subject..."}
                                </span>
                                <IoIosArrowDown />
                            </button>
                            {dropdownOpen === "subject" && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                    {subjects && subjects.length > 0 && subjects.map((subject, index) => (
                                        <div
                                            key={index}
                                            className="px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer animation-effect"
                                            onClick={() => {
                                                setSelectedSubject(subject.name);
                                                setDropdownOpen(null);
                                            }}
                                        >
                                            <span className="text-[16px]">{subject.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-[35px] animation-effect">
                <div className="flex flex-col">
                    {/* student cards */}
                    <div id="student-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
                        {loading ? (
                            // Add skeleton loading state here if needed
                            <div>Loading...</div>
                        ) : (
                            currentStudents.map((student, index) => (
                                <StudentCard 
                                    key={index} 
                                    data={{
                                        img: student.photoProfileUrl || '/placeholder.svg',
                                        name: `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.username,
                                        skill: 'Student',
                                        subject: 'English for Business'
                                    }}
                                    onSendMessage={() => handleSendMessage(student.id)}
                                />
                            ))
                        )}
                    </div>

                    {/* pagination */}
                    {!loading && totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            onPageChange={() => {
                                const grid = document.getElementById("student-grid");
                                if (grid) {
                                    const yOffset = -300;
                                    const y = grid.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: "smooth" });
                                }
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
