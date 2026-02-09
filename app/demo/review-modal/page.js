"use client"

import { useState } from "react";

/**
 * Demo page to preview the CoursePlatformReviewModal with mocked API
 * Access at: http://localhost:3000/demo/review-modal
 */

// Inline mock modal for demo purposes (bypasses real API)
function DemoReviewModal({
    isOpen,
    onComplete,
    onCancel,
    needsCourseReview,
    needsPlatformReview,
    orderItemId,
    tutorSubjectId,
    courseName,
    tutorName,
}) {
    const REVIEW_TYPE = { COURSE: 'course', PLATFORM: 'platform' };
    
    const getInitialStep = () => {
        if (needsCourseReview) return REVIEW_TYPE.COURSE;
        if (needsPlatformReview) return REVIEW_TYPE.PLATFORM;
        return null;
    };

    const [currentStep, setCurrentStep] = useState(getInitialStep);
    const [courseReviewSubmitted, setCourseReviewSubmitted] = useState(!needsCourseReview);
    const [loading, setLoading] = useState(false);

    const [courseFormData, setCourseFormData] = useState({ rating: 0, description: "" });
    const [platformFormData, setPlatformFormData] = useState({ rating: 0, description: "" });

    // Check if forms are valid (rating and description required)
    const isCourseFormValid = courseFormData.rating > 0 && courseFormData.description.trim().length > 0;
    const isPlatformFormValid = platformFormData.rating > 0 && platformFormData.description.trim().length > 0;

    // Reset when modal opens
    useState(() => {
        if (isOpen) {
            setCourseFormData({ rating: 0, description: "" });
            setPlatformFormData({ rating: 0, description: "" });
            setCourseReviewSubmitted(!needsCourseReview);
            setCurrentStep(getInitialStep());
        }
    }, [isOpen]);

    const mockSubmit = async (data) => {
        setLoading(true);
        console.log("📤 API Call: POST /api/student/user-review", data);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        setLoading(false);
        return { success: true };
    };

    const handleSubmitCourseReview = async () => {
        if (!isCourseFormValid) return;
        await mockSubmit({
            rating: courseFormData.rating,
            tutorSubjectId: tutorSubjectId,
            description: courseFormData.description,
            orderItemId: orderItemId,
        });
        setCourseReviewSubmitted(true);
        if (needsPlatformReview) {
            setCurrentStep(REVIEW_TYPE.PLATFORM);
        } else {
            onComplete(true);
        }
    };

    const handleSubmitPlatformReview = async () => {
        if (!isPlatformFormValid) return;
        await mockSubmit({
            rating: platformFormData.rating,
            description: platformFormData.description,
            orderItemId: orderItemId,
        });
        onComplete(true);
    };

    const StarRating = ({ value, onChange, testIdPrefix = "star" }) => (
        <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className="focus:outline-none cursor-pointer p-1 transition-transform hover:scale-110"
                    data-testid={`${testIdPrefix}-${star}`}
                >
                    <svg
                        className={`w-10 h-10 ${star <= value ? 'text-orange-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
    );

    const ProgressIndicator = () => {
        const steps = [];
        if (needsCourseReview) steps.push({ type: REVIEW_TYPE.COURSE, label: 'Course' });
        if (needsPlatformReview) steps.push({ type: REVIEW_TYPE.PLATFORM, label: 'Platform' });
        if (steps.length <= 1) return null;
        const currentIndex = steps.findIndex(s => s.type === currentStep);

        return (
            <div className="flex justify-center items-center space-x-2 mb-6">
                {steps.map((step, index) => (
                    <div key={step.type} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            index < currentIndex ? 'bg-green-500 text-white' :
                            index === currentIndex ? 'bg-[#FEF2E1] text-[#D47C01]' : 'bg-[#EBEDEF] text-gray-500'
                        }`}>
                            {index < currentIndex ? '✓' : index + 1}
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-8 h-1 mx-1 ${index < currentIndex ? 'bg-green-500' : 'bg-[#EBEDEF]'}`} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const getRatingLabel = (rating) => {
        if (rating === 0) return "Tap to rate";
        if (rating === 1) return "Poor";
        if (rating === 2) return "Fair";
        if (rating === 3) return "Good";
        if (rating === 4) return "Very Good";
        return "Excellent!";
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <ProgressIndicator />

                    {currentStep === REVIEW_TYPE.COURSE && (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-[#FEF2E1] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#D47C01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Rate Your Course
                                </h2>
                                {courseName && (
                                    <p className="text-gray-600 mb-6">
                                        How was learning <span className="font-medium">{courseName}</span>
                                        {tutorName && <span className="text-gray-500"> with {tutorName}</span>}?
                                    </p>
                                )}
                            </div>

                            <div className="mb-6">
                                <StarRating
                                    value={courseFormData.rating}
                                    onChange={(value) => setCourseFormData(prev => ({ ...prev, rating: value }))}
                                    testIdPrefix="course-star"
                                />
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    {getRatingLabel(courseFormData.rating)}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">
                                    Can you tell us more? <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={courseFormData.description}
                                    onChange={(e) => setCourseFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="What did you like about this course? Any suggestions for improvement?"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmitCourseReview}
                                    disabled={loading || !isCourseFormValid}
                                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Submitting...' : needsPlatformReview ? 'Next' : 'Submit'}
                                </button>
                            </div>
                        </>
                    )}

                    {currentStep === REVIEW_TYPE.PLATFORM && (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-[#FEF2E1] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[#D47C01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Help us improve Lingo Foundry
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    How was learning with Lingo Foundry today?
                                </p>
                            </div>

                            <div className="mb-6">
                                <StarRating
                                    value={platformFormData.rating}
                                    onChange={(value) => setPlatformFormData(prev => ({ ...prev, rating: value }))}
                                    testIdPrefix="platform-star"
                                />
                                <p className="text-center text-sm text-gray-500 mt-2">
                                    {getRatingLabel(platformFormData.rating)}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">
                                    Can you tell us more? <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={platformFormData.description}
                                    onChange={(e) => setPlatformFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="What do you like about Lingo Foundry? How can we make it better?"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmitPlatformReview}
                                    disabled={loading || !isPlatformFormValid}
                                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ReviewModalDemo() {
    const [showModal, setShowModal] = useState(false);
    const [needsCourseReview, setNeedsCourseReview] = useState(true);
    const [needsPlatformReview, setNeedsPlatformReview] = useState(true);
    const [lastResult, setLastResult] = useState(null);

    const handleComplete = (success) => {
        setShowModal(false);
        setLastResult(success ? "✅ Reviews submitted successfully! Check browser console for API payloads." : "Modal closed without submission");
    };

    const handleCancel = () => {
        setShowModal(false);
        setLastResult("⚠️ Review cancelled by user.");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Review Modal Demo
                </h1>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Configuration</h2>
                    
                    <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={needsCourseReview}
                                onChange={(e) => setNeedsCourseReview(e.target.checked)}
                                className="w-5 h-5 text-purple-600"
                            />
                            <span>Needs Course Review</span>
                        </label>

                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={needsPlatformReview}
                                onChange={(e) => setNeedsPlatformReview(e.target.checked)}
                                className="w-5 h-5 text-blue-600"
                            />
                            <span>Needs Platform Review</span>
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Mock Course Data</h2>
                    <div className="text-gray-600 space-y-1">
                        <p><strong>Course:</strong> English Conversation 101</p>
                        <p><strong>Tutor:</strong> John Smith</p>
                        <p><strong>Order Item ID:</strong> 12345</p>
                        <p><strong>Tutor Subject ID:</strong> 67890</p>
                    </div>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    disabled={!needsCourseReview && !needsPlatformReview}
                    className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors text-lg"
                >
                    {!needsCourseReview && !needsPlatformReview 
                        ? "Select at least one review type"
                        : "Open Review Modal"
                    }
                </button>

                {lastResult && (
                    <div className={`mt-6 p-4 rounded-lg ${
                        lastResult.includes("successfully") 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                    }`}>
                        {lastResult}
                    </div>
                )}

                <div className="mt-8 bg-gray-800 text-gray-100 rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-3">API Payloads (Console)</h2>
                    <p className="text-gray-400 text-sm">
                        Open browser DevTools (F12) → Console tab to see the API calls when you submit reviews.
                    </p>
                    <div className="mt-4 text-sm font-mono">
                        <p className="text-purple-400">{/* Course Review */}Course Review</p>
                        <pre className="text-gray-300">{`POST /api/student/user-review
{
  "rating": 4,
  "tutorSubjectId": 67890,
  "description": "...",
  "orderItemId": 12345
}`}</pre>
                        <p className="text-blue-400 mt-4">{/* Platform Review */}Platform Review</p>
                        <pre className="text-gray-300">{`POST /api/student/user-review
{
  "rating": 5,
  "description": "...",
  "orderItemId": 12345
}`}</pre>
                    </div>
                </div>
            </div>

            <DemoReviewModal
                isOpen={showModal}
                onComplete={handleComplete}
                onCancel={handleCancel}
                needsCourseReview={needsCourseReview}
                needsPlatformReview={needsPlatformReview}
                orderItemId={12345}
                tutorSubjectId={67890}
                courseName="English Conversation 101"
                tutorName="John Smith"
            />
        </div>
    );
}
