/*
 * @Author: danteclericuzio
 * @Date: 2026-02-03 00:00:00
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2026-02-03 00:00:00
 */

"use client";

import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";

// FAQ Data from PDFs - STUDENT
const STUDENT_FAQ = [
    {
        category: "Getting Started",
        items: [
            {
                title: "How to Sign Up on Lingo Foundry?",
                answer: "1. Go to Lingo Foundry website, https://lingofoundry.com\n2. Find the Sign Up button at the top right corner of the homepage\n3. Fill in your Email Address and Password in the fields provided\n4. Submit and your account will be successfully created"
            },
            {
                title: "How can I reset my password?",
                answer: "1. Click 'Forgot Password' on the login page\n2. Enter your registered email when you signed up\n3. Check your email for the OTP code\n4. Enter the OTP and create a new password\n5. Click Recover Your Account and your password will be successfully reset"
            },
            {
                title: "Where do I find my course?",
                answer: "Step 1 — Open Your Profile Menu\nAfter you have successfully signed up and logged in, click the profile menu located on the right side of the page.\n\nStep 2 — Select 'Student Dashboard'\nFrom the dropdown menu, choose Student Dashboard to access your learning overview.\n\nStep 3 — View Your Course List\nInside the dashboard, you will be able to see your:\n- Enrolled Courses\n- Active Courses\n- Completed Courses\n- Total Learning Hours"
            },
            {
                title: "How students find a tutor & view tutor profile?",
                answer: "1. Log in\n2. Go to the Home Page\n3. Click Find Tutor\n4. Click the tutor's name\n5. Scroll down to see the tutor's profile / resume"
            }
        ]
    },
    {
        category: "Contacting Your Tutor",
        items: [
            {
                title: "How to contact the tutors before purchasing the lesson?",
                answer: "Click the tutor profile, find 'send message' and click the button. You could contact the tutor directly and ask about the class program and most available time to start."
            },
            {
                title: "How can I contact my tutor if I have any questions related to the lesson?",
                answer: "Click 'student dashboard' and find 'message.' You can contact your tutor directly through the message box available on the platform."
            },
            {
                title: "Who should I contact if I can't attend my lesson?",
                answer: "Try to contact your tutor first through the message box. If the tutor cannot be reached, please contact the admin or the official WhatsApp number only on wa.me/6285890038796"
            },
            {
                title: "Is there a group chat for communication?",
                answer: "For private (1-on-1) lessons, communication can be done through the message box on the website."
            },
            {
                title: "Is there a WhatsApp group for my lesson?",
                answer: "All lessons are conducted online, and communication is handled through the inbox chat on the website."
            }
        ]
    },
    {
        category: "Class Scheduling",
        items: [
            {
                title: "How to schedule the lesson?",
                answer: "After payment, schedule the lesson directly based on the available time of the tutors. Students could reschedule the class up to 12 hours prior to the lesson started."
            },
            {
                title: "How can I reschedule my lesson if I can't attend?",
                answer: "Students are allowed to reschedule lessons up to 12 hours prior to the scheduled time. If a student cannot attend the scheduled lesson, the student should contact the tutor immediately, or the lesson will be marked as completed."
            },
            {
                title: "How to Change or Set Your Class Schedule?",
                answer: "Step 1 — Go to Your Profile\nAfter signing in or completing your purchase, navigate to your Profile page.\n\nStep 2 — Open Purchase History\nFrom the dashboard menu, click Purchase History.\n\nStep 3 — Select Your Course\nFind the course you have purchased, then click Set Your Schedule.\n\nStep 4 — Choose Your Date and Time\nYou will be redirected to the scheduling page. Select your preferred date and time from the available time slots.\n\nStep 5 — Confirm Your Booking\nOnce you have chosen your preferred time, click Book This Class to confirm your schedule."
            }
        ]
    },
    {
        category: "Class Reminders and Links",
        items: [
            {
                title: "Will I receive a link or reminder before the lesson starts?",
                answer: "The scheduled lesson link will be sent to your registered email."
            },
            {
                title: "Will I receive a reminder before my lesson starts?",
                answer: "The reminder link will be sent to your registered email address prior to the lesson started. Check your email and log in to the website."
            }
        ]
    },
    {
        category: "Missed Classes",
        items: [
            {
                title: "What should I do if I miss a lesson?",
                answer: "All lessons won't be refunded. If students did not reschedule within 12 hours before the lesson started and did not attend the lesson, the lesson will be marked as completed."
            }
        ]
    },
    {
        category: "Course Content",
        items: [
            {
                title: "Can I access the lesson materials after the session?",
                answer: "Yes, students could discuss with the tutors to access the lesson materials."
            },
            {
                title: "Can I request specific topics to be covered in my lessons?",
                answer: "Yes! You can discuss your preferred topics with your tutor at the beginning of your sessions."
            },
            {
                title: "Are there assessments or tests given during the course?",
                answer: "Assessments vary by tutors. Please check with your tutors for specific details."
            }
        ]
    },
    {
        category: "Payment and Refunds",
        items: [
            {
                title: "What payment methods are accepted?",
                answer: "We accept various payment methods. Please check the payment section on the website for details."
            }
        ]
    },
    {
        category: "Class Progress and Feedback",
        items: [
            {
                title: "How will I know if I'm making progress in my lessons?",
                answer: "Tutors generally provide feedback at the end of each session. Additionally, you can ask for periodic assessments to track your progress."
            },
            {
                title: "How to provide feedback about my tutor?",
                answer: "1. Click 'Student Dashboard'\n2. Scroll down to find 'Complete Course'\n3. Before downloading the certificate, provide feedback for the course and the tutor"
            }
        ]
    },
    {
        category: "Support",
        items: [
            {
                title: "How do I contact support?",
                answer: "Step 1 — Scroll to the Bottom of the Website\nGo to the bottom of the page and locate the Contact Us button.\n\nStep 2 — Click the Email Address\nSelect admin@lingofoundry.com to automatically open an email message, or type your own message manually using the same address.\n\nStep 3 — Reach Us Through Other Channels\nYou can also contact us via:\n- Instagram: @lingofoundry\n- WhatsApp: +62 858-9003-8796"
            },
            {
                title: "How do I update my profile information?",
                answer: "Step 1 — Open Your Profile Settings\nClick your profile icon at the top right of the website and select Settings.\n\nStep 2 — Update Your Details\nYou will see your account information along with fields where you can edit your personal data.\n\nStep 3 — Save Your Changes\nAfter updating your information, click Save Changes to apply the updates.\n\nStep 4 — Confirm the Update\nIf the update is successful, a notification will appear saying 'Data changed successfully.' Your profile is now updated!"
            }
        ]
    }
];

// FAQ Data from PDFs - PLATFORM (Tutor)
const PLATFORM_FAQ = [
    {
        category: "Account Setup",
        items: [
            {
                title: "How to Sign Up on Lingo Foundry?",
                answer: "1. Go to Lingo Foundry website, https://lingofoundry.com\n2. Find the Sign Up button at the top right corner of the homepage\n3. Fill in your Email Address and Password in the fields provided\n4. Submit and your account will be successfully created"
            },
            {
                title: "How can I reset my password?",
                answer: "1. Click 'Forgot Password' on the login page\n2. Enter your registered email when you signed up\n3. Check your email for the OTP code\n4. Enter the OTP and create a new password\n5. Click Recover Your Account and your password will be successfully reset"
            },
            {
                title: "How do I update my profile information?",
                answer: "Step 1 — Open Your Profile Settings\nClick your profile icon at the top right of the website and select Settings.\n\nStep 2 — Update Your Details\nYou will see your account information along with fields where you can edit your personal data.\n\nStep 3 — Save Your Changes\nAfter updating your information, click Save Changes to apply the updates.\n\nStep 4 — Confirm the Update\nIf the update is successful, a notification will appear saying 'Data changed successfully.' Your profile is now updated!"
            }
        ]
    },
    {
        category: "Finding Courses & Tutors",
        items: [
            {
                title: "Where do I find my course?",
                answer: "Step 1 — Open Your Profile Menu\nAfter you have successfully signed up and logged in, click the profile menu located on the right side of the page.\n\nStep 2 — Select 'Student Dashboard'\nFrom the dropdown menu, choose Student Dashboard to access your learning overview.\n\nStep 3 — View Your Course List\nInside the dashboard, you will be able to see your:\n- Enrolled Courses\n- Active Courses\n- Completed Courses\n- Total Learning Hours"
            },
            {
                title: "How students find a tutor & view tutor profile?",
                answer: "1. Log in\n2. Go to the Home Page\n3. Click Find Tutor\n4. Click the tutor's name\n5. Scroll down to see the tutor's profile / resume"
            }
        ]
    },
    {
        category: "Scheduling Classes",
        items: [
            {
                title: "How to Change or Set Your Class Schedule?",
                answer: "Step 1 — Go to Your Profile\nAfter signing in or completing your purchase, navigate to your Profile page.\n\nStep 2 — Open Purchase History\nFrom the dashboard menu, click Purchase History.\n\nStep 3 — Select Your Course\nFind the course you have purchased, then click Set Your Schedule.\n\nStep 4 — Choose Your Date and Time\nYou will be redirected to the scheduling page. Select your preferred date and time from the available time slots.\n\nStep 5 — Confirm Your Booking\nOnce you have chosen your preferred time, click Book This Class to confirm your schedule."
            }
        ]
    },
    {
        category: "Becoming a Tutor",
        items: [
            {
                title: "How to Apply as a Tutor?",
                answer: "Step 1: Log in to your account\nStep 2: Go to the Home Page\nStep 3: Click Apply as Tutor\nStep 4: Select your language\nStep 5: Choose your available hours per week\nStep 6: View your estimated monthly income\nStep 7: Click Apply Now\nStep 8: Fill in the form with:\n- About\n- Photo\n- CV & Certificates\n- Description\n- Bank Information\nStep 9: Submit your application"
            }
        ]
    },
    {
        category: "Tutor Communication",
        items: [
            {
                title: "How tutors reply to student chats?",
                answer: "Step 1: Log in to your account\nStep 2: Go to the Dashboard / Home Page\nStep 3: Click Chats / Messages\nStep 4: Select the student's chat\nStep 5: Choose a Tutor Chat Template (optional)\nStep 6: Edit or customize the message if needed\nStep 7: Click Send"
            }
        ]
    },
    {
        category: "Tutor Payments",
        items: [
            {
                title: "How tutors receive payment?",
                answer: "Payment is transferred to the tutor's registered bank account. Tutors receive payment according to the scheduled payout date range 5th to 10th of each following month.\n\nExample: November 2025 payment will be made from range 5th to 10th of December 2025."
            },
            {
                title: "How Tutors Calculate Their Income?",
                answer: "Tutor income is calculated based on the total sessions purchased within the month. From the total gross income, a platform fee and transaction fee will be deducted. The remaining amount is the net income that the tutor will receive.\n\nExample: Students purchased 10 sessions in December 2025, tutor gross income would be 10 sessions × December hourly rate"
            }
        ]
    },
    {
        category: "Tutor Class Management",
        items: [
            {
                title: "How Tutors Reschedule Lessons?",
                answer: "If tutors are unable to conduct the lesson, they must contact the students 12 hours before the lesson starts via inbox chat. The new lesson schedule must be mutually agreed upon by both the tutors and the students."
            },
            {
                title: "What happened if tutors did not attend the scheduled lessons?",
                answer: "If tutors did not attend the scheduled lessons, it will affect the tutors' reviews on the platform. The platform has the rights to suspend the tutors account based on tutors performances."
            }
        ]
    },
    {
        category: "Support",
        items: [
            {
                title: "How do I contact support?",
                answer: "Step 1 — Scroll to the Bottom of the Website\nGo to the bottom of the page and locate the Contact Us button.\n\nStep 2 — Click the Email Address\nSelect admin@lingofoundry.com to automatically open an email message, or type your own message manually using the same address.\n\nStep 3 — Reach Us Through Other Channels\nYou can also contact us via:\n- Instagram: @lingofoundry\n- WhatsApp: +62 858-9003-8796"
            }
        ]
    }
];

// Helper function to format answer text
function formatAnswer(text) {
    if (!text) return null;
    
    const lines = text.split('\n').filter(line => line.trim());
    
    return (
        <div className="space-y-2">
            {lines.map((line, index) => {
                // Check if it's a list item
                if (line.trim().startsWith('-')) {
                    return (
                        <div key={index} className="flex gap-2 pl-4">
                            <span className="text-[#E15C31]">•</span>
                            <span>{line.trim().substring(1).trim()}</span>
                        </div>
                    );
                }
                // Check if it's a numbered step (Step 1, 1., etc)
                const stepMatch = line.match(/^(Step \d+[:\s—]+|\d+[\.:]\s*)/);
                if (stepMatch) {
                    return (
                        <div key={index} className="flex gap-2">
                            <span className="text-[#E15C31] font-medium min-w-[24px]">{index + 1}.</span>
                            <span>{line.replace(stepMatch[0], '').trim()}</span>
                        </div>
                    );
                }
                return <p key={index}>{line}</p>;
            })}
        </div>
    );
}

// FAQ Item Component - Duolingo style
function FAQItem({ title, answer, isExpanded, onToggle }) {
    return (
        <div 
            className="border-b border-[#E5E5E5] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors duration-200"
            onClick={onToggle}
        >
            <div className="flex items-center justify-between py-4 px-2">
                <span className="text-[15px] md:text-[16px] text-[#3C3C3C] pr-4">
                    {title}
                </span>
                <FiChevronRight 
                    className={`text-[18px] text-[#AFAFAF] flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                />
            </div>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-2 pb-4 text-[14px] md:text-[15px] text-[#666666] leading-relaxed">
                    {formatAnswer(answer)}
                </div>
            </div>
        </div>
    );
}

export default function HelpPage() {
    const [activeTab, setActiveTab] = useState("student");
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const faqData = activeTab === "student" ? STUDENT_FAQ : PLATFORM_FAQ;

    const handleQuestionToggle = (categoryIndex, itemIndex) => {
        const key = `${categoryIndex}-${itemIndex}`;
        setExpandedQuestion(expandedQuestion === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header - Duolingo style */}
            <div className="bg-white border-b border-[#E5E5E5] pt-[100px] md:pt-[120px]">
                <div className="max-w-[800px] mx-auto px-4 py-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Image
                            src="/assets/logo.png"
                            alt="Lingo Foundry"
                            width={40}
                            height={40}
                            className="w-[32px] h-auto"
                        />
                        <span className="text-[#AFAFAF] text-[14px] font-medium uppercase tracking-wide">
                            Help Center
                        </span>
                    </div>
                </div>
            </div>

            {/* Pills/Tabs - EasyCash style */}
            <div className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                <div className="max-w-[800px] mx-auto px-4 py-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setActiveTab("student");
                                setExpandedQuestion(null);
                            }}
                            className={`px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 ${
                                activeTab === "student"
                                    ? 'bg-[#E15C31] text-white shadow-md'
                                    : 'bg-white text-[#666666] border border-[#E5E5E5] hover:border-[#E15C31] hover:text-[#E15C31]'
                            }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("platform");
                                setExpandedQuestion(null);
                            }}
                            className={`px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-200 ${
                                activeTab === "platform"
                                    ? 'bg-[#E15C31] text-white shadow-md'
                                    : 'bg-white text-[#666666] border border-[#E5E5E5] hover:border-[#E15C31] hover:text-[#E15C31]'
                            }`}
                        >
                            Platform
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content - Duolingo style */}
            <div className="max-w-[800px] mx-auto px-4 py-8">
                <h1 className="text-[24px] md:text-[28px] font-bold text-[#3C3C3C] mb-8">
                    Frequently Asked Questions
                </h1>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqData.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            {/* Category Header */}
                            <h2 className="text-[18px] md:text-[20px] font-bold text-[#3C3C3C] mb-4 pb-2 border-b-2 border-[#E15C31]">
                                {category.category}
                            </h2>
                            
                            {/* FAQ Items */}
                            <div className="bg-white">
                                {category.items.map((item, itemIndex) => (
                                    <FAQItem
                                        key={itemIndex}
                                        title={item.title}
                                        answer={item.answer}
                                        isExpanded={expandedQuestion === `${categoryIndex}-${itemIndex}`}
                                        onToggle={() => handleQuestionToggle(categoryIndex, itemIndex)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section - Duolingo style */}
                <div className="mt-16 text-center py-8 border-t border-[#E5E5E5]">
                    <p className="text-[16px] text-[#666666] mb-4">
                        Still unsure about something?
                    </p>
                    <a 
                        href="mailto:admin@lingofoundry.com" 
                        className="inline-block bg-[#E15C31] text-white px-8 py-3 rounded-xl font-bold text-[14px] hover:bg-[#C74E27] transition-colors duration-300 uppercase tracking-wide"
                    >
                        Send Feedback
                    </a>
                </div>
            </div>
        </div>
    );
}
