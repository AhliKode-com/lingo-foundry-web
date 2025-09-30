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

    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
    };

    const isSafari = () => {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
               /iPad|iPhone|iPod/.test(navigator.userAgent);
    };

    const createAndDownloadPDF = async (htmlContent, filename) => {
        // Check if mobile device or Safari
        if (isMobile() || isSafari()) {
            // Mobile/Safari: Show certificate with print dialog
            showMobileCertificate(htmlContent, filename);
            return;
        }

        try {
            // Desktop (non-Safari): Generate PDF
            const jsPDF = (await import('jspdf')).jsPDF;
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.style.width = '297mm';
            iframe.style.height = '210mm';
            document.body.appendChild(iframe);

            iframe.contentDocument.open();
            iframe.contentDocument.write(htmlContent);
            iframe.contentDocument.close();

            await new Promise(resolve => setTimeout(resolve, 2000));

            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(iframe.contentDocument.body, {
                width: 1240,
                height: 888,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#f5f5f5'
            });

            document.body.removeChild(iframe);

            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
            pdf.save(filename);

        } catch (error) {
            console.error('Error creating PDF:', error);
            showMobileCertificate(htmlContent, filename);
        }
    };

    const showMobileCertificate = (htmlContent, filename) => {
        // Add Safari-specific print styles and auto-print script
        const safariOptimizedHtml = htmlContent.replace('</head>', `
            <style>
                /* Safari-specific print optimizations */
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 0;
                    }
                    
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    
                    .certificate {
                        page-break-inside: avoid;
                        width: 100% !important;
                        height: 100% !important;
                    }
                }
            </style>
        </head>`).replace('</body>', `
            <script>
                // Auto-trigger print dialog when page loads
                window.addEventListener('load', function() {
                    setTimeout(function() {
                        window.print();
                    }, 1000);
                });
                
                // Clean up blob URL after print (if possible)
                window.addEventListener('afterprint', function() {
                    // Note: We can't easily navigate back from blob URL, 
                    // but browser back button will work
                });
            </script>
        </body>`);

        // Create blob URL for certificate
        const blob = new Blob([safariOptimizedHtml], { type: 'text/html' });
        const certificateUrl = URL.createObjectURL(blob);
        
        // Navigate to certificate - this will trigger the print dialog automatically
        window.open(certificateUrl, '_self');
    };

    const handleCertificateDownload = async () => {
        try {
            const response = await downloadCertificate(course.orderItemId);
            
            let certificateData = null;
            
            // Handle different response structures
            if (response && typeof response === 'object') {
                if (response.data && response.data.name) {
                    // Structure: { data: { name, subjectName, date, qrBase64 } }
                    certificateData = response.data;
                } else if (response.name) {
                    // Structure: { name, subjectName, date, qrBase64 }
                    certificateData = response;
                } else if (response.error === false && response.data) {
                    // Structure: { error: false, message: "...", data: { name, subjectName, date, qrBase64 } }
                    certificateData = response.data;
                }
            }
            
            if (certificateData && certificateData.name) {
                // Generate certificate HTML with the response data
                await generateCertificateHTML(certificateData);
            } else {
                setShowErrorModal(true);
            }
        } catch (error) {
            setShowErrorModal(true);
        }
    };

    const generateCertificateHTML = async (certificateData) => {
        console.log("Generating certificate with data:", certificateData); // Debug log
        
        // Validate certificate data
        if (!certificateData || !certificateData.name) {
            console.error("Invalid certificate data:", certificateData);
            setShowErrorModal(true);
            return;
        }

        // Convert images to base64 for embedding
        const convertImageToBase64 = async (url) => {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.error('Error converting image to base64:', error);
                return '';
            }
        };

        // Get base64 versions of images
        const logoBase64 = await convertImageToBase64('/assets/logo.png');
        const sealBase64 = await convertImageToBase64('/assets/seal.svg');
        const sideBlueBase64 = await convertImageToBase64('/assets/side-blue.svg');
        const signatureBase64 = await convertImageToBase64('/assets/sign-jess.png');
        
        // Generate the HTML content with dynamic data
        const certificateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Certificate of Appreciation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Open Sans', sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }

    /* ===== Base layout ===== */
    .certificate {
      background: #fff;
      margin: 0 auto;
      position: relative;           /* ensure children stack against this */
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    /* ===== Screen preview (your px layout) ===== */
    @media screen {
      .certificate { width: 1200px; height: 850px; } /* ~A4 landscape ratio */

      .content {
        position: relative;
        z-index: 2;
        padding: 60px 80px 60px 320px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .blue-border { position: absolute; left: 0; top: 0; width: 300px; height: 100%; overflow: hidden; z-index: 0; }
      .seal { position: absolute; right: 80px; top: 200px; width: 200px; height: 240px; z-index: 3; }
    }

    .side-blue-image { width: 100%; height: 100%; object-fit: cover; }

    .decorative-circles {
      position: absolute; right: 0; top: 0; width: 100%; height: 100%;
      opacity: 0.05; z-index: 0;     /* keep behind everything */
    }

    .circle { position: absolute; border-radius: 50%; background: #2E4BC6; }
    .circle-1 { width: 200px; height: 200px; top: 50px; right: 200px; }
    .circle-2 { width: 150px; height: 150px; top: 300px; right: 100px; }
    .circle-3 { width: 100px; height: 100px; top: 500px; right: 300px; }

    .watermark-logo {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 1; pointer-events: none; display: flex; align-items: center; justify-content: center;
      mix-blend-mode: multiply;      /* prevents washing out text in some printers */
    }

    .watermark-image { opacity: 0.08; width: 600px; height: auto; }

    .logo { display: flex; align-items: center; margin-bottom: 40px; z-index: 2; }
    .logo-image { height: 60px; width: auto; max-width: 200px; }

    .certificate-title { font-size: 72px; font-weight: 700; color: #2E4BC6; letter-spacing: 2px; margin-bottom: 10px; line-height: 1; }
    .subtitle { font-size: 18px; color: #2E4BC6; font-weight: 600; letter-spacing: 3px; margin-bottom: 40px; }
    .presented-to { font-size: 16px; color: #666; font-weight: 600; letter-spacing: 2px; margin-bottom: 20px; }
    .recipient-name { font-family: 'Playfair Display', serif; font-size: 56px; color: #333; font-weight: 400; margin-bottom: 30px; }
    .completion-text { font-size: 18px; color: #666; margin-bottom: 20px; }
    .course-title { font-family: 'Playfair Display', serif; font-size: 42px; color: #333; margin-bottom: 30px; font-style: italic; }
    .description { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 60px; max-width: 600px; }

    .signature-section { display: flex; justify-content: space-between; max-width: 500px; z-index: 2; }
    .signature-line { position: relative; text-align: center; display: flex; flex-direction: row; }
    .signature-image { width: 125%; object-fit: contain; position: absolute; right: -115px; top: -60px; }
    .signature-name { font-size: 14px; color: #666; font-weight: 600; letter-spacing: 1px; position: absolute; right: -130px; top: 50px; }
    .line { width: 200px; height: 2px; background: #333; margin-bottom: 10px; }
    .signature-label { font-size: 14px; color: #666; font-weight: 600; letter-spacing: 1px; }

    .seal-image { width: 100%; height: 100%; object-fit: contain; }

    .qr-code { 
      position: absolute; 
      right: 20px; 
      bottom: 20px; 
      width: 100px; 
      height: 100px; 
      z-index: 4;
    }

    /* ===== Print: exact A4 landscape on one page, correct stacking ===== */
    @page { size: A4 landscape; margin: 0; }

    @media print {
      html, body {
        width: 297mm; height: 210mm; margin: 0; background: #fff !important;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      body { padding: 0; }

      .certificate {
        width: 297mm; height: 210mm; margin: 0; box-shadow: none; overflow: hidden; page-break-inside: avoid;
        position: relative;
      }

      /* Ensure content sits on top in print */
      .decorative-circles { z-index: 0 !important; }
      .watermark-logo    { z-index: 1 !important; }
      .content           { position: relative; z-index: 2 !important; }
      .seal              { position: absolute; z-index: 3 !important; }

      /* Use mm so layout scales perfectly to paper */
      .blue-border { width: 60mm; height: 100%; left: 0; top: 0; position: absolute; overflow: hidden; }
      .content    { padding: 20mm 20mm 20mm 75mm; height: 100%; display: flex; flex-direction: column; }

      .seal { right: 20mm; top: 40mm; width: 55mm; height: auto; }

      /* Slightly smaller type for print if needed */
      .certificate-title { font-size: 60px; }
      .recipient-name    { font-size: 48px; }
      .course-title      { font-size: 36px; }
      .description       { max-width: 160mm; } /* avoid clipping */
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="blue-border">
      <img src="${sideBlueBase64}" alt="" class="side-blue-image" />
    </div>

    <div class="decorative-circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="watermark-logo">
      <img src="${logoBase64}" alt="Lingo Foundry" class="watermark-image" />
    </div>

    <div class="content">
      <div class="logo">
        <img src="${logoBase64}" alt="Lingo Foundry" class="logo-image" />
      </div>

      <h1 class="certificate-title">CERTIFICATE</h1>
      <h2 class="subtitle">OF APPRECIATION</h2>

      <p class="presented-to">THIS CERTIFICATE IS PRESENTED TO</p>
      <h3 class="recipient-name">${certificateData.name}</h3>

      <p class="completion-text">Has successfully completed the course</p>
      <h4 class="course-title">"${certificateData.subjectName}"</h4>

      <p class="description">
        This certificate is awarded in recognition of successful completion of the course. 
        The recipient has demonstrated dedication and commitment to learning, achieving 
        the required standards and objectives set forth in the curriculum. This achievement 
        represents a significant milestone in their educational journey and professional development.
      </p>

      <div class="signature-section">
        <div class="signature-line">
          <p class="signature-label">DATE</p>
          <p style="font-size: 14px; color: #666; margin-left: 10px;">${new Date(certificateData.date).toLocaleDateString()}</p>
        </div>
        <div class="signature-line">
          <p class="signature-label">SIGNATURE</p>
            <img src="${signatureBase64}" alt="Signature" class="signature-image" />
            <p class="signature-name">Jessika Budiman</p>
        </div>
      </div>
    </div>

    <div class="seal">
      <img src="${sealBase64}" alt="Course Completion Seal" class="seal-image" />
    </div>

    ${certificateData.qrBase64 ? `
    <div class="qr-code">
      <img src="data:image/png;base64,${certificateData.qrBase64}" alt="QR Code" style="width: 100%; height: 100%;" />
    </div>
    ` : ''}
  </div>
</body>
</html>`;

        // Create and auto-download PDF
        await createAndDownloadPDF(certificateHTML, `${certificateData.name}_${certificateData.subjectName}_Certificate.pdf`);
    };

    const handleCertificateClick = async () => {
        try {
            const outstandingReviews = await checkOutstandingReviews(course.orderItemId);
            
            if (outstandingReviews && outstandingReviews.length > 0) {
                // Show review modal if there are outstanding reviews
                setOutstandingBookingIds(outstandingReviews);
                setShowReviewModal(true);
            } else {
                // Directly download certificate in same tab
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
            // After reviews are submitted, download the certificate in same tab
            await handleCertificateDownload();
        }
    };

    return (
        <div
            className={`justify-between flex flex-col border rounded-2xl p-4 shadow-sm cursor-pointer transition-all border-gray-200 ${
                isSelected ? "border-[#D6DFFC] shadow-md" : "border-[#E0E0E0]"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            onClick={onClick}
            tabIndex={0}
        >
            <span
                className={`px-2 py-1 text-xs md:text-sm w-fit rounded-md ${levelColor[course.subjectLevel]}`}
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
                            className="mt-4 py-2 px-3 w-full space-x-2 border border-[#E25D33] rounded-xl bg-[#E25D33] hover:bg-orange-600 text-white cursor-pointer flex justify-center items-center text-xs md:text-base disabled:opacity-50"
                        >  
                            {reviewLoading || certificateLoading ? (
                                <div className="w-[24px] h-[24px] relative">
                                    <div className="w-full h-full border-4 border-gray-200 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#E25D33] rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <Certificate className="ml-2"/>
                            )}
                            <p>{reviewLoading || certificateLoading ? 'Downloading...' : 'Download Certificate'}</p>
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