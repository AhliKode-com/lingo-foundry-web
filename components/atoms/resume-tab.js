"use client"

import { useState } from "react"
import Education from "./resume-tab/education"
import Work from "./resume-tab/work"
import Certificate from "./resume-tab/certificate"
import Cv from "./resume-tab/cv"

export function ResumeTabs() {
    const [activeTab, setActiveTab] = useState("education")

    const tabs = [
        { id: "education", label: "Education", component: <Education/> },
        { id: "cv", label: "CV", component: <Cv/> },
        { id: "work", label: "Work experience" , component: <Work/> },
        { id: "certifications", label: "Certifications" , component: <Certificate/> },
    ]

    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.component

    return (
        <div className="">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-[8px] overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap px-[16px] py-[8px] text-[14px] font-semibold animation-effect border-b-2 ${
                                activeTab === tab.id
                                ? "border-[#E35D33]"
                                : "text-[#4D4C5C] border-transparent"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="mt-[25px]">
                {activeTabContent}
            </div>

        </div>
    )
}
