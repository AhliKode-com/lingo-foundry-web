"use client"
import React, { useState,useEffect } from 'react';
import { FaPen, FaCheck, FaEye } from 'react-icons/fa';
import { useAuth } from "@/context/AuthContext";
import { getDetail } from "@/apis/getTutorDetail";
import {toast} from "react-toastify";
import Link from "next/link";

export default function TutorProfileForm() {
    const { user } = useAuth();
    const { getData } = getDetail();

    const [formData, setFormData] = useState({
        bio: '',
        introduction: '',
        teachingExperience: '',
        courseMotivation: ''
    });

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState({
        bio: false,
        introduction: false,
        teachingExperience: false,
        courseMotivation: false
    });

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({...prev,[field]: value}));
    };

    const handleSave = (field) => {
        setEditing((prev) => ({...prev,[field]: false}));
    };

    const fetchTutorDetails = async () => {
        if (user?.tutor?.id) {
            setLoading(true);
            try {
                const tutorDetailData = await getData(user.tutor.id);
                setFormData({
                    bio: tutorDetailData?.tutor?.bio || '',
                    introduction: tutorDetailData?.tutor?.introduction || '',
                    teachingExperience: tutorDetailData?.tutor?.teachingExperience || '',
                    courseMotivation: tutorDetailData?.tutor?.courseMotivation || ''
                })
            } catch (error) {
                toast.error(error.message);
                setFormData({});
            } finally {
                setLoading(false);
            }
        }
    };
    
    useEffect(() => {
        fetchTutorDetails();
    }, [user]);

    

    const editClassWrapper = "rounded-[32px] border-[1px] border-[#D9D9D9] p-4";
    const editContent = "border-[1px] border-[#A6A6A6] p-4 rounded-[32px]"

    return (
        <div className="lingo-container flex flex-col lg:flex-row gap-[20px] mb-[72px]">
            {/* start of modal */}
            {/* end of modal */}
            <div className="w-full flex-col lg:flex-row flex gap-[20px]">
                {/* Left side - Form fields */}
                <div className='flex flex-col gap-[16px] lg:w-2/3'>
                    {/* bio Field */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Bio</label>
                            <button onClick={() => handleEdit('bio')} className={`${editing.bio ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {editing.bio ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formData.bio}
                                        onChange={(e) => handleChange('bio', e.target.value)}
                                        className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                    <button onClick={() => handleSave('bio')} className="text-green-500 cursor-pointer">
                                        <FaCheck />
                                    </button>
                                </div>
                            ) : loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {formData.bio}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* introduction Field */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Introduction</label>
                            <button onClick={() => handleEdit('introduction')} className={`${editing.introduction ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {editing.introduction ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formData.introduction}
                                        onChange={(e) => handleChange('introduction', e.target.value)}
                                        className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                    <button onClick={() => handleSave('introduction')} className="text-green-500 cursor-pointer">
                                        <FaCheck />
                                    </button>
                                </div>
                            ) : loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {formData.introduction}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* teachingExperience Field */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Teaching Experience</label>
                            <button onClick={() => handleEdit('teachingExperience')} className={`${editing.teachingExperience ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {editing.teachingExperience ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formData.teachingExperience}
                                        onChange={(e) => handleChange('teachingExperience', e.target.value)}
                                        className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                    <button onClick={() => handleSave('teachingExperience')} className="text-green-500 cursor-pointer">
                                        <FaCheck />
                                    </button>
                                </div>
                            ) : loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {formData.teachingExperience}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* courseMotivation Field */}
                    <div className='flex flex-col gap-2'>
                        <div className="flex justify-between items-center">
                            <label className="text-[#E35D33] font-medium">Course Motivation</label>
                            <button onClick={() => handleEdit('courseMotivation')} className={`${editing.courseMotivation ? 'text-[#E35D33]' : 'text-gray-500 hover:text-[#E35D33]'}  cursor-pointer animation-effect`}>
                                <FaPen />
                            </button>
                        </div>
                        <div className={editClassWrapper}>
                            {editing.courseMotivation ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formData.courseMotivation}
                                        onChange={(e) => handleChange('courseMotivation', e.target.value)}
                                        className="w-full p-4 border rounded-[32px] border-[#E35D33] focus:border-none focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                    <button onClick={() => handleSave('courseMotivation')} className="text-green-500 cursor-pointer">
                                        <FaCheck />
                                    </button>
                                </div>
                            ) : loading ? (
                                <div className="w-full h-[60px] bg-gray-300 animate-pulse rounded-[32px]"></div>
                            ) : (
                                <div className={editContent}>
                                    {formData.courseMotivation}
                                </div>
                            )}
                        </div>
                    </div>
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

                            <div className="text-center mb-4 flex items-center justify-center gap-3">
                                <span className="text-2xl font-bold">{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username}</span>
                                <FaCheck className="text-green-500" />
                            </div>

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
        </div>
    );
}