/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-25 16:17:58
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import { PurchaseHistory } from "@/components/atoms/accordion";

export default function StudentPurchaseHistory(){

    const data = [
        {
            date: "1st Septembar, 2021 at 11:30 PM",
            courseCount: 2,
            totalPrice: 6900000,
            paymentMethod: "Credit Card",
            courses: [
                {
                    tutorName: "JAMES🇺🇸 IELTS/TOEIC TEST 💯 Engineering 👨",
                    tutorProfileUrl: "/assets/tutor-profiles/tutor-2.png",
                    subjectLevel: "English - Children (6-11)",
                    sessionCount: "5 Classes (5 hours)",
                    price: 3000000,
                    status: "On Going",
                    rating: 4.7,
                    reviewCount: 450000
                },
                {
                    tutorName: "JAMES🇺🇸 IELTS/TOEIC TEST 💯 Engineering 👨",
                    tutorProfileUrl: "/assets/tutor-profiles/tutor-2.png",
                    subjectLevel: "English - Children (6-11)",
                    sessionCount: "5 Classes (5 hours)",
                    price: 3900000,
                    status: "Done",
                    rating: 4.7,
                    reviewCount: 450000
                }
            ]
        },
        {
            date: "1st Septembar, 2021 at 11:30 PM",
            courseCount: 2,
            totalPrice: 6900000,
            paymentMethod: "Credit Card",
            courses: [
                {
                    tutorName: "JAMES🇺🇸 IELTS/TOEIC TEST 💯 Engineering 👨",
                    tutorProfileUrl: "/assets/tutor-profiles/tutor-2.png",
                    subjectLevel: "English - Children (6-11)",
                    sessionCount: "5 Classes (5 hours)",
                    price: 3000000,
                    status: "On Going",
                    rating: 4.7,
                    reviewCount: 450000
                },
                {
                    tutorName: "JAMES🇺🇸 IELTS/TOEIC TEST 💯 Engineering 👨",
                    tutorProfileUrl: "/assets/tutor-profiles/tutor-2.png",
                    subjectLevel: "English - Children (6-11)",
                    sessionCount: "5 Classes (5 hours)",
                    price: 3900000,
                    status: "Done",
                    rating: 4.7,
                    reviewCount: 450000
                }
            ]
        }
    ]
    
    return(
        <div className="lingo-container flex flex-col mb-[72px]">
            <TitleStudentDashboard text="Purchase History"/>
            <div className='mt-[15px] md:mt-[35px] flex flex-col gap-[25px] w-full animation-effect'>
                {data.map((item, index) => (
                    <PurchaseHistory
                        key={index}
                        data={item}
                        defaultOpen={index === 0}
                    />
                ))}
            </div>
        </div>
    )
}