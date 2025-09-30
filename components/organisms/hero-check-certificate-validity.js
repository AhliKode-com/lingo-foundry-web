/*
 * @Author: danteclericuzio
 * @Date: 2025-03-15 16:47:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-30 19:08:20
 */

"use client"

import { useState, useEffect } from "react";
import { useCertificateValidity } from "@/apis/studentReview";
import { useSearchParams } from "next/navigation";

// Certificate Display Component
function CertificateDisplay({ pdfUrl }) {
    const [iframeLoading, setIframeLoading] = useState(true);

    return (
        <div className="w-full h-full relative">
            {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="text-center">
                        <div className="w-[24px] h-[24px] relative mx-auto mb-2">
                            <div className="w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#E35D33] rounded-full animate-spin"></div>
                        </div>
                        <p className="text-sm text-gray-600">Loading Certificate...</p>
                    </div>
                </div>
            )}
            <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                style={{ minHeight: '600px' }}
                title="Certificate PDF"
                onLoad={() => {
                    console.log('PDF iframe loaded successfully');
                    setIframeLoading(false);
                }}
                onError={(e) => {
                    console.error('PDF iframe failed to load:', e);
                    setIframeLoading(false);
                }}
            />
        </div>
    );
}

export default function HeroCheckCertificateValidity() {
    const [certificateData, setCertificateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState(null);
    const [progress, setProgress] = useState(0);
    const searchParams = useSearchParams();
    const orderItemId = searchParams.get('orderItemId');
    const { checkCertificateValidity } = useCertificateValidity();

    useEffect(() => {
        const fetchCertificate = async () => {
            if (!orderItemId) {
                setError("No order item ID provided");
                setLoading(false);
                return;
            }

            try {
                setProgress(20); // Start progress
                const response = await checkCertificateValidity(orderItemId);
                setProgress(50); // API call completed
                
                if (response && response.data) {
                    setCertificateData(response.data);
                    setProgress(100); // Data loaded
                } else {
                    setError("Certificate not found");
                }
            } catch (err) {
                setError(err.message || "Failed to load certificate");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [orderItemId, checkCertificateValidity]);

    // Generate PDF when certificate data is available
    useEffect(() => {
        const generatePDF = async () => {
            if (!certificateData) return;

            setPdfLoading(true);
            setPdfError(null);
            setProgress(0); // Reset progress for PDF generation

            try {
                setProgress(10); // Starting PDF generation
                
                // Import jsPDF and html2canvas dynamically
                const jsPDF = (await import('jspdf')).jsPDF;
                const html2canvas = (await import('html2canvas')).default;
                setProgress(20); // Libraries loaded

                // Create a temporary container for the certificate
                const tempContainer = document.createElement('div');
                tempContainer.style.position = 'absolute';
                tempContainer.style.left = '-9999px';
                tempContainer.style.width = '1200px';
                tempContainer.style.height = '850px';
                tempContainer.style.background = '#fff';
                document.body.appendChild(tempContainer);
                setProgress(30); // Container created

                // Generate certificate HTML
                const certificateHTML = await generateCertificateHTML(certificateData);
                tempContainer.innerHTML = certificateHTML;
                setProgress(40); // HTML generated

                // Wait for images to load with a more efficient approach
                const images = tempContainer.querySelectorAll('img');
                const imagePromises = Array.from(images).map(img => {
                    return new Promise((resolve) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = resolve;
                            img.onerror = resolve; // Resolve even on error to not block
                            // Timeout after 1 second
                            setTimeout(resolve, 1000);
                        }
                    });
                });
                
                await Promise.all(imagePromises);
                setProgress(60); // Images loaded

                // Generate PDF
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4'
                });
                setProgress(70); // PDF created

                const canvas = await html2canvas(tempContainer, {
                    width: 1200,
                    height: 850,
                    scale: 1.5, // Reduced from 2 to 1.5 for faster rendering
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#f5f5f5',
                    logging: false, // Disable console logging
                    removeContainer: false, // Don't remove container automatically
                    imageTimeout: 5000 // 5 second timeout for images
                });
                setProgress(80); // Canvas generated

                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
                setProgress(90); // Image added to PDF
                
                // Generate blob URL for display
                const pdfBlob = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                
                // Small delay to ensure blob is ready (reduced from 100ms to 50ms)
                await new Promise(resolve => setTimeout(resolve, 50));
                
                setPdfUrl(pdfUrl);
                setProgress(100); // PDF ready

                // Clean up
                document.body.removeChild(tempContainer);
                setPdfLoading(false);

            } catch (error) {
                console.error('Error generating PDF:', error);
                setPdfError(error.message);
                setPdfLoading(false);
            }
        };

        generatePDF();
    }, [certificateData]);

    const generateCertificateHTML = async (certificateData) => {
        const convertImageToBase64 = async (url) => {
            try {
                const response = await fetch(url, { 
                    cache: 'force-cache', // Use cached version if available
                    headers: {
                        'Cache-Control': 'max-age=31536000' // 1 year cache
                    }
                });
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

        // Get base64 versions of images in parallel for faster loading
        const [logoBase64, sealBase64, sideBlueBase64, signatureBase64] = await Promise.all([
            convertImageToBase64('/assets/logo.png'),
            convertImageToBase64('/assets/seal.svg'),
            convertImageToBase64('/assets/side-blue.svg'),
            convertImageToBase64('/assets/sign-jess.png')
        ]);
        
        return `
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
      padding: 0;
      margin: 0;
    }

    .certificate {
      background: #fff;
      margin: 0;
      position: relative;
      overflow: hidden;
      width: 1200px; 
      height: 850px;
    }

    .blue-border { position: absolute; left: 0; top: 0; width: 300px; height: 100%; overflow: hidden; z-index: 0; }
    .seal { position: absolute; right: 80px; top: 200px; width: 200px; height: 240px; z-index: 3; }

    .side-blue-image { width: 100%; height: 100%; object-fit: cover; }

    .decorative-circles {
      position: absolute; right: 0; top: 0; width: 100%; height: 100%;
      opacity: 0.05; z-index: 0;
    }

    .circle { position: absolute; border-radius: 50%; background: #2E4BC6; }
    .circle-1 { width: 200px; height: 200px; top: 50px; right: 200px; }
    .circle-2 { width: 150px; height: 150px; top: 300px; right: 100px; }
    .circle-3 { width: 100px; height: 100px; top: 500px; right: 300px; }

    .watermark-logo {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      z-index: 1; pointer-events: none; display: flex; align-items: center; justify-content: center;
      mix-blend-mode: multiply;
    }

    .watermark-image { opacity: 0.08; width: 600px; height: auto; }

    .content {
      position: relative;
      z-index: 2;
      padding: 60px 80px 60px 320px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .logo { display: flex; align-items: center; margin-bottom: 40px; z-index: 2; }
    .logo-image { height: 60px; width: auto; max-width: 200px; }

    .certificate-title { font-size: 72px; font-weight: 700; color: #2E4BC6; letter-spacing: 2px; margin-bottom: 10px; line-height: 1; }
    .subtitle { font-size: 18px; color: #2E4BC6; font-weight: 600; letter-spacing: 3px; margin-bottom: 40px; }
    .presented-to { font-size: 16px; color: #666; font-weight: 600; letter-spacing: 2px; margin-bottom: 20px; }
    .recipient-name { font-family: 'Playfair Display', serif; font-size: 56px; color: #333; font-weight: 400; margin-bottom: 30px; }
    .completion-text { font-size: 18px; color: #666; margin-bottom: 20px; }
    .course-title { font-family: 'Playfair Display', serif; font-size: 42px; color: #333; margin-bottom: 30px; font-style: italic; }
    .description { font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 60px; max-width: 600px; }

    .signature-section { display: flex; justify-content: space-between; max-width: 500px; z-index: 2; margin-top: auto; }
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
    };

    if (loading || pdfLoading) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-[48px] h-[48px] relative mx-auto mb-6">
                        <div className="w-full h-full border-4 border-gray-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#E35D33] rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                        {loading ? 'Loading Certificate Data...' : 'Generating Certificate...'}
                    </h3>
                    <p className="text-gray-600 text-lg">
                        {loading ? 'Please wait while we fetch your certificate information' : 'Please wait while we prepare your certificate PDF'}
                    </p>
                    <div className="mt-6 w-64 bg-gray-200 rounded-full h-2 mx-auto">
                        <div 
                            className="bg-[#E35D33] h-2 rounded-full transition-all duration-500 ease-out" 
                            style={{width: `${progress}%`}}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="lingo-container py-[115px]">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                        <p className="text-gray-600">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!certificateData) {
        return (
            <div className="lingo-container py-[115px]">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4">No Certificate Found</h2>
                        <p className="text-gray-500">The requested certificate could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

        return (
            <div className="lingo-container py-[115px]">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Certificate Display - Center */}
                    <div className="flex-1 flex justify-center">
                        <div className="w-full max-w-4xl">
                            <div className="w-full border border-gray-200 rounded-lg overflow-auto shadow-lg bg-white" style={{maxHeight: '80vh'}}>
                                <CertificateDisplay 
                                    certificateData={certificateData} 
                                    pdfUrl={pdfUrl}
                                    pdfLoading={pdfLoading}
                                    pdfError={pdfError}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Certificate Details - Right Side */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Certificate Details</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Student Name</label>
                                    <p className="text-lg font-semibold text-gray-800">{certificateData.name}</p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Subject</label>
                                    <p className="text-lg font-semibold text-[#E35D33]">{certificateData.subjectName}</p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-600 block mb-1">Completion Date</label>
                                    <p className="text-lg font-semibold text-gray-800">{new Date(certificateData.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-green-800">Certificate Valid</h4>
                                    <p className="text-xs text-green-600">This certificate has been verified and is authentic.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}