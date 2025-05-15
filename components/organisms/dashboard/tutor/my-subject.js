"use client"

import React, { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaCheck, FaEye, FaTrash, FaTimes } from 'react-icons/fa';
import { useAuth } from "@/context/AuthContext";
import { getEnums } from "@/apis/getEnum";
import Link from "next/link";
import { getDetail } from "@/apis/getTutorDetail";
import {useTutorSubject} from "@/apis/dashboard/my-subject/useTutorSubject";
import {toast} from "react-toastify";
import { CreateOrangeButton } from '@/components/atoms/buttons';

export default function TutorDashboardMySubjectOrganism() {
    const { user } = useAuth();
    const { data: enums } = getEnums();
    const { getData } = getDetail();
    const { postTutorSubject, putTutorSubject } = useTutorSubject();

    const [tutorSubjects, setTutorSubjects] = useState([]);
    const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

    const [formData, setFormData] = useState({
        description: '',
        level: 'General',
        price: 0,
        minimumSession: 1,
        maximumSession: 10,
        isActive: true
    });

    const [editing, setEditing] = useState({
        description: false,
        level: false,
        minimumSession: false,
        maximumSession: false,
        price: false
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedSubjectForCreate, setSelectedSubjectForCreate] = useState(null);
    const [selectedSubjectLevelForCreate, setSelectedSubjectLevelForCreate] = useState(null);

    const fetchTutorDetails = async () => {
        if (user?.tutor?.id && enums.subjectLevelTeach.length > 0) {
            try {
                const tutorDetailData = await getData(user.tutor.id);
                if (Array.isArray(tutorDetailData.tutorSubjects)) {
                    setTutorSubjects(tutorDetailData.tutorSubjects);

                    if (tutorDetailData.tutorSubjects.length > 0) {
                        setSelectedSubjectIndex(0);
                        updateFormDataFromSubject(tutorDetailData.tutorSubjects[0]);
                    }
                } else {
                    setTutorSubjects([]);
                }
            } catch (error) {
                console.error("Error fetching tutor details:", error);
                toast.error(error.message);
                setTutorSubjects([]);
            }
        }
    };

    useEffect(() => {
        fetchTutorDetails();
    }, [user, enums]);

    const updateFormDataFromSubject = (subject) => {
        if (subject) {
            const subjectLevel = enums.subjectLevelTeach.find(level => parseInt(level.name) === subject.subjectLevel.id);

            setFormData({
                description: subject.description || '',
                level: subjectLevel.name || 'General',
                price: subject.hourlyRate || 0,
                minimumSession: subject.minimumSession || 1,
                maximumSession: subject.maximumSession || 10,
                isActive: true,
            });
        }
    };

    const selectSubject = (index) => {
        setSelectedSubjectIndex(index);
        updateFormDataFromSubject(tutorSubjects[index]);
    };

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleSave = async (field) => {
        setEditing({ ...editing, [field]: false });

        const updatedSubjects = [...tutorSubjects];
        const updatedSubject = { ...updatedSubjects[selectedSubjectIndex] };

        switch (field) {
            case 'description':
                updatedSubject.description = formData.description;
                break;
            case 'level':
                updatedSubject.subjectLevel = {
                    id: enums.subjectLevelTeach.find(level => parseInt(level.name) === parseInt(formData.level))?.id || 1,
                    name: formData.level
                };
                break;
            case 'price':
                updatedSubject.hourlyRate = Number(formData.price);
                break;
            case 'minimumSession':
                updatedSubject.minimumSession = Number(formData.minimumSession);
                break;
            case 'maximumSession':
                updatedSubject.maximumSession = Number(formData.maximumSession);
                break;
        }

        updatedSubjects[selectedSubjectIndex] = updatedSubject;

        const putPayload = {
            tutorSubjectId: updatedSubject.id,
            description: updatedSubject.description,
            hourlyRate: updatedSubject.hourlyRate,
            minimumSession: updatedSubject.minimumSession,
            maximumSession: updatedSubject.maximumSession,
        }

        await putTutorSubject(putPayload);
        toast.success("Successfully updated");
        setTutorSubjects(updatedSubjects);
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const createNewSubject = async () => {
        if (!selectedSubjectForCreate) return;
        if (!selectedSubjectLevelForCreate) return;

        const newSubject = {
            subjectId: parseInt(selectedSubjectForCreate.name),
            subjectLevelId: selectedSubjectLevelForCreate,
            description: `${selectedSubjectForCreate.displayName} Subject Description`,
            minimumSession: 1,
            maximumSession: 5,
            hourlyRate: 100000
        }

        await postTutorSubject(newSubject)
        await fetchTutorDetails()

        setShowCreateModal(false)
        setSelectedSubjectForCreate(null)
    };

    const deleteCurrentSubject = () => {
        if (tutorSubjects.length <= 1) return;

        // Todo: add delete api here
        const updatedSubjects = tutorSubjects.filter((_, index) => index !== selectedSubjectIndex);
        setTutorSubjects(updatedSubjects);

        setSelectedSubjectIndex(0);
        if (updatedSubjects.length > 0) {
            updateFormDataFromSubject(updatedSubjects[0]);
        }

        setShowDeleteConfirm(false);
    };


    const editClassWrapper = "rounded-[32px] border-[1px] border-[#D9D9D9] p-4";
    const editContent = "border-[1px] border-[#A6A6A6] p-4 rounded-[32px]"

    return (
            <div className="lingo-container flex flex-col lg:flex-row gap-[20px] mb-[72px]">
                {/* create subject modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-lg">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md border-2 border-orange-300">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Create New Subject</h3>
                                <button onClick={() => setShowCreateModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Select Subject</label>
                                <select
                                    className="cursor-pointer w-full p-2 border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    value={selectedSubjectForCreate?.name || ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        const subject = enums?.subjectTeach?.find(s => s.name === selectedId);
                                        setSelectedSubjectForCreate(subject || null);
                                    }}
                                >
                                    <option value="">Select a subject</option>
                                    {enums?.subjectTeach?.filter(subject =>
                                        !tutorSubjects.some(ts => ts.subject.id === subject.name)
                                    ).map(subject => (
                                        <option key={subject.name} value={subject.name}>
                                            {subject.displayName}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={selectedSubjectLevelForCreate || ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setSelectedSubjectLevelForCreate(parseInt(selectedId, 10));
                                    }}
                                    className="cursor-pointer w-full mt-2 p-2 border rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                >
                                    <option value="">Select a subject level</option>
                                    {enums?.subjectLevelTeach?.map((item, index) => (
                                        <option key={index} value={item.name}>{item.displayName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createNewSubject}
                                    className="cursor-pointer px-4 py-2 bg-[#E35D33] text-white rounded-md hover:bg-orange-600"
                                    disabled={!selectedSubjectForCreate}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {/*{showDeleteConfirm && tutorSubjects.length > 0 && (*/}
                {/*    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">*/}
                {/*        <div className="bg-white rounded-lg p-6 w-full max-w-md">*/}
                {/*            <div className="flex justify-between items-center mb-4">*/}
                {/*                <h3 className="text-xl font-bold">Remove Subject</h3>*/}
                {/*                <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 hover:text-gray-700">*/}
                {/*                    <FaTimes />*/}
                {/*                </button>*/}
                {/*            </div>*/}

                {/*            <p className="mb-4">*/}
                {/*                Are you sure you want to remove your {tutorSubjects[selectedSubjectIndex]?.subject?.name} subject?*/}
                {/*                This action cannot be undone.*/}
                {/*            </p>*/}

                {/*            <div className="flex justify-end gap-2">*/}
                {/*                <button*/}
                {/*                    onClick={() => setShowDeleteConfirm(false)}*/}
                {/*                    className="px-4 py-2 border rounded-md hover:bg-gray-100"*/}
                {/*                >*/}
                {/*                    Cancel*/}
                {/*                </button>*/}
                {/*                <button*/}
                {/*                    onClick={deleteCurrentSubject}*/}
                {/*                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"*/}
                {/*                >*/}
                {/*                    Remove*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* Left side - Form fields */}
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-[20px]">
                    {/* subject list */}
                    <div className="flex flex-col gap-2 lg:w-1/3">
                        <div className='md:sticky md:top-[115px] flex flex-col gap-[16px]'>
                            <CreateOrangeButton text="Create Subject" onClick={() => setShowCreateModal(true)}/>
                            {tutorSubjects.length > 0 ? (
                                tutorSubjects.map((subject, index) => (
                                    <div
                                        key={subject.id}
                                        className={`flex items-center p-4 justify-between cursor-pointer rounded-[32px] border-[1px] animation-effect ${
                                            index === selectedSubjectIndex ? 'bg-gray-800 text-white border-gray-800' : 'hover:bg-gray-100 border-[#D9D9D9]'
                                        }`}
                                        onClick={() => selectSubject(index)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={subject.subject?.iconUrl || "/placeholder.svg"}
                                                alt={subject.subject?.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className='flex flex-col'>
                                                <p className="font-semibold line-clamp-1">{subject.subject?.name} - {enums?.subjectLevelTeach?.find(item => item.name === formData.level)?.displayName || formData.level}</p>
                                                <p className="text-sm text-green-500">active</p>
                                            </div>
                                        </div>
                                        {/* TODO: Implement Later When Delete teachSubject API ready*/}
                                        {/*{tutorSubjects.length > 1 && (*/}
                                        {/*    <button*/}
                                        {/*        className={`text-${index === selectedSubjectIndex ? 'white' : 'red-500'} hover:text-red-700`}*/}
                                        {/*        onClick={(e) => {*/}
                                        {/*            e.stopPropagation();*/}
                                        {/*            setSelectedSubjectIndex(index);*/}
                                        {/*            setShowDeleteConfirm(true);*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        <FaTrash />*/}
                                        {/*    </button>*/}
                                        {/*)}*/}
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center">
                                    No subjects found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* form fields */}
                    <div className='flex flex-col lg:w-2/3 gap-[16px]'>
                        {tutorSubjects.length > 0 ? (
                            <>
                                {/* Price / Hour Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[#E35D33] font-medium">Price / Hour</label>
                                        <button onClick={() => handleEdit('price')} className={`${editing.price ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                            <FaPen />
                                        </button>
                                    </div>
                                    <div className={editClassWrapper}>
                                        {editing.price ? (
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-full">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp.</span>
                                                    <input
                                                        type="number"
                                                        value={formData.price}
                                                        onChange={(e) => handleChange('price', e.target.value)}
                                                        className="w-full pl-12 pr-4 py-4 border rounded-[32px] border-[#E35D33] focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                    />
                                                </div>
                                                <button onClick={() => handleSave('price')} className="text-green-500 cursor-pointer">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={editContent}>
                                                Rp. {formData.price?.toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description Field */}
                                <div className='flex flex-col gap-2'>
                                    <div className="flex justify-between items-center">
                                        <label className="text-[#E35D33] font-medium">Description</label>
                                        <button onClick={() => handleEdit('description')} className={`${editing.description ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                            <FaPen />
                                        </button>
                                    </div>
                                    <div className={editClassWrapper}>
                                        {editing.description ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={formData.description}
                                                    onChange={(e) => handleChange('description', e.target.value)}
                                                    className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                />
                                                <button onClick={() => handleSave('description')} className="text-green-500 cursor-pointer">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={editContent}>
                                                {formData.description}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Minimum Session Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[#E35D33] font-medium">Minimum Session</label>
                                        <button onClick={() => handleEdit('minimumSession')} className={`${editing.minimumSession ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                            <FaPen />
                                        </button>
                                    </div>
                                    <div className={editClassWrapper}>
                                        {editing.minimumSession ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    value={formData.minimumSession}
                                                    onChange={(e) => handleChange('minimumSession', e.target.value)}
                                                    className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                    type="number"
                                                    min="1"
                                                />
                                                <button onClick={() => handleSave('minimumSession')} className="text-green-500 cursor-pointer">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={editContent}>
                                                {formData.minimumSession}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Maximum Session Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[#E35D33] font-medium">Maximum Session</label>
                                        <button onClick={() => handleEdit('maximumSession')} className={`${editing.maximumSession ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                            <FaPen />
                                        </button>
                                    </div>
                                    <div className={editClassWrapper}>
                                        {editing.maximumSession ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    value={formData.maximumSession}
                                                    onChange={(e) => handleChange('maximumSession', e.target.value)}
                                                    className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                    type="number"
                                                    min={formData.minimumSession}
                                                />
                                                <button onClick={() => handleSave('maximumSession')} className="text-green-500 cursor-pointer">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={editContent}>
                                                {formData.maximumSession}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* level Field */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[#E35D33] font-medium">Level</label>
                                    </div>
                                    <div className={editClassWrapper}>
                                        <div className={`${editContent} flex items-center gap-2`}>
                                            <span className="bg-gray-300 w-4 h-4 rounded-full flex items-center justify-center text-xs">•</span>
                                            {enums?.subjectLevelTeach?.find(item => item.name === formData.level)?.displayName || formData.level}
                                        </div>
                                    </div>
                                </div>

                                {/* subject discounts */}
                                {tutorSubjects[selectedSubjectIndex]?.subjectDiscounts?.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[#E35D33] font-medium">Discounts</label>
                                        </div>
                                        <div className={`gap-2 flex flex-col ${editClassWrapper}`}>
                                            {tutorSubjects[selectedSubjectIndex]?.subjectDiscounts
                                                .slice()
                                                .sort((a, b) => a.sessionQuantity - b.sessionQuantity)
                                                .map((discount, index) => (
                                                <div key={index} className={editContent}>
                                                    <span className="font-semibold mr-2">{discount.sessionQuantity} sessions:</span> 
                                                    {(discount.discountPercentage * 100).toFixed(0)}% off
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ):(
                            <div className="p-6 text-center">
                                    Create a subject to get started.
                            </div>
                        )}
                    </div>
                </div>

                {/* right side - profile card and controls */}
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

                            <div className="text-center mb-4 flex items-center justify-center gap-3">
                                <span className="text-2xl font-bold">{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username}</span>
                                <FaCheck className="text-green-500" />
                            </div>

                            {tutorSubjects.length > 0 && (
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500">Price/Hour</span>
                                    <span className="font-bold">Rp. {formData.price?.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

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
    );
}