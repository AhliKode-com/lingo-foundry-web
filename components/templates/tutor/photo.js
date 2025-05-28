/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-28 15:50:55
 */

"use client"

import {useState, useRef, useEffect} from "react"
import Image from "next/image"
import {toast} from "react-toastify";
import postUploadFile from "@/apis/static-file/postUploadFile";
import { useAuth } from "@/context/AuthContext";

export default function Photo({ setCurrentStep }) {
    const [photo, setPhoto] = useState(null)
    const { user } = useAuth()
    const [previewUrl, setPreviewUrl] = useState(null)
    const fileInputRef = useRef(null)
    const { uploadFile, objectKey, error } = postUploadFile()

    useEffect(() => {
        const url = localStorage.getItem("applyTutorStep2Data")
        if (url) {
            setPreviewUrl(url)
        }
    }, [])

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // check file type
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
                alert("Please upload a JPG or PNG file")
                return
            }

            // check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB")
                return
            }

            setPhoto(file)
            const objectUrl = URL.createObjectURL(file)
            setPreviewUrl(objectUrl)
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    const handleDeletePhoto = () => {
        setPhoto(null)
        setPreviewUrl(null)
        localStorage.removeItem("applyTutorStep2Data")
    }

    const handleSaveAndContinue = async () => {
        if (!photo) {
            localStorage.setItem("applyTutorCurrentStep", "3")
            setCurrentStep(3)
            return;
        }

        toast.loading("Upload in progress...")
        const fileUrl = await uploadFile(photo)

        if (error) {
            return
        }

        toast.dismiss()
        toast.success("Upload successful")

        localStorage.setItem("applyTutorStep2Data", fileUrl)
        localStorage.setItem("applyTutorCurrentStep", "3")
        setCurrentStep(3)
    }

    return (
        <div className="lingo-container flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile photo</h1>
            <p className="text-lg text-gray-700 mb-6">Choose a photo that will help learners get to know you.</p>

            <hr className="my-6" />

            <div className="flex-col md:flex-row flex items-center gap-6 mb-6">
                <div
                    className="w-[150px] h-[150px] shrink-0 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden"
                    onClick={handleUploadClick}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Profile preview"
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center p-4">
                            <p className="text-gray-500 text-sm">JPG or PNG,</p>
                            <p className="text-gray-500 text-sm">max 5MB</p>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">{user?.username}</h2>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-4 bg-red-500 relative">
                            <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1 text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                        <span>Teaches Indonesian and English lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                        </svg>
                        <span>Speaks Indonesian (Native)</span>
                    </div>
                </div>
            </div>

            <hr className="my-6" />

            <button
                onClick={previewUrl? handleDeletePhoto : handleUploadClick}
                className={`${previewUrl? 'bg-[#e33333]' : 'bg-[#E35D33]'} w-full  text-white py-3 px-4 rounded-lg hover:bg-[#d04e26] transition-colors mb-8`}
            >
                {previewUrl? 'Change photo' : 'Upload photo'}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/jpeg, image/png"
                className="hidden"
            />

            <h2 className="text-2xl font-bold mb-6">What your photo needs</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="border border-gray-200 rounded-md overflow-hidden">
                    <Image
                        src="/assets/tutor-steps/photo/1.png"
                        alt="Example photo 1"
                        width={150}
                        height={150}
                        className="w-full h-auto"
                    />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                    <Image
                        src="/assets/tutor-steps/photo/2.png"
                        alt="Example photo 2"
                        width={150}
                        height={150}
                        className="w-full h-auto"
                    />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                    <Image
                        src="/assets/tutor-steps/photo/3.png"
                        alt="Example photo 3"
                        width={150}
                        height={150}
                        className="w-full h-auto"
                    />
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                    <Image
                        src="/assets/tutor-steps/photo/4.png"
                        alt="Example photo 4"
                        width={150}
                        height={150}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <ul className="space-y-6 mb-8">
                {[
                    "You should be facing forward",
                    "Frame your head and shoulders",
                    "You should be centered and upright",
                    "Your face and eyes should be visible (except for religious reasons)",
                    "You should be the only person in the photo",
                    "Use a color photo with high resolution and no filters",
                    "Avoid logos or contact information",
                ].map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#E35D33] flex items-center justify-center text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span className="text-gray-800">{guideline}</span>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between">
                <button
                    className="text-[13px] md:text-[16px] px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {setCurrentStep(1)}}
                >
                    Back
                </button>
                <button
                    onClick={handleSaveAndContinue}
                    disabled={previewUrl == null && photo == null}
                    className="px-8 py-3 rounded-lg text-white transition-colors text-[13px] md:text-[16px]
                            bg-[#E35D33] hover:bg-[#d04e26]
                            disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Save and Continue
                </button>
            </div>
        </div>
    )
}

