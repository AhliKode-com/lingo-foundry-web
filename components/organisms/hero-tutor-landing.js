"use client"
import { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { TutorButton } from "@/components/atoms/buttons";
import Link from "next/link";
import { getTutorSubjects } from "@/apis/getTutorSubjects";

export default function Hero() {
    const { data: tutorSubjects = [], loading } = getTutorSubjects();

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [hoursPerWeek, setHoursPerWeek] = useState(10); // Default to 10 hours
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [showHoursDropdown, setShowHoursDropdown] = useState(false);
    const [potentialIncome, setPotentialIncome] = useState(0);

    const hourOptions = [5, 10, 15, 20, 25, 30];

    // Calculate potential income whenever subject or hours change
    useEffect(() => {
        if (selectedSubject) {
            // Calculate monthly income (4 weeks in a month)
            const monthlyIncome = selectedSubject.averagePrice * hoursPerWeek * 4;
            setPotentialIncome(monthlyIncome);
        }
    }, [selectedSubject, hoursPerWeek]);

    // Set default selected subject when data is loaded
    useEffect(() => {
        if (tutorSubjects.length > 0 && !selectedSubject) {
            setSelectedSubject(tutorSubjects[0]);
        }
    }, [tutorSubjects]);

    // Format the currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="relative lg:h-screen pt-[68px] sm:pt-[100.61px] pb-[100px] sm:pb-[150px] animation-effect z-30">
            <div
                className="absolute inset-0 bg-cover bg-center w-full mt-[100px]"
                style={{ backgroundImage: "url('/assets/hero-tutor-landing.png')" }}
            />

            <div className="gap-[20px] mt-[70px] relative w-full flex flex-col lg:flex-row items-center lingo-container h-full">
                <h1 className="
                    lg:w-1/2
                    z-10 font-bold text-white
                    text-[32px] lg:text-[40px] xl:text-[56px]
                    lg:leading-[60px] xl:leading-[84px] mt-[70px] drop-shadow-2xl
                    animation-effect"
                >
                    Plan Online Lessons from Home – Be Your Own Boss! Tutor With Lingo Foundry
                </h1>
                <div className="animation-effect w-full lg:w-1/2 bg-[#FFFFFF] rounded-[20px] p-[20px] sm:p-[36px] flex flex-col shadow-lg drop-shadow-xl">
                    <h1 className="animation-effect text-[22px] md:text-[30px] font-bold mb-[20px] md:mb-[36px]">Estimate your potential earnings</h1>

                    {/* Subject Dropdown */}
                    <div className="relative mb-[16px]">
                        <button
                            className="animation-effect px-[18px] py-[12px] border-[1px] border-[#DDDFE1] w-full flex justify-between items-center"
                            onClick={() => {
                                setShowSubjectDropdown(!showSubjectDropdown);
                                setShowHoursDropdown(false);
                            }}
                        >
                            <span className="text-[18px] font-medium text-[#6A6A6A]">
                                {selectedSubject ? selectedSubject.subject : 'Select a subject'}
                            </span>
                            <IoIosArrowDown className={`text-[#6A6A6A] text-[18px] transition-transform ${showSubjectDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showSubjectDropdown && (
                            <div className="absolute z-20 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg">
                                {tutorSubjects.map((subject, index) => (
                                    <div
                                        key={index}
                                        className="px-[18px] py-[12px] hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedSubject(subject);
                                            setShowSubjectDropdown(false);
                                        }}
                                    >
                                        <span className="text-[16px]">{subject.subject}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Hours Dropdown */}
                    <div className="relative mb-[20px] md:mb-[50px]">
                        <button
                            className="animation-effect px-[18px] py-[12px] border-[1px] border-[#DDDFE1] w-full flex justify-between items-center"
                            onClick={() => {
                                setShowHoursDropdown(!showHoursDropdown);
                                setShowSubjectDropdown(false);
                            }}
                        >
                            <span className="text-[18px] font-medium text-[#6A6A6A]">{hoursPerWeek} hours per week</span>
                            <IoIosArrowDown className={`text-[#6A6A6A] text-[18px] transition-transform ${showHoursDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showHoursDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg">
                                {hourOptions.map((hours) => (
                                    <div
                                        key={hours}
                                        className="px-[18px] py-[12px] hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setHoursPerWeek(hours);
                                            setShowHoursDropdown(false);
                                        }}
                                    >
                                        <span className="text-[16px]">{hours} hours per week</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <h1 className="animation-effect text-[14px] md:text-[18px]">Potential monthly income</h1>
                    <div className="animation-effect flex items-center mb-[20px] sm:mb-[36px]">
                        <h1 className="text-[26px] md:text-[36px] font-bold">{formatCurrency(potentialIncome)}/</h1>
                        <h1 className="text-[16px] md:text-[24px] font-medium mt-auto">Month</h1>
                    </div>

                    <Link href="/tutor-register">
                        <TutorButton text="Apply Now" custom="w-full" />
                    </Link>
                </div>
            </div>
        </div>
    );
}