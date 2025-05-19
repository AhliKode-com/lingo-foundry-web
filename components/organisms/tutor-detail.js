/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 13:17:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-19 12:22:02
 */

"use client";
import { RiErrorWarningLine } from "react-icons/ri";
import {toast} from "react-toastify";
import {useParams, useRouter} from "next/navigation";
import React, {useState, useEffect} from "react";
import {RatingSummary} from "@/components/atoms/rating-summary";
import {ResumeTabs} from "@/components/atoms/resume-tab";
import {Speciality} from "@/components/atoms/accordion";
import {TutorCarousel} from '@/components/atoms/carousel';
import {getDetail} from "@/apis/getTutorDetail";
import {getReviews} from "@/apis/getUserReview";
import {useStudentCart} from "@/apis/studentCart";
import {useStudentWishList} from "@/apis/studentWishList";
import TutorDetailSkeleton from "@/components/organisms/tutor-detail-skeleton";
import {getPopularTutors} from "@/apis/getPopularTutors";
import {useAuth} from "@/context/AuthContext";
import {getEnums} from "@/apis/getEnum";

export default function TutorDetail() {
    const {slug} = useParams();
    const {data} = getDetail(slug);
    const {data: reviews} = getReviews("STUDENT");
    const {data: popularTutor, loading: popularTutorLoading} = getPopularTutors();
    const { user } = useAuth()
    const [expanded, setExpanded] = useState(false);
    const [loadingAddCart, setLoadingAddCart] = useState(false);
    const router = useRouter();
    const { data: enums } = getEnums();

    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };

    // random color
    const bgColors = ["#D8F8F2", "#FFF2E5","#FFF0F0"]

    // cart
    const [openCart, setOpenCart] = useState(false);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [sessionsByIndex, setSessionsByIndex] = useState({});
    const handleOpenCart = () => {
        if (!user) {
            router.push("/login");
            return
        }
        setOpenCart(!openCart);
    };
    const {addToCart, getCart} = useStudentCart();
    const handleCheckboxChange = (index, minSession) => {
        setSelectedIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
      
        setSessionsByIndex((prev) =>
            prev[index] == null ? { ...prev, [index]: minSession } : prev
        );
      };

    const changeSessions = (index, delta) => {
        setSessionsByIndex((prev) => {
            const current = prev[index] || languageLevel[index].minSession;
            const next = current + delta;
            return { ...prev, [index]: next };
        });
    };

    const handleAddToCart = async () => {
        const payload = selectedIndexes.map((i) => ({
            tutorSubjectId: languageLevel[i].tutorSubjectId,
            sessionCount: sessionsByIndex[i] || languageLevel[i].minSession,
        }));
        setLoadingAddCart(true);
        await addToCart(payload);
        toast.success("Add tutor to cart success.");
        setLoadingAddCart(false);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await getCart();
        setOpenCart(false);
        // reset selected indexes and sessions
        const newSessions = {};
        selectedIndexes.forEach((i) => {
            newSessions[i] = languageLevel[i].minSession;
        });
        setSessionsByIndex(newSessions);
        setSelectedIndexes([]);
    };

    useEffect(() => {
        if (openCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openCart]);

    // wishlist
    const {addToWishList, getWishList} = useStudentWishList();
    const handleAddToWishlist = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        await addToWishList(slug);
        await getWishList();
        toast.success("Add tutor to wishlist success.")
    };

    if (!data || !reviews) {
        return (
            <TutorDetailSkeleton />
        )
    }

    const subjects = data?.tutorSubjects.map((val) => {
        return val.subject.name
    })


    const languageLevel = data?.tutorSubjects.map((val) => {
        return {
            language: val.subject.name,
            level: val.subjectLevel.name,
            tutorSubjectId: val.id,
            maxSession: val.maximumSession,
            minSession: val.minimumSession,
            discounts: val.subjectDiscounts?.map((discount) => ({
                sessionQuantity: discount.sessionQuantity,
                discountPercentage: discount.discountPercentage,
            })) || []
        }
    })

    const calculateAverageRating = (data) => {
        const testimonials = data.content
        if (!testimonials || testimonials.length === 0) {
            return 0
        }
        const totalRating = testimonials.reduce((sum, item) => sum + item.rating, 0)
        const averageRating = totalRating / testimonials.length
        return Math.round(averageRating * 10) / 10
    }

    const averageRating = calculateAverageRating(reviews)

    return (
        <div className="lingo-container flex flex-col lg:flex-row pt-[80px] sm:pt-[103.61px]">
            {/* cart modal */}
            {openCart && (
                <div className="fixed inset-0 bg-[#00000070] flex items-center justify-center z-50" onClose={handleOpenCart}>
                    <div className="bg-white rounded-[8px] p-4 md:p-6 shadow-lg flex flex-col animation-effect">
                        <span className="animation-effect text-[20px] md:text-[24px] font-semibold mb-4">Add to Cart</span>
                        <span className="text-[14px] md:text-[16px] text-gray-600 mb-6 animation-effect">Do you want to add this item to your cart?</span>
                        <div className="hidden md:flex flex-row items-center gap-4 p-4 pb-2 border-b-[2px] border-[#DCDCE5]">
                            <div className="w-5 h-5"/>
                            <span className="text-[14px] md:text-[16px] font-medium">Subject</span>
                            <span className="text-[14px] md:text-[16px] font-medium md:ml-[98px]">Level</span>
                            <span className="text-[14px] md:text-[16px] font-medium ml-[36px]">Session</span>
                            <span className="text-[14px] md:text-[16px] font-medium ml-[24px]">Discount</span>
                        </div>
                        <div className="flex flex-col mb-4 overflow-y-auto max-h-[300px]">
                            {languageLevel.map((data, index) => {
                                const bgColor = bgColors[index % bgColors.length];
                                const sessions   = sessionsByIndex[index] ?? data.minSession;
                                let selectedDiscount = 0;
                                if (data.discounts && data.discounts.length > 0) {
                                    const sortedDiscounts = [...data.discounts].sort((a, b) => a.sessionQuantity - b.sessionQuantity);
                                    for (const discount of sortedDiscounts) {
                                      if (sessions >= discount.sessionQuantity) {
                                        selectedDiscount = discount.discountPercentage * 100;
                                      }
                                    }
                                }
                                const handleMinus = () => {
                                    if (sessions > data.minSession) {
                                      changeSessions(index, -1);
                                    }
                                };
                                
                                const handlePlus = () => {
                                    if (sessions < data.maxSession) {
                                      changeSessions(index, +1);
                                    }
                                };
                                return(
                                    <div key={index} className="flex flex-row items-center gap-4 p-4">
                                        <input type="checkbox" className="w-5 h-5" onChange={() => handleCheckboxChange(index, data.minSession)}/>
                                        <div className="md:hidden flex flex-col gap-2">
                                            <span className="text-[16px] font-medium">{data.language}</span>
                                            <span style={{ backgroundColor: bgColor  }} className="px-[8px] py-[1.5px] w-fit">{data.level}</span>
                                            <div className="flex items-center border rounded w-fit">
                                                <button
                                                    onClick={handleMinus}
                                                    className="px-2"
                                                    disabled={sessions <= data.minSession}
                                                >
                                                    -
                                                </button>
                                                <input type="text" value={sessions} readOnly className="w-8 text-center outline-none"/>
                                                <button
                                                    onClick={handlePlus}
                                                    className="px-2"
                                                    disabled={sessions >= data.maxSession}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="flex items-center bg-gray-400 text-white font-semibold rounded">
                                                <input type="text" value={`${selectedDiscount} %`} readOnly className="w-[85px] text-center outline-none"/>
                                            </div>
                                        </div>
                                        <span className="text-[16px] font-medium md:block hidden">{data.language}</span>
                                        <span style={{ backgroundColor: bgColor  }} className="px-[8px] py-[1.5px] ml-auto md:block hidden">{data.level}</span>
                                        <div className="hidden md:flex items-center border rounded">
                                            <button
                                                onClick={handleMinus}
                                                className="px-2"
                                                disabled={sessions <= data.minSession}
                                            >
                                                -
                                            </button>
                                            <input type="text" value={sessions} readOnly className="w-8 text-center outline-none"/>
                                            <button
                                                onClick={handlePlus}
                                                className="px-2"
                                                disabled={sessions >= data.maxSession}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="hidden md:flex items-center bg-gray-400 text-white font-semibold rounded">
                                            <input type="text" value={`${selectedDiscount} %`} readOnly className="w-[85px] text-center outline-none"/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {selectedIndexes.length === 0 && (
                            <div className="flex items-center gap-2 mb-4">
                                <RiErrorWarningLine className="text-[#E35D33]"/>
                                <span>Please select at least one subject</span>
                            </div>
                        )}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleOpenCart}
                                className="cursor-pointer rounded-[8px] text-[18px] font-semibold justify-center items-center flex py-[10px] w-full border-[2px] border-[#DCDCE5]"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={selectedIndexes.length === 0}
                                onClick={handleAddToCart}
                                className={`
                                    cursor-pointer rounded-[8px] text-[18px] font-semibold text-white justify-center items-center flex py-[10px] w-full
                                    ${selectedIndexes.length === 0 ? "opacity-50 cursor-not-allowed bg-gray-500" : "bg-[#E35D33] "}
                                    `}
                            >
                                {loadingAddCart ? (
                                    <div>
                                        <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-[#FFFFFF]"></div>
                                    </div>
                                    
                                ) : (
                                    "Yes, add it"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Left scrollable section */}
            <div className="p-4 md:p-8">
                <div className="md:max-w-3xl">
                    {/* Profile header */}
                    <div className="block">
                        <div className="flex md:flex-row flex-col items-center gap-6 mb-6">
                            <div className="relative h-[166px] w-[166px] flex-shrink-0 md:mb-auto mr-auto md:mr-0">
                                <img
                                    src={data.tutor.profilePhotoUrl || "/placeholder.svg"}
                                    alt="img"
                                    className="h-[166px] w-[166px] object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-[28px] font-medium">{data.tutor.firstName}{" "}{data.tutor.lastName}</span>
                                    <img
                                        src="/assets/tag.svg"
                                        alt="tag"
                                        className="h-[16px] w-[16px] object-cover"
                                    />
                                    <img
                                        src="/assets/indo-flag.svg"
                                        alt="tag"
                                        className="h-[12.5px] w-[16px] object-cover"
                                    />
                                </div>
                                <span className="text-[#121117] my-[10px]">{data.tutor.bio}</span>
                                <div className="flex flex-col gap-[15px]">
                                    {Array.isArray(data.tutor?.certificates) && data.tutor.certificates.length > 0  && (
                                        <div className="flex gap-[10px]">
                                            <img src="/assets/doc.svg" alt="verified"
                                                className="w-[16px] h-[16px] mt-[5px]"/>
                                            <div className="flex flex-col gap-[5px]">
                                                <span className="font-semibold text-[#0450B4]">Professional Tutor</span>
                                                <span>{data.tutor.firstName}{" "}{data.tutor.lastName} is a highly qualified tutor with a verified teaching certificate</span>
                                            </div>
                                        </div>
                                    )}
                                    {data.tutor?.numberOfCourses >= 500 && (    
                                        <div className="flex gap-[10px]">
                                            <img src="/assets/badge.svg" alt="verified"
                                                className="w-[16px] h-[16px] mt-[5px]"/>
                                            <div className="flex flex-col gap-[5px]">
                                                <span className="font-semibold text-[#E35D33]">Super Tutor</span>
                                                <span>{data.tutor.firstName}{" "}{data.tutor.lastName} is a highly rated and experienced tutor.</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-[10px]">
                                        <img src="/assets/teaches.svg" alt="verified"
                                             className="w-[16px] h-[16px] mt-[5px]"/>
                                        <div className="flex flex-col gap-[5px]">
                                            <span className="font-semibold">Teaches</span>
                                            <span>{subjects.join(", ") || 0} lessons</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* About me section */}
                    <div className="mb-[48px] flex flex-col">
                        <span className="text-[23px] font-medium mb-[20px]">About me</span>
                        <div className="flex flex-col gap-[20px]">
                            {expanded ? (
                                <>
                                    <p className="whitespace-pre-line">
                                        {`${data.tutor.introduction}\n\n${data.tutor.teachingExperience}\n\n${data.tutor.courseMotivation}`}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="line-clamp-2 whitespace-pre-line">
                                    {`${data.tutor.introduction}\n\n${data.tutor.teachingExperience}\n\n${data.tutor.courseMotivation}`}
                                    </p>
                                </>
                            )}
                            <button onClick={toggleExpanded} className="self-start underline">
                                {expanded ? "Hide" : "See more"}
                            </button>
                        </div>
                    </div>

                    {/* speak */}
                    <div className="flex flex-col mb-[48px]">
                        <span className="text-[23px] font-medium mb-[20px]">I teach</span>
                        <div className="flex flex-wrap gap-[24px]">
                            {languageLevel.length > 0 ?(
                                languageLevel.map((value, index) => {
                                    const bgColor = bgColors[index % bgColors.length];
                                    return(
                                        <div className="flex items-center gap-[8px]" key={index}>
                                            <span className="text-[14px]">{value.language}</span>
                                            <div style={{ backgroundColor: bgColor }} className="px-[8px] py-[1.5px]">{value.level}</div>
                                        </div>
                                    )
                                })
                            ) : (
                                <>0 lessons</>
                            )}
                        </div>
                    </div>

                    {/* say */}
                    <div className="flex flex-col mb-[48px]">
                        <div className="flex items-center mb-[20px] gap-[6px]">
                            <span className="text-[23px] font-medium">What my students say</span>
                            <img src="/assets/warning.svg" alt="warning" className="w-[20px] h-[20px] mt-[5px]"/>
                        </div>
                        <RatingSummary
                            dataReview={reviews.content}
                            averageRating={averageRating}
                            totalReviews={reviews.content.length}
                            ratingCounts={{
                                5: 0,
                                4: 0,
                                3: 0,
                                2: 0,
                                1: 0,
                            }}
                        />
                    </div>

                    {/* resume */}
                    <div className="flex flex-col mb-[80px]">
                        <span className="text-[23px] font-medium mb-[20px]">Resume</span>
                        <ResumeTabs 
                            data={data?.tutor?.certificates}
                            dataCv={data?.tutor?.cvFileUrl}    
                        />
                    </div>

                    {/* speciality */}
                    <div className="flex flex-col mb-[48px]">
                        <span className="text-[23px] font-medium mb-[20px]">My specialties</span>
                        {data?.tutor?.expertises?.map((item, index) => {
                            const expMatch = enums.expertise.find(expertiseItem => expertiseItem.name === item)?.displayName;
                            return (
                                <Speciality
                                    key={index}
                                    data={expMatch}
                                    isLast={index === data?.tutor?.expertises.length - 1}
                                    // defaultOpen={index === 0}
                                />
                            )
                        })}
                    </div>

                    {/* like */}
                    <div className="flex flex-col mb-[48px] overflow-hidden">
                        <TutorCarousel tutors={popularTutor} loading={popularTutorLoading} currentId={slug}/>
                    </div>

                </div>
            </div>

            {/* Right fixed section */}
            <div className="md:w-80 lg:w-96">
                <div className="md:sticky md:top-[115px] p-4">
                    <div className="p-6 shadow-md rounded-[8px]">
                        <div className="flex flex-col">
                            <img
                                src={data?.tutor.profilePhotoUrl || "/placeholder.svg"}
                                alt="img"
                                className="h-[166px] w-[166px] object-cover mx-auto"
                            />
                            <div className="flex gap-[24px] my-[24px]">
                                <div className="flex flex-col">
                                    <div className="flex gap-[4px] items-center">
                                        <img src="/assets/star-review.svg" alt="star" className="w-[16px] h-[16px]"/>
                                        <span className="font-medium">{data.tutor.averageRating}</span>
                                    </div>
                                    <span className="text-[14px] text-[#4D4C5C]">{data.tutor.reviewCount} reviews</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{data.tutorSubjects.length}</span>
                                    <span className="text-[14px] text-[#4D4C5C]">lessons</span>
                                </div>
                            </div>
                            <div className="flex mb-[24px] flex-col">
                                <span className="font-medium">Rp.{Number(data.tutor.averageSubjectPrice).toLocaleString()}</span>
                                <span className="text-[14px] text-[#4D4C5C]">per hour</span>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <button
                                    onClick={handleOpenCart}
                                    className="cursor-pointer gap-[14px] rounded-[8px] text-[18px] font-semibold text-white justify-center items-center flex py-[10px] w-full bg-[#E35D33]">
                                    <img src="/assets/lightning.svg" alt="lightning" className="w-[20px] h-[20px]"/>
                                    Add to cart
                                </button>
                                <button
                                    onClick={handleAddToWishlist}
                                    className="cursor-pointer gap-[14px] rounded-[8px] text-[18px] font-semibold justify-center items-center flex py-[10px] w-full border-[2px] border-[#DCDCE5]">
                                    <img src="/assets/heart.svg" alt="heart" className="w-[20px] h-[20px]"/>
                                    Save to my list
                                </button>
                                <button
                                    className="gap-[14px] rounded-[8px] text-[18px] font-semibold justify-center items-center flex py-[10px] w-full border-[2px] border-[#DCDCE5]">
                                    <img src="/assets/chat.svg" alt="chat" className="w-[20px] h-[20px]"/>
                                    Send message
                                </button>
                            </div>
                            <div className="mt-[27px] flex flex-col gap-[16px]">
                                {/* <div className="flex gap-[10px]">
                                    <img src="/assets/stats.svg" alt="stats" className="mb-auto mt-[5px]"/>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Super popular</span>
                                        <span className="text-[14px]">7 new contacts and 10 lesson bookings in the last 48 hours</span>
                                    </div>
                                </div> */}
                                <div className="flex gap-[10px]">
                                    <img src="/assets/clock-black.svg" alt="clock" className="mb-auto mt-[5px]"/>
                                    <span className="text-[14px]">Usually responds in less than an hour</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
