"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { StudentCard } from '@/components/atoms/card';
import { StudentSearch } from "@/components/organisms/search";
import { getLandingSubjects } from "@/apis/getLandingSubjects";

export default function MyStudents() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const [activeTab, setActiveTab] = useState("current");
    const tabs = [
        { id: "current", label: "Current Students", count: 241 },
        { id: "archived", label: "Archived Students", count: 41 },
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

    const { data: subjects, loading } = getLandingSubjects();
    const [selectedSubject, setSelectedSubject] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState(null);

    //   contoh payload
    console.log("search student", [selectedSubject,debouncedQuery]);

    // contoh data card
    const studentsData = [
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'TOT Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'ad Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'vvv Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'asdasd Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
    ];

    const studentsData2 = [
        {img: '/assets/women-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Advis Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-2.png', name: 'Wade Dante', skill: 'Digital Product Designer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'TOT Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'ad Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'vvv Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
        {img: '/assets/tutor-dashboard/student-1.png', name: 'asdasd Tasyah', skill: 'Senior Developer', subject: 'English for Business'},
    ];

    const studentsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);

    const totalPages = Math.ceil(studentsData.length / studentsPerPage);
    const totalPages2 = Math.ceil(studentsData2.length / studentsPerPage);

    const currentStudents = studentsData.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
    );

    const currentStudents2 = studentsData2.slice(
        (currentPage2 - 1) * studentsPerPage,
        currentPage2 * studentsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
        setCurrentPage2(1);
    }, [debouncedQuery, selectedSubject]);

    useEffect(() => {
        setCurrentPage(1);
        setCurrentPage2(1);
    }, [activeTab]);

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
                                className="min-w-[300px] w-full  flex items-center h-10 px-[18px] border border-gray-200 rounded-md text-base outline-none focus:border-[#E15C31] focus:ring-1 focus:ring-[#E15C31] animation-effect"
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
                {activeTab === "current" && (
                    <div className="flex flex-col">
                        {/* list student */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
                            {currentStudents.map((student, index) => (                      
                                <StudentCard data={student} key={index}/>
                            ))}
                        </div>
                        {/* pagination */}
                        <div className="flex justify-center items-center gap-4 my-[60px]">
                            {/* Prev Button */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center animation-effect ${
                                currentPage === 1 ? "bg-[#FFF3EF] opacity-50 cursor-not-allowed" : "bg-[#FFF3EF] hover:opacity-80"
                                }`}
                            >
                                <FaArrowLeft className="text-[#E35D33]"/>
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium animation-effect ${
                                    currentPage === pageNum
                                    ? "bg-[#E15C31] text-white"
                                    : "text-black hover:bg-[#FFF3EF] hover:text-[#E35D33]"
                                }`}
                                >
                                {String(pageNum).padStart(2, "0")}
                                </button>
                            ))}

                            {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center animation-effect ${
                                    currentPage === totalPages ? "bg-[#FFF3EF] opacity-50 cursor-not-allowed" : "bg-[#FFF3EF] hover:opacity-80"
                                    }`}
                                >
                                    <FaArrowRight className="text-[#E35D33]"/>
                                </button>
                            </div>
                    </div>
                )}

                {activeTab === "archived" && (
                    <div className="flex flex-col">
                        {/* list student */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
                            {currentStudents2.map((student, index) => (                      
                                <StudentCard data={student} key={index}/>
                            ))}
                        </div>
                        {/* pagination */}
                        <div className="flex justify-center items-center gap-4 my-[60px]">
                            {/* Prev Button */}
                            <button
                                onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage2 === 1}
                                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center animation-effect ${
                                    currentPage2 === 1 ? "bg-[#FFF3EF] opacity-50 cursor-not-allowed" : "bg-[#FFF3EF] hover:opacity-80"
                                }`}
                            >
                                <FaArrowLeft className="text-[#E35D33]"/>
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                key={pageNum}
                                onClick={() => setCurrentPage2(pageNum)}
                                className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium animation-effect ${
                                    currentPage2 === pageNum
                                    ? "bg-[#E15C31] text-white"
                                    : "text-black hover:bg-[#FFF3EF] hover:text-[#E35D33]"
                                }`}
                                >
                                {String(pageNum).padStart(2, "0")}
                                </button>
                            ))}

                            {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage2((prev) => Math.min(prev + 1, totalPages2))}
                                    disabled={currentPage2 === totalPages2}
                                    className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center animation-effect ${
                                        currentPage2 === totalPages2 ? "bg-[#FFF3EF] opacity-50 cursor-not-allowed" : "bg-[#FFF3EF] hover:opacity-80"
                                    }`}
                                >
                                    <FaArrowRight className="text-[#E35D33]"/>
                                </button>
                            </div>
                    </div>
                )}
            </div>
        </div>
    );
}
