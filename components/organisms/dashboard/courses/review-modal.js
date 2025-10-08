"use client"

import { useState } from "react";
import { useSubmitReview } from "@/apis/studentReview";
import ReviewWarningModal from "@/components/organisms/dashboard/courses/review-warning-modal";

export default function ReviewModal({ isOpen, onClose, bookingIds, courseName, tutorName }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
    const [reviews, setReviews] = useState({});
    const [showWarningModal, setShowWarningModal] = useState(false);
    const { loading, error, submitReview } = useSubmitReview();

    const steps = ["feedback", "rating"];
    const currentBookingId = bookingIds[currentBookingIndex];

    const [formData, setFormData] = useState({
        difficulty: 6,
        difficultyRemark: "",
        communication: 0,
        punctuality: 0,
        lesson: 0,
        efficiency: 0,
        remark: ""
    });

    const resetForm = () => {
        setFormData({
            difficulty: 6,
            difficultyRemark: "",
            communication: 0,
            punctuality: 0,
            lesson: 0,
            efficiency: 0,
            remark: ""
        });
    };

    const handleClose = () => {
        setCurrentStep(0);
        setCurrentBookingIndex(0);
        setReviews({});
        setShowWarningModal(false);
        resetForm();
        onClose(true);
    };

    const handleCancel = () => {
        setShowWarningModal(true);
    };

    const handleWarningClose = () => {
        setShowWarningModal(false);
        setCurrentStep(0);
        setCurrentBookingIndex(0);
        setReviews({});
        setShowWarningModal(false);
        resetForm();
        onClose(false);
    };

    const handleContinueReview = () => {
        setShowWarningModal(false);
    };

    const handleNext = () => {
        if (currentStep === 0) {
            setCurrentStep(1);
        } else {
            // Save current review
            setReviews(prev => ({
                ...prev,
                [currentBookingId]: { ...formData }
            }));

            if (currentBookingIndex < bookingIds.length - 1) {
                // Move to next booking
                setCurrentBookingIndex(prev => prev + 1);
                setCurrentStep(0);
                resetForm();
            } else {
                // Submit all reviews
                handleSubmitReviews();
            }
        }
    };

    const handleSubmitReviews = async () => {
        try {
            // Submit current review first
            const allReviews = {
                ...reviews,
                [currentBookingId]: { ...formData }
            };

            // Submit each review
            for (const [bookingId, reviewData] of Object.entries(allReviews)) {
                await submitReview({
                    bookingId: parseInt(bookingId),
                    dificulty: reviewData.difficulty,
                    dificultyRemark: reviewData.difficultyRemark,
                    communication: reviewData.communication,
                    punctuality: reviewData.punctuality,
                    lesson: reviewData.lesson,
                    efficiency: reviewData.efficiency,
                    remark: reviewData.remark
                });
            }

            handleClose();
            // You might want to show a success message or refresh the course data
        } catch (err) {
            console.error("Failed to submit reviews:", err);
        }
    };

    const StarRating = ({ value, onChange, label, hint }) => {
        return (
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 w-24 font-bold">{label}</span>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => onChange(star)}
                                className="focus:outline-none cursor-pointer"
                            >
                                <svg
                                    className={`w-6 h-6 ${star <= value ? 'text-orange-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
                <span className="text-gray-500 mb-4 w-56">{hint}</span>
            </div>
        );
    };

    const AchievementBadge = ({ label }) => {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm font-medium">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                {label}
            </span>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {currentStep === 0 ? (
                        // Step 1: Help us improve Lingo Foundry
                        <>
                            <h2 className="text-xl font-semibold mb-4">Help us improve Lingo Foundry</h2>
                            <p className="text-gray-600 mb-6">
                                How was learning with Lingo Foundry today?
                            </p>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>Very Difficult</span>
                                    <span>Very Easy</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setFormData(prev => ({ ...prev, difficulty: num }))}
                                            className={`cursor-pointer w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium transition-colors ${
                                                formData.difficulty === num
                                                    ? 'bg-[#FEF2E1] text-[#D47C01]'
                                                    : 'bg-[#EBEDEF]'
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Can you tell us more?</label>
                                <textarea
                                    value={formData.difficultyRemark}
                                    onChange={(e) => setFormData(prev => ({ ...prev, difficultyRemark: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Fast and easy to use tool."
                                />
                            </div>
                        </>
                    ) : (
                        // Step 2: Rate Your Course
                        <>
                            <h2 className="text-xl font-semibold mb-4">Rate Your Course</h2>
                            <p className="text-gray-600 mb-6">
                                How was the overall learning experience?
                            </p>

                            <div className="mb-6">
                                <StarRating
                                    value={formData.communication}
                                    onChange={(value) => setFormData(prev => ({ ...prev, communication: value }))}
                                    label="Engagement"
                                    hint="Was the lesson interesting and interactive?"
                                />
                                <StarRating
                                    value={formData.punctuality}
                                    onChange={(value) => setFormData(prev => ({ ...prev, punctuality: value }))}
                                    label="Clarity"
                                    hint="Were the explanations clear and easy to follow?"
                                />
                                <StarRating
                                    value={formData.lesson}
                                    onChange={(value) => setFormData(prev => ({ ...prev, lesson: value }))}
                                    label="Usefulness"
                                    hint="Will you apply what you learned?"
                                />
                                <StarRating
                                    value={formData.efficiency}
                                    onChange={(value) => setFormData(prev => ({ ...prev, efficiency: value }))}
                                    label="Pace"
                                    hint="Was the speed too fast, too slow, or just right?"
                                />
                            </div>

                            {(formData.communication === 5 || formData.punctuality === 5 || formData.lesson === 5 || formData.efficiency === 5) && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {formData.communication === 5 && <AchievementBadge label="Engagement" />}
                                        {formData.punctuality === 5 && <AchievementBadge label="Clarity" />}
                                        {formData.lesson === 5 && <AchievementBadge label="Usefulness" />}
                                        {formData.efficiency === 5 && <AchievementBadge label="Pace" />}
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Can you tell us more?</label>
                                <textarea
                                    value={formData.remark}
                                    onChange={(e) => setFormData(prev => ({ ...prev, remark: e.target.value }))}
                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add feedback"
                                />
                            </div>
                        </>
                    )}

                    {/* Progress indicator */}
                    {bookingIds.length > 1 && (
                        <div className="text-center text-sm text-gray-500 mb-4">
                            Review course {currentBookingIndex + 1} of {bookingIds.length}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={loading}
                            className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 
                             currentStep === 1 && currentBookingIndex === bookingIds.length - 1 ? 'Submit' : 'Next'}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Warning Modal */}
            <ReviewWarningModal 
                isOpen={showWarningModal}
                onClose={handleWarningClose}
                onContinueReview={handleContinueReview}
            />
        </div>
    );
} 