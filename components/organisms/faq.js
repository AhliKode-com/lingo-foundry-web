/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:06:48
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-28 22:01:33
 */

"use client";

import { Question } from "@/components/atoms/accordion";
import { TitleText } from "../atoms/title";
import { FindTutor } from "@/constants/en";
// import { getFaqs } from "@/apis/getFaqs"; // Commented out - API not used for now

// Static FAQ data from PDFs
const FAQ_DATA = {
    "STUDENT": [
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
    ],
    "TUTOR": [
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
    ]
};

export default function Faq({purpose}) {
    const {faq} = FindTutor;

    // Use static data instead of API
    // const { data: faqs, loading } = getFaqs(purpose);
    const faqCategories = FAQ_DATA[purpose] || FAQ_DATA.STUDENT;

    return (
        <div className="lingo-container flex flex-col justify-center items-center pt-[180px] md:pt-[250px] pb-[80px]">
            {/* Main Title */}
            <h1 className="text-[32px] md:text-[48px] font-bold text-[#3C3C3C] text-center mb-[60px] px-4">
                Frequently Asked Questions
            </h1>

            {/* FAQ Categories */}
            <div className="w-full max-w-[1200px] flex flex-col gap-[50px] px-4">
                {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="w-full">
                        {/* Category Title - Orange brand color */}
                        <h2 className="text-[24px] md:text-[28px] font-bold text-[#E15C31] mb-[24px]">
                            {category.category}
                        </h2>

                        {/* FAQ Items Container - White card with border */}
                        <div className="bg-white rounded-[16px] border-[2px] border-[#E5E5E5] overflow-hidden shadow-sm">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className={itemIndex !== category.items.length - 1 ? "border-b-[1px] border-[#E5E5E5]" : ""}>
                        <Question
                            title={item.title}
                                        answer={item.answer}
                                        defaultOpen={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Still unsure section */}
            <div className="mt-[80px] text-center">
                <p className="text-[18px] md:text-[20px] text-[#777777] mb-[20px]">
                    Still unsure about something?
                </p>
                <a 
                    href="mailto:admin@lingofoundry.com" 
                    className="inline-block bg-[#E15C31] text-white px-[40px] py-[14px] rounded-[12px] font-bold text-[16px] hover:bg-[#C74E27] transition-colors duration-300"
                >
                    CONTACT US
                </a>
            </div>
        </div>
  );
}
