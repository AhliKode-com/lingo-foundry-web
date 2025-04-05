/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-31 10:49:25
 */

"use client"

import { useState, useRef } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { FaTrash } from "react-icons/fa"

export default function CVCertification() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            notHasTeachingCertificate: false,
            certificates: [
                {
                    subject: "",
                    certificateType: "",
                    description: "",
                    issuedBy: "",
                    startYear: "",
                    endYear: "",
                    file: null,
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "certificates",
    })

    const cvFileRef = useRef(null)
    const [cvFile, setCvFile] = useState(null)
    const certificateFileRefs = useRef([])

    const notHasTeachingCertificate = watch("notHasTeachingCertificate")

    const handleCVUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // check file type
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
                alert("Please upload a pdf file")
                return
            }

            // check file size (20MB max)
            if (file.size > 20 * 1024 * 1024) {
                alert("File size should be less than 20MB")
                return
            }

            setCvFile(file)
        }
    }

    const handleCertificateUpload = (index, e) => {
        const file = e.target.files[0]
        if (file) {
            // Check file type
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
                alert("Please upload a JPG or PNG file")
                return
            }

            // Check file size (20MB max)
            if (file.size > 20 * 1024 * 1024) {
                alert("File size should be less than 20MB")
                return
            }
        }
    }

    const onSubmit = (data) => {
        // add CV file to the data
        const formData = {
            ...data,
            cvFile,
        }
        console.log("Form submitted:", formData)
        alert("Form data saved successfully!")
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CV & Certification</h1>
            <p className="text-lg text-gray-700 mb-8">
                Upload your CV and Certification (optional) to enhance your profile credibility and get more students.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* CV Upload Section */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold mb-2">Get a &#34;CV verified&#34; badge</h2>
                    <p className="text-gray-700 mb-4">
                        Upload your CV to boost your credibility! Our team will review it and add the badge to your profile.
                    </p>
                    <p className="text-gray-600 text-sm mb-4">JPG or PNG format; maximum size of 20MB.</p>

                    <input
                        type="file"
                        ref={cvFileRef}
                        onChange={handleCVUpload}
                        accept="image/jpeg, image/png"
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => cvFileRef.current.click()}
                        className="border border-gray-800 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Upload
                    </button>

                    {cvFile && <p className="mt-2 text-green-600">File uploaded: {cvFile.name}</p>}
                </div>

                {/* Teaching Certificate Checkbox */}
                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-[#E35D33] focus:ring-[#E35D33] mr-2"
                            {...register("notHasTeachingCertificate")}
                            onChange={(e) => {
                                register("notHasTeachingCertificate").onChange({
                                    target: { name: "notHasTeachingCertificate", value: e.target.checked },
                                })
                            }}
                        />
                        <span className="text-gray-800">I don&#39;t have a teaching certificate</span>
                    </label>
                </div>

                {!notHasTeachingCertificate && (
                    <>
                        {fields.map((field, index) => (
                            <div key={field.id} className="mb-8">
                                {index > 0 && (
                                    <div className="flex justify-end mb-2">
                                        <button type="button" onClick={() => remove(index)} className="text-red-500 flex items-center">
                                            <FaTrash className="h-4 w-4 mr-1" />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                )}

                                {/* Subject */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Subject</label>
                                    <div className="flex">
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                            {...register(`certificates.${index}.subject`, { required: true })}
                                        >
                                            <option value="">Select subject...</option>
                                            <option value="Indonesian">Indonesian</option>
                                            <option value="English">English</option>
                                            <option value="Mathematics">Mathematics</option>
                                            <option value="Science">Science</option>
                                        </select>
                                        {index === 0 && (
                                            <button type="button" className="ml-2 text-gray-500" onClick={() => remove(0)}>
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Certificate */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Certificate</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                        {...register(`certificates.${index}.certificateType`, { required: true })}
                                    >
                                        <option value="">Choose certificate...</option>
                                        <option value="Teaching Certificate">Teaching Certificate</option>
                                        <option value="Language Proficiency">Language Proficiency</option>
                                        <option value="Bachelor's Degree">Bachelor&#39;s Degree</option>
                                        <option value="Master's Degree">Master&#39;s Degree</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Description</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                        {...register(`certificates.${index}.description`)}
                                    />
                                </div>

                                {/* Issued by */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Issued by</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                        {...register(`certificates.${index}.issuedBy`)}
                                    />
                                </div>

                                {/* Years of study */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Years of study</label>
                                    <div className="flex items-center">
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                            {...register(`certificates.${index}.startYear`)}
                                        >
                                            <option value="">Select</option>
                                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="mx-4">-</span>
                                        <select
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                            {...register(`certificates.${index}.endYear`)}
                                        >
                                            <option value="">Select</option>
                                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Certificate Upload */}
                                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                                    <h2 className="text-xl font-bold mb-2">Get a &#34;Certificate verified&#34; badge</h2>
                                    <p className="text-gray-700 mb-4">
                                        Upload your certificate to boost your credibility! Our team will review it and add the badge to your
                                        profile.
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">JPG or PNG format; maximum size of 20MB.</p>

                                    <input
                                        type="file"
                                        ref={(el) => (certificateFileRefs.current[index] = el)}
                                        onChange={(e) => handleCertificateUpload(index, e)}
                                        accept="image/jpeg, image/png"
                                        className="hidden"
                                        {...register(`certificates.${index}.file`)}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => certificateFileRefs.current[index].click()}
                                        className="border border-gray-800 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add another certificate */}
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    subject: "",
                                    certificateType: "",
                                    description: "",
                                    issuedBy: "",
                                    startYear: "",
                                    endYear: "",
                                    file: null,
                                })
                            }
                            className="text-gray-900 font-semibold underline mb-8 inline-block"
                        >
                            Add another certificate
                        </button>
                    </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-[#E35D33] text-white rounded-lg hover:bg-[#d04e26] transition-colors"
                    >
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

