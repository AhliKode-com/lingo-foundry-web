"use client"

import { useState, useEffect } from "react";
import { useSubmitUserReview } from "@/apis/studentReview";

/**
 * Review type constants for clear identification
 */
export const REVIEW_TYPE = {
    COURSE: 'course',
    PLATFORM: 'platform',
};

/**
 * CoursePlatformReviewModal - Combined modal for course and platform reviews
 * 
 * This modal follows the existing website design patterns for consistency.
 * Description/feedback is required for all reviews.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onComplete - Callback when all reviews are submitted (success: boolean)
 * @param {Function} props.onCancel - Callback when user cancels the review
 * @param {boolean} props.needsCourseReview - Whether course review is required
 * @param {boolean} props.needsPlatformReview - Whether platform review is required
 * @param {number} props.orderItemId - Order item ID for the review
 * @param {number} props.tutorSubjectId - Tutor subject ID for course review
 * @param {string} props.courseName - Name of the course being reviewed
 * @param {string} props.tutorName - Name of the tutor
 */
export default function CoursePlatformReviewModal({
    isOpen,
    onComplete,
    onCancel,
    needsCourseReview = false,
    needsPlatformReview = false,
    orderItemId,
    tutorSubjectId,
    courseName = "",
    tutorName = "",
}) {
    // Determine initial step based on which reviews are needed
    const getInitialStep = () => {
        if (needsCourseReview) return REVIEW_TYPE.COURSE;
        if (needsPlatformReview) return REVIEW_TYPE.PLATFORM;
        return null;
    };

    const [currentStep, setCurrentStep] = useState(getInitialStep);
    const [courseReviewSubmitted, setCourseReviewSubmitted] = useState(!needsCourseReview);
    const [platformReviewSubmitted, setPlatformReviewSubmitted] = useState(!needsPlatformReview);
    
    const { loading, error, submitUserReview } = useSubmitUserReview();

    // Sync currentStep when the modal opens or review requirements change
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(getInitialStep());
            setCourseReviewSubmitted(!needsCourseReview);
            setPlatformReviewSubmitted(!needsPlatformReview);
            setCourseFormData({ rating: 0, description: "" });
            setPlatformFormData({ rating: 0, description: "" });
        }
    }, [isOpen, needsCourseReview, needsPlatformReview]);

    // Course review form state
    const [courseFormData, setCourseFormData] = useState({
        rating: 0,
        description: "",
    });

    // Platform review form state
    const [platformFormData, setPlatformFormData] = useState({
        rating: 0,
        description: "",
    });

    // Reset form when modal opens/closes
    const resetForms = () => {
        setCourseFormData({ rating: 0, description: "" });
        setPlatformFormData({ rating: 0, description: "" });
        setCourseReviewSubmitted(!needsCourseReview);
        setPlatformReviewSubmitted(!needsPlatformReview);
        setCurrentStep(getInitialStep());
    };

    const handleSubmitCourseReview = async () => {
        // Require both rating and description
        if (courseFormData.rating === 0 || !courseFormData.description.trim()) return;

        try {
            await submitUserReview({
                rating: courseFormData.rating,
                tutorSubjectId: tutorSubjectId,
                description: courseFormData.description,
                orderItemId: orderItemId,
                authorType: "STUDENT",
            });
            
            setCourseReviewSubmitted(true);

            // Move to platform review if needed, otherwise complete
            if (needsPlatformReview && !platformReviewSubmitted) {
                setCurrentStep(REVIEW_TYPE.PLATFORM);
            } else {
                onComplete(true);
                resetForms();
            }
        } catch (err) {
            console.error("Failed to submit course review:", err);
        }
    };

    const handleSubmitPlatformReview = async () => {
        // Require both rating and description
        if (platformFormData.rating === 0 || !platformFormData.description.trim()) return;

        try {
            await submitUserReview({
                rating: platformFormData.rating,
                description: platformFormData.description,
                orderItemId: orderItemId,
                authorType: "STUDENT",
            });
            
            setPlatformReviewSubmitted(true);
            onComplete(true);
            resetForms();
        } catch (err) {
            console.error("Failed to submit platform review:", err);
        }
    };

    const StarRating = ({ value, onChange, testIdPrefix = "star" }) => {
        return (
            <div className="flex justify-center space-x-2" role="group" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className="focus:outline-none cursor-pointer p-1 transition-transform hover:scale-110"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
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
    };

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
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                index < currentIndex
                                    ? 'bg-green-500 text-white'
                                    : index === currentIndex
                                    ? 'bg-[#FEF2E1] text-[#D47C01]'
                                    : 'bg-[#EBEDEF] text-gray-500'
                            }`}
                        >
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

    if (!isOpen) return null;

    // Check if form is valid for submit button
    const isCourseFormValid = courseFormData.rating > 0 && courseFormData.description.trim().length > 0;
    const isPlatformFormValid = platformFormData.rating > 0 && platformFormData.description.trim().length > 0;

    return (
        <div 
            className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            data-testid="review-modal"
        >
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
                                <h2 className="text-xl font-semibold mb-4" data-testid="course-review-title">
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
                                    {courseFormData.rating === 0 && "Tap to rate"}
                                    {courseFormData.rating === 1 && "Poor"}
                                    {courseFormData.rating === 2 && "Fair"}
                                    {courseFormData.rating === 3 && "Good"}
                                    {courseFormData.rating === 4 && "Very Good"}
                                    {courseFormData.rating === 5 && "Excellent!"}
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
                                    data-testid="course-description-input"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    data-testid="course-cancel-button"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmitCourseReview}
                                    disabled={loading || !isCourseFormValid}
                                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    data-testid="course-submit-button"
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
                                <h2 className="text-xl font-semibold mb-4" data-testid="platform-review-title">
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
                                    {platformFormData.rating === 0 && "Tap to rate"}
                                    {platformFormData.rating === 1 && "Poor"}
                                    {platformFormData.rating === 2 && "Fair"}
                                    {platformFormData.rating === 3 && "Good"}
                                    {platformFormData.rating === 4 && "Very Good"}
                                    {platformFormData.rating === 5 && "Excellent!"}
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
                                    data-testid="platform-description-input"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    data-testid="platform-cancel-button"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmitPlatformReview}
                                    disabled={loading || !isPlatformFormValid}
                                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    data-testid="platform-submit-button"
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm" data-testid="error-message">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
