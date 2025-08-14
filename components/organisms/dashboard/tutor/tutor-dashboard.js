/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 10:04:12
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 23:42:04
 */
"use client"
import {useState, useEffect} from "react";
import { TitleStudentDashboard, TitleSubDashboard, OrangeTextDashboard } from "@/components/atoms/title";
import {useAuth} from "@/context/AuthContext";
import {useStudentBooking} from "@/apis/studentBooking";
import { getDetail } from "@/apis/getTutorDetail";
import Image from "next/image";
import Recommended from "@/components/organisms/dashboard/tutor/recommended";
import Overview from "@/components/organisms/dashboard/tutor/overview";
import Earnings from "@/components/organisms/dashboard/tutor/earnings";
import CommissionRule from "@/components/organisms/dashboard/tutor/commission-rule";
import UpcomingGmeet from "@/components/organisms/dashboard/upcoming-gmeet";
import Subjects from "@/components/organisms/dashboard/subject";
import {toast} from "react-toastify";
// import Link from "next/link";
// import KeyToSuccess from "@/components/organisms/dashboard/tutor/key-to-success";
// import NewSubscriptions from "@/components/organisms/dashboard/tutor/new-subscriptions";
// import Journey from "@/components/organisms/dashboard/tutor/journey";

export default function TutorDashboard(){
    const { user, loading } = useAuth();
    const {listBookingTutor} = useStudentBooking()
    const { getData } = getDetail();

    const [tutorSubjects, setTutorSubjects] = useState([]); 
    const [bookings, setBookings] = useState([]);
    const [showAllBookings, setShowAllBookings] = useState(false);
    const [showAllSubject, setShowAllSubject] = useState(false);

    const toggleShowAll = () => setShowAllBookings(prev => !prev);
    const toggleShowAllSubject = () => setShowAllSubject(prev => !prev);

    const fetchTutorDetails = async () => {
        if (user?.tutor?.id) {
            try {
                const tutorDetailData = await getData(user.tutor.id);
                if (Array.isArray(tutorDetailData.tutorSubjects)) {
                    setTutorSubjects(tutorDetailData.tutorSubjects);
                } else {
                    setTutorSubjects([]);
                }
            } catch (error) {
                console.error("Error fetching tutor details:", error);
                toast.error(error.message);
                setTutorSubjects([]);
            }
        }
    };

    useEffect(() => {
        fetchTutorDetails();
    }, [user]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await listBookingTutor();
            const content = response?.data?.content || response?.content || [];
            const transformed = content.map(item => ({
                img: item.tutorProfileUrl || '/placeholder.svg',
                name: `${item.subjectName}: ${item.subjectLevel}`,
                date: new Date(item.startTimeLocale).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: `${new Date(item.startTimeLocale).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endTimeLocale).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                link: item.meetingLink
            }));

            setBookings(transformed);
        };
    
        fetchBookings();
    }, []);

    // Show skeleton while loading
    if (loading || !user) {
        return (
            <div className="lingo-container flex flex-col mb-[72px]">
                {/* Greetings skeleton */}
                <div className="flex flex-col">
                    <div className="h-[32px] w-[300px] bg-gray-300 animate-pulse rounded-lg mb-2"></div>
                    <div className="h-[20px] w-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
                </div>

                {/* Gmeet skeleton */}
                <div className="flex lg:flex-row flex-col gap-[30px] mt-[48px]">
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="w-full flex justify-between items-center mb-[15px]">
                            <div className="h-[12px] w-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
                            <div className="h-[12px] w-[80px] bg-gray-300 animate-pulse rounded-lg"></div>
                        </div>
                        <div className="flex flex-col gap-[8px] mb-[24px]">
                            <div className="h-[100px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="w-full flex justify-between items-center mb-[15px]">
                            <div className="h-[12px] w-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
                            <div className="h-[12px] w-[80px] bg-gray-300 animate-pulse rounded-lg"></div>
                        </div>
                        <div className="flex flex-col gap-[8px] mb-[24px]">
                            <div className="h-[100px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Overview skeleton */}
                <div className="mt-[48px]">
                    <div className="h-[300px] w-full bg-gray-300 animate-pulse rounded-lg mb-[24px]"></div>
                </div>

                {/* Recommended skeleton */}
                <div className="flex flex-col mt-[48px]">
                    <div className="h-[32px] w-[150px] bg-gray-300 animate-pulse rounded-lg mb-[24px]"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[12px]">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="min-h-[350px] p-[17px] border-[1px] border-[#DCDCE5] rounded-[4px]">
                                <div className="flex flex-col justify-between h-full">
                                    <div className="flex flex-col gap-[8px]">
                                        <div className="flex justify-between items-start">
                                            <div className="w-[48px] h-[48px] bg-gray-300 animate-pulse rounded-lg"></div>
                                            <div className="w-[13px] h-[13px] bg-gray-300 animate-pulse rounded-lg"></div>
                                        </div>
                                        <div className="h-[20px] w-[120px] bg-gray-300 animate-pulse rounded-lg"></div>
                                        <div className="h-[40px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                                    </div>
                                    <div className="h-[48px] w-full bg-gray-300 animate-pulse rounded-lg mt-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Earnings skeleton */}
                <div className="mt-[48px]">
                    <div className="h-[32px] w-[150px] bg-gray-300 animate-pulse rounded-lg mb-[24px]"></div>
                    <div className="h-[300px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                </div>
            </div>
        );
    }

    return(
        <div className="lingo-container flex flex-col mb-[72px]">
            {/* Greetings */}
            <div className="flex flex-col">
                <TitleStudentDashboard text={`Good afternoon, ${user?.firstName} ${user?.lastName}`} />
                <span className="text-[#4D4C5C]">It's great having you here 🎉</span>
                {(!user?.tutor?.cvFileObjectKey || !user?.tutor?.certificatesJson) &&
                    <div className="bg-[#F4F4F8] flex justify-between items-center p-[24px] md:pb-[40px] mt-[48px] rounded-[8px]">
                        <div className="flex flex-col">
                            <TitleStudentDashboard text="We're glad your're here!" />
                            <span className="text-[#4D4C5C]">Get set for success on Lingo Foundry with some basic tips.</span>
                            {/* <Link href={'/tutor-dashboard'} passHref>
                                <button
                                    className="rounded-[8px] mt-[16px] bg-[#E35D33] cursor-pointer flex h-[38px] md:h-[48px] justify-center items-center text-white p-4 font-medium text-[14px] md:text-[16px] animation-effect whitespace-nowrap"
                                >
                                    View your calendar
                                </button>
                            </Link> */}
                        </div>
                        <Image
                            src="/assets/tutor-dashboard/in-love.svg"
                            alt="in-love"
                            width={140}
                            height={140}
                            className="w-[140px] h-[140px] animation-effect md:block hidden"
                        />
                    </div>
                }
            </div>

            {/* Recommended */}
            {(!user?.tutor?.cvFileObjectKey || !user?.tutor?.certificatesJson) && <Recommended/>}

            {/* gmeet */}
            <div className="flex lg:flex-row flex-col gap-[30px] mt-[48px]">
                <div className="lg:w-1/2">
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="My Subject" custom="w-full border-[#FFBA7D]"/>
                        {
                            Array.isArray(tutorSubjects) && tutorSubjects.length > 3 ? (
                                <button onClick={toggleShowAllSubject} className="w-full">
                                    <OrangeTextDashboard text={showAllSubject ? "Show less" : "See all"} position="justify-end"/>
                                </button>
                            ) :
                            (
                                <></>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-[8px] mb-[24px]">
                        {loading ? (
                            <div className="h-[200px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                        ) : (
                            Array.isArray(tutorSubjects) && tutorSubjects.length > 0 ? (
                                (showAllSubject ? tutorSubjects : tutorSubjects.slice(0, 3)).map((item, index) => (
                                    <Subjects key={index} data={item}/>
                                ))
                            ) : (
                                <div className="py-10">No active subject.</div>
                            )
                        )}
                    </div>
                </div>
                <div className="lg:w-1/2 flex flex-col">
                    <div className="w-full flex justify-between items-center mb-[15px]">
                        <TitleSubDashboard text="Upcoming Google meet Class" custom="w-full border-[#FFBA7D]"/>
                        {
                            bookings.length > 3 ? (
                                <button onClick={toggleShowAll} className="w-full">
                                    <OrangeTextDashboard text={showAllBookings ? "Show less" : "See all"} position="justify-end"/>
                                </button>

                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-[8px] mb-[24px]">
                        {loading ? (
                            <div className="h-[200px] w-full bg-gray-300 animate-pulse rounded-lg"></div>
                        ) : (
                            bookings.length > 0 ? (
                                (showAllBookings ? bookings : bookings.slice(0, 3)).map((item, index) => (
                                    <UpcomingGmeet key={index} data={item} />
                                ))
                            ) : (
                                <div className="py-10">No Google meet available.</div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* overview */}
            <Overview/>

            {/* earnings */}
            <Earnings/>

            {/* commission rule */}
            <CommissionRule/>

            {/* key to success */}
            {/* <KeyToSuccess/> */}

            {/* new subs */}
            {/* <NewSubscriptions/> */}

            

            {/* journey */}
            {/* <Journey/> */}
        </div>
    )
}