import {Certificate} from "@/components/organisms/dashboard/courses/icons";
import {useState} from "react";
import Link from "next/link";
import { useOutstandingReviews, useCertificateDownload } from "@/apis/studentReview";
import ReviewModal from "@/components/organisms/dashboard/courses/review-modal";
import CertificateErrorModal from "@/components/organisms/dashboard/courses/certificate-error-modal";

export default function CourseCard({course, isSelected, onClick}) {
    const [isHovered, setIsHovered] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [outstandingBookingIds, setOutstandingBookingIds] = useState([]);
    const { checkOutstandingReviews, loading: reviewLoading } = useOutstandingReviews();
    const { downloadCertificate, loading: certificateLoading } = useCertificateDownload();

    const levelColor = {
        "General": "bg-[#D1DDFD] text-[#3051BE]",
        "Intermediate": "bg-[#FDEDD1] text-[#DF970C]",
        "Beginner": "bg-[#D1F4D0] text-[#1EB71B]",
        "Advanced": "bg-[#FDD3D1] text-[#C82112]"
    }

    const progress = course.attendedCount
    const total = course.sessionCount

    const handleCertificateDownload = async () => {
        try {
            const downloadUrl = await downloadCertificate(course.orderItemId);
            if (downloadUrl) {
                window.open(downloadUrl, '_blank');
            }
        } catch (error) {
            console.error("Error downloading certificate:", error);
            setShowErrorModal(true);
        }
    };

    const handleCertificateClick = async () => {
        try {
            const outstandingReviews = await checkOutstandingReviews(course.orderItemId);
            
            if (outstandingReviews && outstandingReviews.length > 0) {
                // Show review modal if there are outstanding reviews
                setOutstandingBookingIds(outstandingReviews);
                setShowReviewModal(true);
            } else {
                // Directly download certificate if no outstanding reviews
                await handleCertificateDownload();
            }
        } catch (error) {
            console.error("Error checking outstanding reviews:", error);
            // If checking reviews fails, try to download certificate anyway
            await handleCertificateDownload();
        }
    };

    const handleReviewComplete = async (isReviewed = false) => {
        setShowReviewModal(false);
        if (isReviewed) {
            // After reviews are submitted, download the certificate
            await handleCertificateDownload();
        }
    };

    return (
        <div
            className={`border rounded-2xl p-4 shadow-sm cursor-pointer transition-all border-gray-200 ${
                isSelected ? "border-[#D6DFFC] shadow-md" : "border-[#E0E0E0]"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            onClick={onClick}
            tabIndex={0}
        >
      <span
          className={`px-2 py-1 text-xs md:text-sm rounded-md ${levelColor[course.subjectLevel]}`}
      >
        {course.subjectLevel}
      </span>
            <p className="text-[#8D8D8D] mt-2 text-xs md:text-base">A Course by <span
                className="text-[#E35D33]">{course.tutorFirstName}{" "}{course.tutorLastName}</span></p>
            <h3 className="font-semibold text-base md:text-lg my-3 truncate"
                style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                {course.subjectName}
            </h3>
            <p className="text-[#8D8D8D] text-xs md:text-sm mt-1">
                Sessions completed {progress}/{total}
            </p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                <div
                    className="h-1.5 rounded-full"
                    style={{
                        width: `${progress === 0 ? "2" : (progress / total) * 100}%`,
                        backgroundColor: "#E35D33"
                    }}
                ></div>
            </div>
            {progress === total ? (
                // !course.downloadable ? (
                //     <div className="relative">
                //         <button
                //             className="mt-4 py-2 px-3 space-x-2 border border-[#E25D33] rounded-xl text-[#E25D33] cursor-pointer flex justify-center items-center text-xs md:text-base relative"
                //             onMouseEnter={() => setIsHovered(true)}
                //             onMouseLeave={() => setIsHovered(false)}
                //         >
                //             <Certificate className="ml-2"/>
                //             <p>Certificate</p>
                //         </button>

                //         {isHovered && (
                //             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-red-100 text-gray-800 text-sm p-3 rounded-md shadow-md">
                //                 Can be downloaded after 1 month from the beginning of the class
                //             </div>
                //         )}
                //     </div>
                // ) : (
                    <button 
                         onClick={handleCertificateClick}
                         disabled={reviewLoading || certificateLoading}
                         className="mt-4 py-2 px-3 space-x-2 border border-[#E25D33] rounded-xl bg-[#E25D33] hover:bg-orange-600 text-white cursor-pointer flex justify-center items-center text-xs md:text-base disabled:opacity-50"
                     >
                         <Certificate className="ml-2"/>
                         <p>{reviewLoading || certificateLoading ? 'Loading...' : 'Certificate'}</p>
                     </button>
                // )
            ) : (
                <>
                {course.remainingSession > 0 ? (
                    <Link href={'/student-dashboard/purchase-history'} passHref>
                        <button
                            className="mt-4 w-full py-2 border border-[#ACACAC] rounded-xl text-[#161616] hover:bg-gray-100 cursor-pointer text-xs md:text-base">
                            Set Schedule
                        </button>
                    </Link>
                    
                ) : (
                    <></>
                )}
                    <Link
                        href={`/student-dashboard/reschedule?orderItemId=${course.orderItemId}&tutorSubjectId=${course.tutorSubjectId}&tutorId=${course.tutorId}`} passHref
                    >
                        <button
                            className="mt-4 w-full py-2 border border-[#ACACAC] rounded-xl text-[#161616] hover:bg-gray-100 cursor-pointer text-xs md:text-base">
                            Reschedule
                        </button>
                    </Link>
                </>
            )}

            {/* Review Modal */}
            <ReviewModal 
                isOpen={showReviewModal}
                onClose={handleReviewComplete}
                bookingIds={outstandingBookingIds}
                courseName={course.subjectName}
                tutorName={`${course.tutorFirstName} ${course.tutorLastName}`}
            />

            {/* Certificate Error Modal */}
            <CertificateErrorModal 
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                orderItemId={course.orderItemId}
            />
        </div>
    )
}