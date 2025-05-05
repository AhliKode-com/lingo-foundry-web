/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-05 22:08:12
 */

"use client"
import { useForm } from "react-hook-form"
import { FaInfoCircle } from "react-icons/fa"
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import {useTutorController} from "@/apis/tutorController";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function ProfileDescription({ setCurrentStep }) {
    const { registerTutor } = useTutorController()
    const router = useRouter()

    useEffect(() => {
        const savedData = localStorage.getItem("applyTutorStep4Data")
        if (savedData) {
            const parsedData = JSON.parse(savedData)

            // Reset the form with the saved data
            reset({
                introduction: parsedData.introduction || "",
                teachingExperience: parsedData.teachingExperience || "",
                courseMotivation: parsedData.courseMotivation || "",
                title: parsedData.title || "",
            })
        }
    }, [])

    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            introduction: "",
            teachingExperience: "",
            courseMotivation: "",
            title: "",
        },
    })

    // watch all fields to calculate total character count
    const title = watch("title") || ""

    // calculate total character count
    const totalCharCount = title.length

    const MAX_CHARS = 400
    const isOverLimit = totalCharCount > MAX_CHARS

    const onSubmit = async (data) => {
        if (isOverLimit) {
            alert("Please reduce your text to stay within the 400 character limit.")
            return
        }

        localStorage.setItem("applyTutorStep4Data", JSON.stringify(data))

        const step1Data = JSON.parse(localStorage.getItem("applyTutorStep1Data"))
        const step2Data = localStorage.getItem("applyTutorStep2Data") || ""
        const step3Data = JSON.parse(localStorage.getItem("applyTutorStep3Data"))
        const step4Data = JSON.parse(localStorage.getItem("applyTutorStep4Data"))

        const formData = {
            "firstName": step1Data.firstName,
            "lastName": step1Data.lastName,
            "bio": user.bio,
            "profilePhotoObjectKey": step2Data?.split("download/")[1] || "",
            "countryOfBirth": step1Data.countryOfBirth,
            "teachSubject": step1Data.subjectYouTeach,
            "expertises": step1Data.expertise,
            "languages": step1Data.languages,
            "mobileNumber": step1Data.phoneNumber,
            "certificates": step3Data.certificates.map((value) => {
                return {
                    "subject": value.subject,
                    "type": value.certificateType,
                    "description": value.description,
                    "issuedBy": value.issuedBy,
                    "startYear": Number(value.startYear),
                    "endYear": Number(value.endYear),
                    "fileObjectKey": value.file?.split("download/")[1] || ""
                }
            }),
            "cvFileObjectKey": step3Data.cvFile?.split("download/")[1] || "",
            "introduction": step4Data.introduction,
            "teachingExperience": step4Data.teachingExperience,
            "courseMotivation": step4Data.courseMotivation,
            "title": step4Data.title,
            "academicDegreeLevel": null,
            "academicSubject": null,
            "headline": null
        }

        toast.loading("Registering your tutor profile...", {
            autoClose: 5000,
        })
        const response = await registerTutor(formData)
        console.log(response)

        if (response.error) {
            toast.dismiss()
            toast.error(response.error.message)
            return;
        }

        toast.dismiss()
        localStorage.removeItem("applyTutorCurrentStep")
        localStorage.removeItem("applyTutorStep1Data")
        localStorage.removeItem("applyTutorStep2Data")
        localStorage.removeItem("applyTutorStep3Data")
        localStorage.removeItem("applyTutorStep4Data")
        toast.success("register successfully.")
        router.push("/tutor-register-success")
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile description</h1>
            <p className="text-gray-700 mb-2">
                This info will go on your public profile. Write it in the language you&#39;ll be teaching and make sure to follow
                our{" "}
                <Link href="#" className="underline font-medium">
                    guidelines to get approved
                </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
                {/* Section 1: Introduce yourself */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">1. Introduce yourself</h2>
                    <p className="text-gray-700 mb-4">
                        Show potential students who you are! Share your teaching experience and passion for education, and briefly
                        mention your interests and hobbies.
                    </p>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] min-h-[120px]"
                        placeholder="Hello, my name is... and I come from..."
                        {...register("introduction", { required: true })}
                    />

                    <div className="mt-2 bg-red-50 p-3 rounded-md flex items-start">
                        <FaInfoCircle className="text-red-400 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">
                            Don&#39;t include your last name or present your information in a CV format
                        </p>
                    </div>
                </div>

                {/* Section 2: Teaching experience */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">2. Teaching experience</h2>
                    <p className="text-gray-700 mb-4">
                        Provide a detailed description of relevant teaching experience. Include certifications, teaching practices,
                        education, and areas of expertise.
                    </p>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] min-h-[120px]"
                        placeholder="I have 5 years of teaching experience. I am TEFL Certified and my classes are..."
                        {...register("teachingExperience", { required: true })}
                    />
                </div>

                {/* Section 3: About the course */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        3. About the course - Provide motivation to prospective students
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Motivate students to book their first lesson. Highlight the benefits of studying with you!
                    </p>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] min-h-[120px]"
                        placeholder="Book a trial lesson with me so we can discuss your goals and how I can help you achieve them..."
                        {...register("courseMotivation", { required: true })}
                    />

                    <div className="mt-2 bg-red-50 p-3 rounded-md flex items-start">
                        <FaInfoCircle className="text-red-400 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-gray-700 text-sm">
                            Do not include any information regarding free trial lessons or discounts, or any of your personal contact
                            details
                        </p>
                    </div>
                </div>

                {/* Section 4: Title */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">4. Make an interesting title</h2>
                    <p className="text-gray-700 mb-4">
                        The title is the first thing students see about you. Make it eye-catching, mention the language you teach,
                        and make students interested in reading the rest of your description.
                    </p>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] min-h-[80px]"
                        placeholder="Certified tutor with 5 years experience"
                        {...register("title", { required: true })}
                    />
                </div>

                {/* Character counter */}
                <div className={`text-right ${isOverLimit ? "text-red-500" : "text-gray-500"}`}>
                    {totalCharCount} / {MAX_CHARS}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {setCurrentStep(3)}}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className={`px-8 py-3 bg-[#E35D33] text-white rounded-lg hover:bg-[#d04e26] transition-colors ${isOverLimit ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isOverLimit}
                    >
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

