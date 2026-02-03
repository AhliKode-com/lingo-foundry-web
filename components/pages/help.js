/*
 * @Author: danteclericuzio
 * @Date: 2026-02-03 00:00:00
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2026-02-03 00:00:00
 */

"use client";

import { useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import { MdOutlineSchool, MdOutlineMessage, MdOutlineCalendarMonth, MdOutlineNotifications, MdOutlinePayment, MdOutlineSupport, MdOutlinePerson } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import Link from "next/link";

// FAQ Data organized by category
const FAQ_CATEGORIES = [
    {
        id: "getting-started",
        title: "Getting Started",
        icon: MdOutlineSchool,
        description: "Learn how to sign up and navigate the platform",
        items: [
            {
                question: "How to Sign Up on Lingo Foundry?",
                answer: [
                    "Go to Lingo Foundry website, https://lingofoundry.com",
                    "Find the Sign Up button at the top right corner of the homepage",
                    "Fill in your Email Address and Password in the fields provided",
                    "Submit and your account will be successfully created"
                ]
            },
            {
                question: "How can I reset my password?",
                answer: [
                    "Click 'Forgot Password' on the login page",
                    "Enter your registered email when you signed up",
                    "Check your email for the OTP code",
                    "Enter the OTP and create a new password",
                    "Click Recover Your Account and your password will be successfully reset"
                ]
            },
            {
                question: "Where do I find my course?",
                answer: [
                    "Open Your Profile Menu — After you have successfully signed up and logged in, click the profile menu located on the right side of the page.",
                    "Select 'Student Dashboard' — From the dropdown menu, choose Student Dashboard to access your learning overview.",
                    "View Your Course List — Inside the dashboard, you will be able to see your Enrolled Courses, Active Courses, Completed Courses, and Total Learning Hours."
                ]
            },
            {
                question: "How to find a tutor & view tutor profile?",
                answer: [
                    "Log in to your account",
                    "Go to the Home Page",
                    "Click Find Tutor",
                    "Click the tutor's name",
                    "Scroll down to see the tutor's profile and resume"
                ]
            }
        ]
    },
    {
        id: "contacting-tutor",
        title: "Contacting Your Tutor",
        icon: MdOutlineMessage,
        description: "How to communicate with tutors before and after booking",
        items: [
            {
                question: "How to contact the tutors before purchasing the lesson?",
                answer: ["Click the tutor profile, find 'send message' and click the button. You could contact the tutor directly and ask about the class program and most available time to start."]
            },
            {
                question: "How can I contact my tutor if I have any questions related to the lesson?",
                answer: ["Click 'Student Dashboard' and find 'Message.' You can contact your tutor directly through the message box available on the platform."]
            },
            {
                question: "Who should I contact if I can't attend my lesson?",
                answer: ["Try to contact your tutor first through the message box. If the tutor cannot be reached, please contact the admin or the official WhatsApp number at +62 858-9003-8796"]
            },
            {
                question: "Is there a group chat for communication?",
                answer: ["For private (1-on-1) lessons, communication can be done through the message box on the website. All lessons are conducted online, and communication is handled through the inbox chat on the website."]
            }
        ]
    },
    {
        id: "scheduling",
        title: "Class Scheduling",
        icon: MdOutlineCalendarMonth,
        description: "Schedule, reschedule, and manage your lessons",
        items: [
            {
                question: "How to schedule the lesson?",
                answer: ["After payment, schedule the lesson directly based on the available time of the tutors. Students could reschedule the class up to 12 hours prior to the lesson start time."]
            },
            {
                question: "How can I reschedule my lesson if I can't attend?",
                answer: ["Students are allowed to reschedule lessons up to 12 hours prior to the scheduled time. If a student cannot attend the scheduled lesson, the student should contact the tutor immediately, or the lesson will be marked as completed."]
            },
            {
                question: "How to Change or Set Your Class Schedule?",
                answer: [
                    "Go to Your Profile — After signing in or completing your purchase, navigate to your Profile page.",
                    "Open Purchase History — From the dashboard menu, click Purchase History.",
                    "Select Your Course — Find the course you have purchased, then click Set Your Schedule.",
                    "Choose Your Date and Time — You will be redirected to the scheduling page. Select your preferred date and time from the available time slots.",
                    "Confirm Your Booking — Once you have chosen your preferred time, click Book This Class to confirm your schedule."
                ]
            }
        ]
    },
    {
        id: "reminders",
        title: "Class Reminders",
        icon: MdOutlineNotifications,
        description: "Get notified about your upcoming lessons",
        items: [
            {
                question: "Will I receive a link or reminder before the lesson starts?",
                answer: ["The scheduled lesson link will be sent to your registered email."]
            },
            {
                question: "Will I receive a reminder before my lesson starts?",
                answer: ["The reminder link will be sent to your registered email address prior to the lesson start time. Check your email and log in to the website."]
            },
            {
                question: "What should I do if I miss a lesson?",
                answer: ["All lessons won't be refunded. If students did not reschedule within 12 hours before the lesson started and did not attend the lesson, the lesson will be marked as completed."]
            }
        ]
    },
    {
        id: "course-content",
        title: "Course Content",
        icon: HiOutlineAcademicCap,
        description: "Access materials and customize your learning",
        items: [
            {
                question: "Can I access the lesson materials after the session?",
                answer: ["Yes, students could discuss with the tutors to access the lesson materials."]
            },
            {
                question: "Can I request specific topics to be covered in my lessons?",
                answer: ["Yes! You can discuss your preferred topics with your tutor at the beginning of your sessions."]
            },
            {
                question: "Are there assessments or tests given during the course?",
                answer: ["Assessments vary by tutors. Please check with your tutors for specific details."]
            }
        ]
    },
    {
        id: "payment",
        title: "Payment & Refunds",
        icon: MdOutlinePayment,
        description: "Payment methods and refund policies",
        items: [
            {
                question: "What payment methods are accepted?",
                answer: ["We accept various payment methods. Please check the payment section on the website for details."]
            },
            {
                question: "How will I know if I'm making progress in my lessons?",
                answer: ["Tutors generally provide feedback at the end of each session. Additionally, you can ask for periodic assessments to track your progress."]
            },
            {
                question: "How to provide feedback about my tutor?",
                answer: [
                    "Click 'Student Dashboard'",
                    "Scroll down to find 'Complete Course'",
                    "Before downloading the certificate, provide feedback for the course and the tutor"
                ]
            }
        ]
    },
    {
        id: "account",
        title: "Account Settings",
        icon: MdOutlinePerson,
        description: "Manage your profile and preferences",
        items: [
            {
                question: "How do I update my profile information?",
                answer: [
                    "Open Your Profile Settings — Click your profile icon at the top right of the website and select Settings.",
                    "Update Your Details — You will see your account information along with fields where you can edit your personal data.",
                    "Save Your Changes — After updating your information, click Save Changes to apply the updates.",
                    "Confirm the Update — If the update is successful, a notification will appear saying 'Data changed successfully.'"
                ]
            }
        ]
    },
    {
        id: "support",
        title: "Support",
        icon: MdOutlineSupport,
        description: "Get help from our support team",
        items: [
            {
                question: "How do I contact support?",
                answer: [
                    "Scroll to the Bottom of the Website — Go to the bottom of the page and locate the Contact Us button.",
                    "Click the Email Address — Select admin@lingofoundry.com to automatically open an email message, or type your own message manually using the same address.",
                    "Reach Us Through Other Channels — You can also contact us via Instagram: @lingofoundry or WhatsApp: +62 858-9003-8796"
                ]
            }
        ]
    }
];

// FAQ Item Component
function FAQItem({ question, answer, isExpanded, onToggle }) {
    return (
        <div className="border-b border-[#E5E5E5] last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 px-1 text-left hover:bg-[#FAFAFA] transition-colors duration-200"
            >
                <span className="text-[16px] md:text-[17px] text-[#3C3C3C] font-medium pr-4">
                    {question}
                </span>
                <FiChevronRight 
                    className={`text-[20px] text-[#AFAFAF] flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                />
            </button>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-1 pb-5">
                    {answer.length === 1 ? (
                        <p className="text-[15px] text-[#666666] leading-relaxed">
                            {answer[0]}
                        </p>
                    ) : (
                        <ol className="list-decimal list-outside ml-5 space-y-2">
                            {answer.map((step, index) => (
                                <li key={index} className="text-[15px] text-[#666666] leading-relaxed pl-1">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}

// Category Card Component
function CategoryCard({ category, isActive, onClick }) {
    const Icon = category.icon;
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-5 rounded-xl transition-all duration-200 border-2 ${
                isActive 
                    ? 'border-[#E15C31] bg-[#FFF8F5]' 
                    : 'border-[#E5E5E5] bg-white hover:border-[#E15C31] hover:bg-[#FFF8F5]'
            }`}
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${isActive ? 'bg-[#E15C31]' : 'bg-[#F5F5F5]'}`}>
                    <Icon className={`text-[24px] ${isActive ? 'text-white' : 'text-[#666666]'}`} />
                </div>
                <div className="flex-1">
                    <h3 className={`text-[16px] font-semibold mb-1 ${isActive ? 'text-[#E15C31]' : 'text-[#3C3C3C]'}`}>
                        {category.title}
                    </h3>
                    <p className="text-[14px] text-[#888888]">
                        {category.description}
                    </p>
                </div>
            </div>
        </button>
    );
}

export default function HelpPage() {
    const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const activeCategoryData = FAQ_CATEGORIES.find(cat => cat.id === activeCategory);

    // Filter questions based on search
    const filteredCategories = searchQuery 
        ? FAQ_CATEGORIES.map(cat => ({
            ...cat,
            items: cat.items.filter(item => 
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        })).filter(cat => cat.items.length > 0)
        : null;

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header Section */}
            <div className="bg-gradient-to-b from-[#FFF8F5] to-[#FAFAFA] pt-[140px] md:pt-[180px] pb-[60px]">
                <div className="lingo-container">
                    <div className="text-center max-w-[700px] mx-auto">
                        <h1 className="text-[36px] md:text-[48px] font-bold text-[#3C3C3C] mb-4">
                            Help Center
                        </h1>
                        <p className="text-[16px] md:text-[18px] text-[#666666] mb-8">
                            Find answers to frequently asked questions about Lingo Foundry
                        </p>
                        
                        {/* Search Bar */}
                        <div className="relative max-w-[500px] mx-auto">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#AFAFAF]" />
                            <input
                                type="text"
                                placeholder="Search for help..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-4 pl-12 pr-4 rounded-xl border-2 border-[#E5E5E5] bg-white text-[16px] focus:outline-none focus:border-[#E15C31] transition-colors duration-200"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lingo-container pb-[100px]">
                {searchQuery ? (
                    // Search Results View
                    <div className="max-w-[800px] mx-auto">
                        <p className="text-[14px] text-[#888888] mb-6">
                            {filteredCategories?.reduce((acc, cat) => acc + cat.items.length, 0) || 0} results found
                        </p>
                        {filteredCategories && filteredCategories.length > 0 ? (
                            filteredCategories.map(category => (
                                <div key={category.id} className="mb-8">
                                    <h2 className="text-[20px] font-bold text-[#E15C31] mb-4">{category.title}</h2>
                                    <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                                        {category.items.map((item, idx) => (
                                            <FAQItem
                                                key={idx}
                                                question={item.question}
                                                answer={item.answer}
                                                isExpanded={expandedQuestion === `${category.id}-${idx}`}
                                                onToggle={() => setExpandedQuestion(
                                                    expandedQuestion === `${category.id}-${idx}` ? null : `${category.id}-${idx}`
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-[16px] text-[#888888]">No results found. Try a different search term.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Category View
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar - Categories */}
                        <div className="lg:w-[350px] flex-shrink-0">
                            <div className="lg:sticky lg:top-[120px] space-y-3">
                                {FAQ_CATEGORIES.map(category => (
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        isActive={activeCategory === category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setExpandedQuestion(null);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* FAQ Content */}
                        <div className="flex-1">
                            <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                                <div className="p-6 border-b border-[#E5E5E5]">
                                    <h2 className="text-[24px] md:text-[28px] font-bold text-[#E15C31]">
                                        {activeCategoryData?.title}
                                    </h2>
                                </div>
                                <div className="p-6">
                                    {activeCategoryData?.items.map((item, idx) => (
                                        <FAQItem
                                            key={idx}
                                            question={item.question}
                                            answer={item.answer}
                                            isExpanded={expandedQuestion === idx}
                                            onToggle={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                <div className="mt-16 text-center">
                    <p className="text-[18px] text-[#666666] mb-4">
                        Still unsure about something?
                    </p>
                    <a 
                        href="mailto:admin@lingofoundry.com" 
                        className="inline-block bg-[#E15C31] text-white px-10 py-4 rounded-xl font-bold text-[16px] hover:bg-[#C74E27] transition-colors duration-300"
                    >
                        CONTACT US
                    </a>
                </div>
            </div>
        </div>
    );
}
