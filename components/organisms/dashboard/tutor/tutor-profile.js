"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FaPen, FaCheck, FaEye, FaGraduationCap, FaLanguage, FaCertificate, FaGlobe, FaTrash } from 'react-icons/fa';
import { useAuth } from "@/context/AuthContext";
import { getDetail } from "@/apis/getTutorDetail";
import { toast } from "react-toastify";
import Link from "next/link";
import {LabelTutorRegis} from "@/components/atoms/title";
import {IoIosArrowDown} from "react-icons/io";
import {getEnums} from "@/apis/getEnum";
import { useUpdateTutor } from "@/apis/updateTutor";
import useUploadFile from "@/apis/static-file/postUploadFile";

export default function TutorProfileForm() {
    const { user } = useAuth();
    const { getData } = getDetail();
    const { data: enums } = getEnums();
    const { updateTutor, loading: updateLoading } = useUpdateTutor();

    const { uploadFile, error } = useUploadFile()

    const [formData, setFormData] = useState({
        bio: '',
        introduction: '',
        teachingExperience: '',
        courseMotivation: '',
        academicDegreeLevel: '',
        academicSubject: '',
        teachSubject: '',
        countryOfBirth: '',
        title: '',
        expertises: [],
        languages: [],
        certificates: [],
        cvFile: null,
        cvFileUrl: '',
        cvFileObjectKey: ''
    });

    const MAX_EXPERTISE = 3

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState({
        bio: false,
        introduction: false,
        teachingExperience: false,
        courseMotivation: false,
        teachSubject: false,
        title: false,
        expertises: false,
        languages: false,
        certificates: false,
        cv: false
    });

    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState({});
    const [prevDropdownOpen, setPrevDropdownOpen] = useState(null);
    const [savedCertificateFiles, setSavedCertificateFiles] = useState([]);
    const certificateFileRefs = useRef([]);
    const cvFileRef = useRef(null);
    const [cvFile, setCvFile] = useState(null);

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);

    useEffect(() => {
        if (prevDropdownOpen && prevDropdownOpen !== dropdownOpen) {
            setSearchTerm((prevSearch) => ({
                ...prevSearch,
                [prevDropdownOpen]: ""
            }));
        }
        setPrevDropdownOpen(dropdownOpen);
    }, [dropdownOpen]);

    useEffect(() => {
        if (formData.languages) {
            const languages = formData.languages.map((val) => val.language);
            const levels = formData.languages.map((val) => val.level);
            setSelectedLanguages(languages);
            setSelectedLevels(levels);
        }
    }, [formData.languages]);

    const handleDropdownToggle = (type) => {
        setDropdownOpen((prev) => (prev === type ? null : type));
    };

    const filteredExpertise = enums?.expertise
        ?.filter((option) => !formData.expertises.includes(option.displayName))
        ?.filter((option) =>
            (option?.displayName || "").toLowerCase().includes((searchTerm.expertise || "").toLowerCase())
        );

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSave = async (field) => {
        setSaving(true);
        try {
            // Validate languages for required fields and duplicates before saving
            if (field === 'languages') {
                // Check if all languages have both language and level selected
                const hasIncompleteFields = formData.languages.some(lang => !lang.language || !lang.level);
                if (hasIncompleteFields) {
                    toast.error('Please select both language and level for all entries');
                    setSaving(false);
                    return;
                }

                // Remove duplicates by keeping only the first occurrence
                const uniqueLanguages = formData.languages.reduce((acc, current) => {
                    const isDuplicate = acc.find(item => 
                        item.language === current.language && 
                        item.level === current.level
                    );
                    if (!isDuplicate) {
                        acc.push(current);
                    }
                    return acc;
                }, []);

                // If there were duplicates, update the form data
                if (uniqueLanguages.length !== formData.languages.length) {
                    setFormData(prev => ({
                        ...prev,
                        languages: uniqueLanguages
                    }));
                    // Update selected languages and levels arrays
                    setSelectedLanguages(uniqueLanguages.map(lang => lang.language));
                    setSelectedLevels(uniqueLanguages.map(lang => lang.level));
                    toast.info('Duplicate entries have been removed');
                }
            }

            // Validate certificates for required fields
            if (field === 'certificates') {
                const hasIncompleteFields = formData.certificates.some(cert => !cert.type);
                if (hasIncompleteFields) {
                    toast.error('Please select certificate type for all entries');
                    setSaving(false);
                    return;
                }
            }

            // Format certificates data
            const formattedCertificates = formData.certificates.map(cert => ({
                subject: cert.subject,
                type: cert.type,
                description: cert.description,
                issuedBy: cert.issuedBy,
                startYear: parseInt(cert.startYear),
                endYear: cert.endYear ? parseInt(cert.endYear) : null,
                fileObjectKey: cert.fileObjectKey || null
            }));

            // Create the update payload
            const updatePayload = {
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                bio: formData.bio,
                profilePhotoObjectKey: user?.profilePhotoObjectKey || '',
                countryOfBirth: formData.countryOfBirth,
                teachSubject: formData.teachSubject,
                expertises: formData.expertises,
                languages: formData.languages,
                mobileNumber: user?.mobileNumber || '',
                certificates: formattedCertificates,
                cvFileObjectKey: formData.cvFileObjectKey || '',
                introduction: formData.introduction,
                teachingExperience: formData.teachingExperience,
                courseMotivation: formData.courseMotivation,
                title: formData.title,
                cvFileUrl: formData.cvFileUrl
            };

            // Handle CV file upload if it's a new file
            if (field === 'cv' && formData.cvFile) {
                const cvFileUrl = await uploadFile(formData.cvFile);
                if (cvFileUrl) {
                    setFormData(prev => ({ ...prev, cvFileUrl: cvFileUrl }));
                    updatePayload.cvFileUrl = cvFileUrl;
                    let objectKey = cvFileUrl.split("/");
                    objectKey = objectKey[objectKey.length - 1];
                    if (objectKey) {
                        updatePayload.cvFileObjectKey = objectKey;
                    }
                } else {
                    toast.error('Failed to upload CV file');
                    setSaving(false);
                    return;
                }
            }

            // Make API call to update the tutor profile
            await updateTutor(updatePayload);

            toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
            setEditing((prev) => ({...prev, [field]: false}));
        } catch (error) {
            toast.error(`Failed to update ${field}: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleExpertiseChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !formData.expertises.includes(selectedValue)) {
            if (formData.expertises.length < MAX_EXPERTISE) {
                setFormData(prev => ({
                    ...prev,
                    expertises: [...prev.expertises, selectedValue]
                }));
            } else {
                toast.warning(`Maximum ${MAX_EXPERTISE} expertise areas allowed`);
            }
        }
    };

    const removeExpertise = (expertiseToRemove) => {
        setFormData(prev => ({
            ...prev,
            expertises: prev.expertises.filter(expertise => expertise !== expertiseToRemove)
        }));
    };

    const fetchTutorDetails = async () => {
        if (user?.tutor?.id) {
            setLoading(true);
            try {
                const tutorDetailData = await getData(user.tutor.id);
                const tutorData = tutorDetailData?.tutor || {};

                const cvFileUrl = tutorData.cvFileUrl || ''
                let objectKey = cvFileUrl.split("/");
                objectKey = objectKey[objectKey.length - 1];

                setFormData({
                    bio: tutorData.bio || '',
                    introduction: tutorData.introduction || '',
                    teachingExperience: tutorData.teachingExperience || '',
                    courseMotivation: tutorData.courseMotivation || '',
                    academicDegreeLevel: tutorData.academicDegreeLevel || '',
                    academicSubject: tutorData.academicSubject || '',
                    teachSubject: tutorData.teachSubject || '',
                    countryOfBirth: tutorData.countryOfBirth || '',
                    title: tutorData.title || '',
                    expertises: tutorData.expertises || [],
                    languages: tutorData.languages || [],
                    certificates: tutorData.certificates || [],
                    cvFile: tutorData.cvFile || null,
                    cvFileUrl: tutorData.cvFileUrl || '',
                    cvFileObjectKey: objectKey
                });
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchTutorDetails();
    }, [user]);

    const editClassWrapper = "rounded-[32px] border-[1px] border-[#D9D9D9] p-4";
    const editContent = "border-[1px] border-[#A6A6A6] p-4 rounded-[32px]";

    console.log(formData)

    const renderEditField = (field, label, multiline = false) => (
        <div className='flex flex-col gap-2'>
            <div className="flex justify-between items-center">
                <label className="text-[#E35D33] font-medium">{label}</label>
                <button
                    onClick={() => handleEdit(field)}
                    className={`${editing[field] ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'} cursor-pointer animation-effect`}
                >
                    <FaPen />
                </button>
            </div>
            <div className={editClassWrapper}>
                {editing[field] ? (
                    <div className="flex items-center gap-2">
                        {multiline ? (
                            <textarea
                                value={formData[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                                className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                rows={4}
                            />
                        ) : (
                            <input
                                type="text"
                                value={formData[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                                className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                            />
                        )}
                        <button
                            onClick={() => handleSave(field)}
                            className="text-green-500 cursor-pointer"
                            disabled={saving}
                        >
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                            ) : (
                                <FaCheck />
                            )}
                        </button>
                    </div>
                ) : loading ? (
                    <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                ) : (
                    <div className={editContent}>
                        {formData[field] || <span className="text-gray-400">Add your {label.toLowerCase()} here</span>}
                    </div>
                )}
            </div>
        </div>
    );

    const handleCVUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // check file type
            if (!file.type.includes("application/pdf")) {
                toast.error("Please upload a PDF file");
                return;
            }

            // check file size (1MB max)
            if (file.size > 1 * 1024 * 1024) {
                toast.error("File size should be less than 1MB");
                return;
            }

            setCvFile(file);
            setFormData(prev => ({ ...prev, cvFile: file }));
        }
    };

    const handleCertificateUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            // check file type
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png") && !file.type.includes("application/pdf")) {
                toast.error("Please upload a JPG/PNG/PDF file");
                return;
            }

            // check file size (20MB max)
            if (file.size > 20 * 1024 * 1024) {
                toast.error("File size should be less than 20MB");
                return;
            }

            // Update the displayed filename
            const updatedFiles = [...savedCertificateFiles];
            updatedFiles[index] = file.name;
            setSavedCertificateFiles(updatedFiles);

            // Update form data
            const newCertificates = [...formData.certificates];
            newCertificates[index] = { ...newCertificates[index], file };
            setFormData(prev => ({ ...prev, certificates: newCertificates }));
        }
    };

    console.log(formData)

    return (
        <div className="lingo-container flex flex-col lg:flex-row gap-[20px] mb-[72px]">
            <div className="w-full flex-col lg:flex-row flex gap-[20px]">
                {/* Left side - Form fields */}
                <div className='flex flex-col gap-[16px] lg:w-2/3'>
                    {/* Bio Field */}
                    {renderEditField('bio', 'Bio', true)}

                    {/* Introduction Field */}
                    {renderEditField('introduction', 'Introduction', true)}

                    {/* Teaching Experience Field */}
                    {renderEditField('teachingExperience', 'Teaching Experience', true)}

                    {/* Course Motivation Field */}
                    {renderEditField('courseMotivation', 'Course Motivation', true)}

                    {/* Teaching Subject Field */}
                    {renderEditField('teachSubject', 'Teaching Subject')}

                    {/* Title Field */}
                    {renderEditField('title', 'Professional Title')}

                    {/* Expertises Section */}
                    <div className='flex flex-col gap-2 mt-4'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Areas of Expertise</label>
                            <button
                                onClick={() => setEditing(prev => ({...prev, expertises: !prev.expertises}))}
                                className={`${editing.expertises ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'} cursor-pointer animation-effect`}
                            >
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {editing.expertises ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {formData.expertises.length > 0 ? (
                                                    formData.expertises.map((exp, index) => (
                                                        <div key={index} className="bg-gray-100 rounded-[6px] px-3 py-1 flex items-center gap-1">
                                                            <span>{exp}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeExpertise(exp)}
                                                                className="ml-1 rounded-full bg-gray-300 w-5 h-5 flex items-center justify-center"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3 w-3"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No expertise selected</p>
                                                )}
                                            </div>

                                            {formData.expertises.length >= MAX_EXPERTISE ? (
                                                <p className="text-amber-600 text-sm mb-2">
                                                    Maximum of {MAX_EXPERTISE} expertise reached. Remove one to add another.
                                                </p>
                                            ) : null}

                                            <div className="relative">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        disabled={formData.expertises.length >= MAX_EXPERTISE}
                                                        onClick={() => handleDropdownToggle('expertise')}
                                                        className={`flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] ${
                                                            formData.expertises.length >= MAX_EXPERTISE ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""
                                                        }`}
                                                    >
                                                        <span className="text-left flex-1">
                                                            {formData.expertises.length >= MAX_EXPERTISE ? "Maximum reached" : "Select expertise..."}
                                                        </span>
                                                        <IoIosArrowDown />
                                                    </button>
                                                    <button
                                                        onClick={() => handleSave('expertises')}
                                                        className="text-green-500 cursor-pointer"
                                                        disabled={saving}
                                                    >
                                                        {saving ? (
                                                            <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                                                        ) : (
                                                            <FaCheck />
                                                        )}
                                                    </button>
                                                </div>

                                                {dropdownOpen === 'expertise' && formData.expertises.length < MAX_EXPERTISE && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                        <div className="p-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                value={searchTerm.expertise || ""}
                                                                onChange={(e) =>
                                                                    setSearchTerm((prev) => ({ ...prev, expertise: e.target.value }))
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                            />
                                                        </div>
                                                        
                                                        {filteredExpertise?.length > 0 ? (
                                                            filteredExpertise.map((option, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                    onClick={() => {
                                                                        handleExpertiseChange({ target: { value: option.displayName } });
                                                                        setDropdownOpen(null);
                                                                        setSearchTerm({});
                                                                    }}
                                                                >
                                                                    <span className="text-[16px]">{option.displayName}</span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {formData.expertises && formData.expertises.length > 0 ? (
                                                formData.expertises.map((expertise, index) => (
                                                    <span key={index} className="bg-[#E35D33] text-white px-3 py-1 rounded-full text-sm">
                                                        {enums?.expertise?.find(exp => exp.name === expertise)?.displayName || expertise}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">No expertise areas added</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Languages Section */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Languages</label>
                            <button
                                onClick={() => setEditing(prev => ({...prev, languages: !prev.languages}))}
                                className={`${editing.languages ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'} cursor-pointer animation-effect`}
                            >
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {editing.languages ? (
                                        <div className="flex flex-col gap-4">
                                            {formData.languages.map((field, index) => {
                                                const filteredLangs = enums?.subjectTeach?.filter((lang) =>
                                                    (lang?.displayName || "").toLowerCase().includes((searchTerm[`language-${index}`] || "").toLowerCase())
                                                );
                                              
                                                const filteredLevels = enums?.subjectLevelTeach?.filter((level) =>
                                                    (level?.displayName || "").toLowerCase().includes((searchTerm[`level-${index}`] || "").toLowerCase())
                                                );

                                                return (
                                                    <div key={index} className="flex gap-4 mb-2">
                                                        <div className="relative flex-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDropdownToggle(`language-${index}`)}
                                                                className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                            >
                                                                <span className="text-left flex-1">
                                                                    {selectedLanguages[index] || "language..."}
                                                                </span>
                                                                <IoIosArrowDown />
                                                            </button>

                                                            {dropdownOpen === `language-${index}` && (
                                                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                                    <div className="p-2">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Search..."
                                                                            value={searchTerm[`language-${index}`] || ""}
                                                                            onChange={(e) =>
                                                                                setSearchTerm((prev) => ({
                                                                                    ...prev,
                                                                                    [`language-${index}`]: e.target.value,
                                                                                }))
                                                                            }
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                                        />
                                                                    </div>
                                                                    {filteredLangs?.length > 0 ? (
                                                                        filteredLangs.map((lang, idx) => (
                                                                            <div
                                                                                key={idx}
                                                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                                onClick={() => {
                                                                                    const newSelected = [...selectedLanguages];
                                                                                    newSelected[index] = lang.displayName;
                                                                                    setSelectedLanguages(newSelected);
                                                                                    const newLanguages = [...formData.languages];
                                                                                    newLanguages[index] = { ...newLanguages[index], language: lang.displayName };
                                                                                    
                                                                                    // Check for duplicates
                                                                                    const isDuplicate = newLanguages.some((l, i) => 
                                                                                        i !== index && 
                                                                                        l.language === lang.displayName && 
                                                                                        l.level === newLanguages[index].level
                                                                                    );

                                                                                    if (isDuplicate) {
                                                                                        toast.error('This language and level combination already exists');
                                                                                        return;
                                                                                    }

                                                                                    setFormData(prev => ({ ...prev, languages: newLanguages }));
                                                                                    setDropdownOpen(null);
                                                                                }}
                                                                            >
                                                                                <span className="text-[16px]">{lang.displayName}</span>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="px-4 py-2 text-gray-500">No results found</div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="relative flex-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDropdownToggle(`level-${index}`)}
                                                                className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                            >
                                                                <span className="text-left flex-1">
                                                                    {selectedLevels[index] || "level..."}
                                                                </span>
                                                                <IoIosArrowDown />
                                                            </button>

                                                            {dropdownOpen === `level-${index}` && (
                                                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                                    <div className="p-2">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Search..."
                                                                            value={searchTerm[`level-${index}`] || ""}
                                                                            onChange={(e) =>
                                                                                setSearchTerm((prev) => ({
                                                                                    ...prev,
                                                                                    [`level-${index}`]: e.target.value,
                                                                                }))
                                                                            }
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                                        />
                                                                    </div>
                                                                    {filteredLevels?.length > 0 ? (
                                                                        filteredLevels.map((level, idx) => (
                                                                            <div
                                                                                key={idx}
                                                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                                onClick={() => {
                                                                                    const newSelected = [...selectedLevels];
                                                                                    newSelected[index] = level.displayName;
                                                                                    setSelectedLevels(newSelected);
                                                                                    const newLanguages = [...formData.languages];
                                                                                    newLanguages[index] = { ...newLanguages[index], level: level.displayName };
                                                                                    
                                                                                    // Check for duplicates
                                                                                    const isDuplicate = newLanguages.some((l, i) => 
                                                                                        i !== index && 
                                                                                        l.language === newLanguages[index].language && 
                                                                                        l.level === level.displayName
                                                                                    );

                                                                                    if (isDuplicate) {
                                                                                        toast.error('This language and level combination already exists');
                                                                                        return;
                                                                                    }

                                                                                    setFormData(prev => ({ ...prev, languages: newLanguages }));
                                                                                    setDropdownOpen(null);
                                                                                }}
                                                                            >
                                                                                <span className="text-[16px]">{level.displayName}</span>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="px-4 py-2 text-gray-500">No results found</div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newLanguages = formData.languages.filter((_, i) => i !== index);
                                                                    setFormData(prev => ({ ...prev, languages: newLanguages }));
                                                                    const newSelected = selectedLanguages.filter((_, i) => i !== index);
                                                                    const newLevels = selectedLevels.filter((_, i) => i !== index);
                                                                    setSelectedLanguages(newSelected);
                                                                    setSelectedLevels(newLevels);
                                                                }}
                                                                className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 self-center"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        languages: [...prev.languages, { language: "", level: "" }]
                                                    }));
                                                    setSelectedLanguages([...selectedLanguages, ""]);
                                                    setSelectedLevels([...selectedLevels, ""]);
                                                }}
                                                className="underline text-[16px] font-semibold"
                                            >
                                                Add another language
                                            </button>
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={() => handleSave('languages')}
                                                    className="text-green-500 cursor-pointer"
                                                    disabled={saving}
                                                >
                                                    {saving ? (
                                                        <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaCheck />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {formData.languages && formData.languages.length > 0 ? (
                                                formData.languages.map((lang, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <FaLanguage className="text-[#E35D33]" />
                                                        <span>{lang.language}: {lang.level}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">No languages added</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Certificates Section */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Certificates</label>
                            <button
                                onClick={() => setEditing(prev => ({...prev, certificates: !prev.certificates}))}
                                className={`${editing.certificates ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'} cursor-pointer animation-effect`}
                            >
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {editing.certificates ? (
                                        <div className="flex flex-col gap-4">
                                            {formData.certificates.map((cert, index) => (
                                                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                                                    {index > 0 && (
                                                        <div className="flex justify-end mb-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newCertificates = formData.certificates.filter((_, i) => i !== index);
                                                                    setFormData(prev => ({ ...prev, certificates: newCertificates }));
                                                                    const newFiles = savedCertificateFiles.filter((_, i) => i !== index);
                                                                    setSavedCertificateFiles(newFiles);
                                                                }}
                                                                className="text-red-500 flex items-center"
                                                            >
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
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDropdownToggle(`certificate-subject-${index}`)}
                                                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                                >
                                                                    <span className="text-left flex-1">
                                                                        {enums?.subject?.find(subject => subject.name === cert.subject)?.displayName || "Select subject..."}
                                                                    </span>
                                                                    <IoIosArrowDown />
                                                                </button>

                                                                {dropdownOpen === `certificate-subject-${index}` && (
                                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                                        {enums?.subject?.map((subject, idx) => (
                                                                            <div
                                                                                key={idx}
                                                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                                onClick={() => {
                                                                                    const newCertificates = [...formData.certificates];
                                                                                    newCertificates[index] = { ...newCertificates[index], subject: subject.name };
                                                                                    setFormData(prev => ({ ...prev, certificates: newCertificates }));
                                                                                    setDropdownOpen(null);
                                                                                }}
                                                                            >
                                                                                <span className="text-[16px]">{subject.displayName}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="ml-2 text-gray-500 mt-2"
                                                                onClick={() => {
                                                                    const newCertificates = [...formData.certificates];
                                                                    newCertificates[index] = { ...newCertificates[index], subject: "" };
                                                                    setFormData(prev => ({ ...prev, certificates: newCertificates }));
                                                                }}
                                                            >
                                                                <FaTrash className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Certificate Type */}
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Certificate <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative w-full">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDropdownToggle(`certificate-type-${index}`)}
                                                                className={`flex items-center w-full px-4 py-3 rounded-lg border ${
                                                                    !cert.type ? 'border-red-500' : 'border-gray-300'
                                                                } focus:outline-none focus:ring-2 focus:ring-[#E35D33]`}
                                                            >
                                                                <span className="text-left flex-1">
                                                                    {enums?.level?.find(level => level.name === cert.type)?.displayName || "Select level..."}
                                                                </span>
                                                                <IoIosArrowDown />
                                                            </button>
                                                            {!cert.type && (
                                                                <p className="text-red-500 text-sm mt-1">Certificate type is required</p>
                                                            )}

                                                            {dropdownOpen === `certificate-type-${index}` && (
                                                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                                    {enums?.level?.map((level, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                            onClick={() => {
                                                                                const newCertificates = [...formData.certificates];
                                                                                newCertificates[index] = { ...newCertificates[index], type: level.name };
                                                                                setFormData(prev => ({ ...prev, certificates: newCertificates }));
                                                                                setDropdownOpen(null);
                                                                            }}
                                                                        >
                                                                            <span className="text-[16px]">{level.displayName}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">Description</label>
                                                        <input
                                                            type="text"
                                                            value={cert.description || ""}
                                                            onChange={(e) => {
                                                                const newCertificates = [...formData.certificates];
                                                                newCertificates[index] = { ...newCertificates[index], description: e.target.value };
                                                                setFormData(prev => ({ ...prev, certificates: newCertificates }));
                                                            }}
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                        />
                                                    </div>

                                                    {/* Issued by */}
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">Issued by</label>
                                                        <input
                                                            type="text"
                                                            value={cert.issuedBy || ""}
                                                            onChange={(e) => {
                                                                const newCertificates = [...formData.certificates];
                                                                newCertificates[index] = { ...newCertificates[index], issuedBy: e.target.value };
                                                                setFormData(prev => ({ ...prev, certificates: newCertificates }));
                                                            }}
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                        />
                                                    </div>

                                                    {/* Years of study */}
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">Years of Study</label>
                                                        <div className="flex items-center gap-4">
                                                            {/* Start Year */}
                                                            <div className="relative w-full">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDropdownToggle(`startYear-${index}`)}
                                                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] text-left"
                                                                >
                                                                    <span className="flex-1">
                                                                        {cert.startYear || "Select"}
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
                                                                                    const newCertificates = [...formData.certificates];
                                                                                    newCertificates[index] = { ...newCertificates[index], startYear: year.toString() };
                                                                                    setFormData(prev => ({ ...prev, certificates: newCertificates }));
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
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDropdownToggle(`endYear-${index}`)}
                                                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] text-left"
                                                                >
                                                                    <span className="flex-1">
                                                                        {cert.endYear || "Select"}
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
                                                                                    const newCertificates = [...formData.certificates];
                                                                                    newCertificates[index] = { ...newCertificates[index], endYear: year.toString() };
                                                                                    setFormData(prev => ({ ...prev, certificates: newCertificates }));
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
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        certificates: [...prev.certificates, {
                                                            subject: "",
                                                            type: "",
                                                            description: "",
                                                            issuedBy: "",
                                                            startYear: "",
                                                            endYear: "",
                                                            file: null
                                                        }]
                                                    }));
                                                }}
                                                className="text-gray-900 font-semibold underline mb-8 inline-block"
                                            >
                                                Add another certificate
                                            </button>

                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={() => handleSave('certificates')}
                                                    className="text-green-500 cursor-pointer"
                                                    disabled={saving}
                                                >
                                                    {saving ? (
                                                        <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaCheck />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.certificates && formData.certificates.length > 0 ? (
                                                formData.certificates.map((cert, index) => (
                                                    <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                                                        <div className="flex items-center gap-2 font-medium">
                                                            <FaCertificate className="text-[#E35D33]" />
                                                            <span>{enums?.subject?.find(subject => subject.name === cert.subject)?.displayName || cert.subject} - {enums?.level?.find(level => level.name === cert.type)?.displayName || cert.type}</span>
                                                        </div>
                                                        <div className="ml-6 text-sm text-gray-600">
                                                            <p>Issued by: {cert.issuedBy}</p>
                                                            <p>Period: {cert.startYear} - {cert.endYear || 'Present'}</p>
                                                            {cert.description && <p>Description: {cert.description}</p>}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-400">No certificates added</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CV Section */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">CV</label>
                            <button
                                onClick={() => setEditing(prev => ({...prev, cv: !prev.cv}))}
                                className={`${editing.cv ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'} cursor-pointer animation-effect`}
                            >
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {editing.cv ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="bg-gray-50 p-6 rounded-lg">
                                                <h2 className="text-xl font-bold mb-2">Upload your CV</h2>
                                                <p className="text-gray-700 mb-4">
                                                    Upload your CV to showcase your professional experience and qualifications.
                                                </p>
                                                <p className="text-gray-600 text-sm mb-4">PDF format; maximum size of 20MB.</p>

                                                <input
                                                    type="file"
                                                    ref={cvFileRef}
                                                    onChange={handleCVUpload}
                                                    accept="application/pdf"
                                                    className="hidden"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const ref = cvFileRef.current;
                                                        if (ref) {
                                                            ref.click();
                                                        }
                                                    }}
                                                    className="border border-gray-800 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                                                >
                                                    Upload CV
                                                </button>

                                                {(cvFile || formData.cvFileUrl) && (
                                                    <div className="mt-2 text-green-600 flex items-center">
                                                        <span className="break-words w-[calc(100%-35px)]">File uploaded: {cvFile ? cvFile.name : formData.cvFileUrl.split('/').pop()}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCvFile(null);
                                                                setFormData(prev => ({ ...prev, cvFile: null }));
                                                                if (cvFileRef.current) {
                                                                    cvFileRef.current.value = null;
                                                                }
                                                            }}
                                                            className="ml-4 text-red-600 hover:text-red-800"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={() => handleSave('cv')}
                                                    className="text-green-500 cursor-pointer"
                                                    disabled={saving}
                                                >
                                                    {saving ? (
                                                        <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
                                                    ) : (
                                                        <FaCheck />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.cvFileUrl ? (
                                                <div className="flex items-center gap-2">
                                                    <FaCertificate className="text-[#E35D33]" />
                                                    <a 
                                                        href={formData.cvFileUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View CV
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">No CV uploaded</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Information */}
                    {/* <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Information</label>
                        </div>
                        <div className={editClassWrapper}>
                            {loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <FaGlobe className="text-[#E35D33]" />
                                            <span>Country of Birth: {formData.countryOfBirth || 'Not specified'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> */}
                </div>

                {/* Right side - Profile card and controls */}
                <div className='flex-1 mb-[20px]'>
                    <div className="md:sticky md:top-[115px] flex flex-col gap-[16px]">
                        <div className={editClassWrapper}>
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <img
                                        src={user?.photoProfileUrl || "/placeholder.svg"}
                                        alt="profile-picture"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                    <Link href="/tutor-dashboard/settings" passHref className="absolute bottom-0 right-0 bg-[#E35D33] text-white p-2 rounded-full cursor-pointer">
                                        <FaPen className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="text-center mb-4 flex flex-col items-center justify-center gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username}</span>
                                    <FaCheck className="text-green-500" />
                                </div>

                                {/* Display rating if available */}
                                {formData.averageRating > 0 && (
                                    <div className="flex items-center gap-1 mt-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-xl ${i < Math.round(formData.averageRating) ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">({formData.reviewCount || 0} reviews)</span>
                                    </div>
                                )}

                                {/* Display student and course counts */}
                                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                                    <div>
                                        <span className="font-bold">{formData.numberOfStudents || 0}</span> Students
                                    </div>
                                    <div>
                                        <span className="font-bold">{formData.numberOfCourses || 0}</span> Courses
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* View profile button */}
                        <div className="bg-gray-200 rounded-[32px] cursor-pointer">
                            {user?.tutor?.id && (
                                <Link href={`/tutor/${user.tutor.id}`}>
                                    <button className="p-4 flex w-full gap-2 font-semibold items-center justify-center cursor-pointer">
                                        <FaEye/>
                                        <span>View from the students perspective</span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}