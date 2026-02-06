/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-28 15:51:49
 */

"use client"

import { useState, useRef, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { FaTrash } from "react-icons/fa"
import useUploadFile from "@/apis/static-file/postUploadFile";
import {toast} from "react-toastify";
import {getEnums} from "@/apis/getEnum";
import { IoIosArrowDown } from "react-icons/io";

export default function CVCertification({ setCurrentStep }) {
    const { data: enums } = getEnums();
    const [dropdownOpen, setDropdownOpen] = useState(null)

    // State to track if saved files have been loaded
    const [savedCvFileName, setSavedCvFileName] = useState(null)
    const [savedCertificateFiles, setSavedCertificateFiles] = useState([])

    // Refs for scrolling to error fields
    const certificateCheckboxRef = useRef(null);
    const certificateFieldRefs = useRef([]);

    // Get saved data from localStorage on component mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem("applyTutorStep3Data")
            if (savedData) {
                const parsedData = JSON.parse(savedData)

                // Set the CV file name if it exists
                if (parsedData.cvFile) {
                    setSavedCvFileName(parsedData.cvFile.split('/').pop())
                }

                // Set certificate file names if they exist
                if (parsedData.certificates && parsedData.certificates.length > 0) {
                    const fileNames = parsedData.certificates.map(cert =>
                        cert.file ? cert.file.split('/').pop() : null
                    )
                    setSavedCertificateFiles(fileNames)
                }

                // Reset the form with the saved data
                reset({
                    notHasTeachingCertificate: parsedData.notHasTeachingCertificate || false,
                    certificates: parsedData.certificates?.length > 0 ?
                        parsedData.certificates.map(cert => ({
                            subject: cert.subject || "",
                            certificateType: cert.certificateType || "",
                            description: cert.description || "",
                            issuedBy: cert.issuedBy || "",
                            startYear: cert.startYear || "",
                            endYear: cert.endYear || "",
                            file: null, // We'll display the filename but can't prefill the actual file
                        })) :
                        [
                            {
                                subject: "",
                                certificateType: "",
                                description: "",
                                issuedBy: "",
                                startYear: "",
                                endYear: "",
                                file: null,
                            },
                        ]
                })
            }
        } catch (error) {
            console.error("Error loading saved data:", error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const {
        register,
        handleSubmit,
        control,
        watch,
        getValues,
        setValue,
        reset,
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

    const { uploadFile, error } = useUploadFile()

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
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png") && !file.type.includes("application/pdf")) {
                alert("Please upload a JPG/PNG/PDF file")
                return
            }

            // check file size (20MB max)
            if (file.size > 20 * 1024 * 1024) {
                alert("File size should be less than 20MB")
                return
            }

            setCvFile(file)
            setSavedCvFileName(file.name) // Update the displayed filename
        }
    }

    const handleCertificateUpload = (index, e) => {
        const file = e.target.files[0]
        if (file) {
            // check file type
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png") && !file.type.includes("application/pdf")) {
                alert("Please upload a JPG/PNG/PDF file")
                return
            }

            // check file size (20MB max)
            if (file.size > 20 * 1024 * 1024) {
                alert("File size should be less than 20MB")
                return
            }

            // Update the displayed filename
            const updatedFiles = [...savedCertificateFiles]
            updatedFiles[index] = file.name
            setSavedCertificateFiles(updatedFiles)
        }
    }

    const onError = (errors) => {
        // This function is called when form validation fails
        setTimeout(() => {
            scrollToFirstError();
        }, 0);
    }

    // Watch for errors and scroll to first error (for initial error detection)
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            scrollToFirstError();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    // Function to scroll to first error field and show toast
    const scrollToFirstError = () => {
        const errorFields = [];
        
        // Check certificate fields if checkbox is not checked
        if (!notHasTeachingCertificate) {
            fields.forEach((field, index) => {
                if (errors.certificates?.[index]?.subject) {
                    errorFields.push({ 
                        error: errors.certificates[index].subject, 
                        ref: certificateFieldRefs.current[index], 
                        message: "Subject is required" 
                    });
                }
                if (errors.certificates?.[index]?.certificateType) {
                    errorFields.push({ 
                        error: errors.certificates[index].certificateType, 
                        ref: certificateFieldRefs.current[index], 
                        message: "Certificate type is required" 
                    });
                }
                if (errors.certificates?.[index]?.description) {
                    errorFields.push({ 
                        error: errors.certificates[index].description, 
                        ref: certificateFieldRefs.current[index], 
                        message: "Description is required" 
                    });
                }
                if (errors.certificates?.[index]?.issuedBy) {
                    errorFields.push({ 
                        error: errors.certificates[index].issuedBy, 
                        ref: certificateFieldRefs.current[index], 
                        message: "Issued by is required" 
                    });
                }
                if (errors.certificates?.[index]?.startYear) {
                    errorFields.push({ 
                        error: errors.certificates[index].startYear, 
                        ref: certificateFieldRefs.current[index], 
                        message: "Start year is required" 
                    });
                }
                if (errors.certificates?.[index]?.endYear) {
                    errorFields.push({ 
                        error: errors.certificates[index].endYear, 
                        ref: certificateFieldRefs.current[index], 
                        message: "End year is required" 
                    });
                }
                if (errors.certificates?.[index]?.file) {
                    errorFields.push({ 
                        error: errors.certificates[index].file, 
                        ref: certificateFieldRefs.current[index], 
                        message: "Certificate file is required" 
                    });
                }
            });
        }

        const firstErrorField = errorFields.find(field => field.error);
        if (firstErrorField && firstErrorField.ref) {
            // Scroll to field
            firstErrorField.ref.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Show toast using react-toastify
            toast.error(firstErrorField.message || 'Please fill in the required field');
        }
    }

    const onSubmit = async (data) => {
        // add cv file to the data
        toast.loading("save your file...")
        const formData = {
            ...data
        }

        if (cvFile) {
            const cvFileUrl = await uploadFile(cvFile)
            if (cvFileUrl) {
                formData["cvFile"] = cvFileUrl
            } else {
                toast.dismiss()
                toast.error(error)
            }
        } else if (savedCvFileName) {
            // If no new file is uploaded but we have a saved file, keep the old URL
            try {
                const savedData = JSON.parse(localStorage.getItem("applyTutorStep3Data"))
                if (savedData && savedData.cvFile) {
                    formData["cvFile"] = savedData.cvFile
                }
            } catch (e) {
                console.error("Error retrieving saved CV file:", e)
            }
        }

        if (formData.notHasTeachingCertificate) {
            formData.certificates = []
        } else {
            for (let index = 0; index < formData.certificates.length; index++) {
                if (formData.certificates[index].file) {
                    // If a new file is uploaded
                    const fileUrl = await uploadFile(formData.certificates[index].file)
                    if (fileUrl) {
                        formData.certificates[index].file = fileUrl
                    } else {
                        toast.dismiss()
                        toast.error(error)
                    }
                } else if (savedCertificateFiles[index]) {
                    // If no new file but we have a saved one, keep the old URL
                    try {
                        const savedData = JSON.parse(localStorage.getItem("applyTutorStep3Data"))
                        if (savedData && savedData.certificates && savedData.certificates[index] && savedData.certificates[index].file) {
                            formData.certificates[index].file = savedData.certificates[index].file
                        }
                    } catch (e) {
                        console.error("Error retrieving saved certificate file:", e)
                    }
                }
            }
        }

        console.log("Form submitted:", formData)
        toast.dismiss()
        toast.success("CV and certificates saved successfully!")

        localStorage.setItem("applyTutorStep3Data", JSON.stringify(formData))
        localStorage.setItem("applyTutorCurrentStep", "4")
        setCurrentStep(4)
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CV & Certification</h1>
            <p className="text-lg text-gray-700 mb-8">
                Upload your CV and Certification (optional) to enhance your profile credibility and get more students.
            </p>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
                {/* CV Upload Section */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold mb-2">Get a &#34;CV verified&#34; badge</h2>
                    <p className="text-gray-700 mb-4">
                        Upload your CV to boost your credibility! Our team will review it and add the badge to your profile.
                    </p>
                    <p className="text-gray-600 text-sm mb-4">JPG/PNG/PDF format; maximum size of 2Gb.</p>

                    <input
                        type="file"
                        ref={cvFileRef}
                        onChange={handleCVUpload}
                        accept="image/jpeg, image/png, application/pdf"
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => cvFileRef.current.click()}
                        className="border border-gray-800 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        Upload
                    </button>

                    {(cvFile || savedCvFileName) && (
                        <div className="mt-2 text-green-600 flex items-center">
                            <span className="break-words w-[calc(100%-35px)]">File uploaded: {cvFile ? cvFile.name : savedCvFileName}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setCvFile(null)
                                    setSavedCvFileName(null)
                                    cvFileRef.current.value = null
                                }}
                                className="ml-4 text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    )}
                </div>

                {/* Teaching Certificate Checkbox */}
                <div className="mb-6" ref={certificateCheckboxRef}>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-[#E35D33] focus:ring-[#E35D33] mr-2"
                            {...register("notHasTeachingCertificate")}
                        />
                        <span className="text-gray-800">I don&#39;t have a teaching certificate</span>
                    </label>
                </div>

                {!notHasTeachingCertificate && (
                    <>
                        {fields.map((field, index) => (
                            <div key={field.id} className="mb-8" ref={el => certificateFieldRefs.current[index] = el}>
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
                                    <div className="flex gap-2">
                                        <div className="relative w-full">
                                            <input
                                                type="hidden"
                                                {...register(`certificates.${index}.subject`, { 
                                                    required: !notHasTeachingCertificate ? "Subject is required" : false 
                                                })}
                                                value={watch(`certificates.${index}.subject`) || ""}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setDropdownOpen(dropdownOpen === `certificate-subject-${index}` ? null : `certificate-subject-${index}`)}
                                                className={`flex items-center w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E35D33] ${
                                                    errors.certificates?.[index]?.subject ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <span className="text-left flex-1">
                                                    {enums.subject.find(subject => subject.name === watch(`certificates.${index}.subject`))?.displayName || "Select subject..."}
                                                </span>
                                                <IoIosArrowDown />
                                            </button>

                                            {dropdownOpen === `certificate-subject-${index}` && (
                                                <div className="absolute z-10 w-full  mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                    {enums.subject.map((subject, idx) => {
                                                        return(
                                                            <div
                                                                key={idx}
                                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                onClick={() => {
                                                                setValue(`certificates.${index}.subject`, subject.name)
                                                                setDropdownOpen(null)
                                                                }}
                                                            >
                                                                <span className="text-[16px]">{subject.displayName}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>


                                            <button
                                                type="button"
                                                className="ml-2 text-gray-500 mt-2"
                                                onClick={() => {
                                                    setValue(`certificates.${index}.subject`, "");
                                                }}
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>

                                    </div>
                                    {errors.certificates?.[index]?.subject && (
                                        <p className="text-red-500 text-sm mt-1">{errors.certificates[index].subject.message}</p>
                                    )}
                                </div>

                                {/* Certificate */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Certificate</label>
                                    <div className="relative w-full">
                                        <input
                                            type="hidden"
                                            {...register(`certificates.${index}.certificateType`, { 
                                                required: !notHasTeachingCertificate ? "Certificate type is required" : false 
                                            })}
                                            value={watch(`certificates.${index}.certificateType`) || ""}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setDropdownOpen(dropdownOpen === `certificate-type-${index}` ? null : `certificate-type-${index}`)}
                                            className={`flex items-center w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E35D33] ${
                                                errors.certificates?.[index]?.certificateType ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <span className="text-left flex-1">
                                                {enums.level.find(level => level.name === watch(`certificates.${index}.certificateType`))?.displayName || "Select level..."}
                                            </span>
                                            <IoIosArrowDown />
                                        </button>

                                        {dropdownOpen === `certificate-type-${index}` && (
                                            <div className="absolute z-10 w-full  mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                {enums.level.map((level, idx) => {
                                                    return(
                                                        <div
                                                            key={idx}
                                                            className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                            onClick={() => {
                                                            setValue(`certificates.${index}.certificateType`, level.name)
                                                            setDropdownOpen(null)
                                                            }}
                                                        >
                                                            <span className="text-[16px]">{level.displayName}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    {errors.certificates?.[index]?.certificateType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.certificates[index].certificateType.message}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Description</label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E35D33] ${
                                            errors.certificates?.[index]?.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register(`certificates.${index}.description`, { 
                                            required: !notHasTeachingCertificate ? "Description is required" : false 
                                        })}
                                    />
                                    {errors.certificates?.[index]?.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.certificates[index].description.message}</p>
                                    )}
                                </div>

                                {/* Issued by */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Issued by</label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E35D33] ${
                                            errors.certificates?.[index]?.issuedBy ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        {...register(`certificates.${index}.issuedBy`, { 
                                            required: !notHasTeachingCertificate ? "Issued by is required" : false 
                                        })}
                                    />
                                    {errors.certificates?.[index]?.issuedBy && (
                                        <p className="text-red-500 text-sm mt-1">{errors.certificates[index].issuedBy.message}</p>
                                    )}
                                </div>

                                {/* Years of study */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Years of Study</label>
                                    <div className="flex items-center gap-4">
                                        {/* Start Year */}
                                        <div className="relative w-full">
                                            <input
                                                type="hidden"
                                                {...register(`certificates.${index}.startYear`, { 
                                                    required: !notHasTeachingCertificate ? "Start year is required" : false 
                                                })}
                                                value={watch(`certificates.${index}.startYear`) || ""}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setDropdownOpen(dropdownOpen === `startYear-${index}` ? null : `startYear-${index}`)}
                                                className={`flex items-center w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E35D33] text-left ${
                                                    errors.certificates?.[index]?.startYear ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <span className="flex-1">
                                                    {watch(`certificates.${index}.startYear`) || "Select"}
                                                </span>
                                                <IoIosArrowDown />
                                            </button>

                                            {dropdownOpen === `startYear-${index}` && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-xl shadow-lg max-h-[250px] overflow-y-auto py-2">
                                                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                        <div
                                                        key={year}
                                                        className="px-4 py-2 hover:bg-[#FDE0D7] hover:text-[#E35D33] text-gray-700 cursor-pointer transition-colors duration-150 ease-in-out text-[16px]"
                                                        onClick={() => {
                                                            setValue(`certificates.${index}.startYear`, year.toString());
                                                            setDropdownOpen(null);
                                                        }}
                                                        >
                                                        {year}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <span className="text-gray-500">-</span>

                                        {/* End Year */}
                                        <div className="relative w-full">
                                            <input
                                                type="hidden"
                                                {...register(`certificates.${index}.endYear`, { 
                                                    required: !notHasTeachingCertificate ? "End year is required" : false 
                                                })}
                                                value={watch(`certificates.${index}.endYear`) || ""}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setDropdownOpen(dropdownOpen === `endYear-${index}` ? null : `endYear-${index}`)}
                                                className={`flex items-center w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#E35D33] text-left ${
                                                    errors.certificates?.[index]?.endYear ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <span className="flex-1">
                                                {watch(`certificates.${index}.endYear`) || "Select"}
                                                </span>
                                                <IoIosArrowDown />
                                            </button>

                                            {dropdownOpen === `endYear-${index}` && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-xl shadow-lg max-h-[250px] overflow-y-auto py-2">
                                                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                        <div
                                                            key={year}
                                                            className="px-4 py-2 hover:bg-[#FDE0D7] hover:text-[#E35D33] text-gray-700 cursor-pointer transition-colors duration-150 ease-in-out text-[16px]"
                                                            onClick={() => {
                                                                setValue(`certificates.${index}.endYear`, year.toString());
                                                                setDropdownOpen(null);
                                                            }}
                                                        >
                                                            {year}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {(errors.certificates?.[index]?.startYear || errors.certificates?.[index]?.endYear) && (
                                        <div className="flex gap-4 mt-1">
                                            <div className="flex-1">
                                                {errors.certificates?.[index]?.startYear && (
                                                    <p className="text-red-500 text-sm">{errors.certificates[index].startYear.message}</p>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                {errors.certificates?.[index]?.endYear && (
                                                    <p className="text-red-500 text-sm">{errors.certificates[index].endYear.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>


                                {/* Certificate Upload */}
                                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                                    <h2 className="text-xl font-bold mb-2">Get a &#34;Certificate verified&#34; badge</h2>
                                    <p className="text-gray-700 mb-4">
                                        Upload your certificate to boost your credibility! Our team will review it and add the badge to your
                                        profile.
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">JPG/PNG/PDF format; maximum size of 2Gb.</p>

                                    <input
                                        type="file"
                                        ref={(el) => (certificateFileRefs.current[index] = el)}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            handleCertificateUpload(index, e);
                                            if (file) {
                                                // manually set the file into form state
                                                setValue(`certificates.${index}.file`, file);
                                            }
                                        }}
                                        accept="image/jpeg, image/png, application/pdf"
                                        className="hidden"
                                        {...register(`certificates.${index}.file`, { 
                                            required: !notHasTeachingCertificate ? "Certificate file is required" : false 
                                        })}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const ref = certificateFileRefs.current[index];
                                            if (ref) {
                                                ref.click();
                                            }
                                        }}
                                        className="border border-gray-800 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        Upload
                                    </button>

                                    {(watch(`certificates.${index}.file`) || savedCertificateFiles[index]) && (
                                        <div className="mt-2 text-green-600 flex items-center">
                                            <span className="break-words w-[calc(100%-35px)]">File uploaded: {watch(`certificates.${index}.file`)?.name || savedCertificateFiles[index]}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // Reset the file state
                                                    setValue(`certificates.${index}.file`, null);
                                                    // Clear the file input
                                                    certificateFileRefs.current[index].value = null;
                                                    // Clear the saved file name if any
                                                    const updatedFiles = [...savedCertificateFiles];
                                                    updatedFiles[index] = null;
                                                    setSavedCertificateFiles(updatedFiles);
                                                }}
                                                className="ml-4 text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                    {errors.certificates?.[index]?.file && (
                                        <p className="text-red-500 text-sm mt-1">{errors.certificates[index].file.message}</p>
                                    )}
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
                        className="text-[13px] md:text-[16px] px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {setCurrentStep(2)}}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="text-[13px] md:text-[16px] px-8 py-3 bg-[#E35D33] text-white cursor-pointer rounded-lg hover:bg-[#d04e26] transition-colors"
                    >
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    )
}