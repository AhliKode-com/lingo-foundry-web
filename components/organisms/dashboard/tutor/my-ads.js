"use client"

import React, { useState } from 'react';
import { FaPen, FaPlus, FaCheck, FaEye, FaTrash, FaPlus as FaAdd, FaTimes } from 'react-icons/fa';

export default function TutorProfileForm() {
    const [languages, setLanguages] = useState([
        {
            id: 1,
            name: 'English',
            active: true,
            selected: false
        },
        {
            id: 2,
            name: 'Indonesian',
            active: true,
            selected: true
        }
    ]);

    const [formData, setFormData] = useState({
        subject: 'Indonesian for Foreign Student',
        adsTitle: 'Indonesian Native Speaker: Teach Indonesian Language—All Levels and Needs (Adults & Kids) to English Speakers: Speaking, Writing, General Conversation, Business.',
        level: 'All Level',
        availability: [
            { day: 'Monday', startTime: '08:00', endTime: '14:30' },
            { day: 'Monday', startTime: '17:00', endTime: '22:30' },
            { day: 'Tuesday', startTime: '17:00', endTime: '22:30' }
        ],
        aboutYou: `Hello! I'm Kevin, and I'm passionate about sharing the beauty and richness of the Indonesian language and culture with learners from around the world. As a native Indonesian speaker, I specialize in helping both speaking adults master Indonesian for various purposes, whether it's for casual conversation, business communication, or personal growth.

My Background
Academic Journey: I'm currently pursuing a bachelor's degree in Computer Science at the University of California, where I've honed my skills in online learning and teaching.
Professional Experience: With 13 years of experience as a full-stack engineer and developer, I've worked with startups in diverse industries. This has equipped me with excellent communication skills and the ability to explain complex concepts in an accessible way.
Creative Pursuits: I'm also a full-time artist focusing on painting, drawing, fine art, and writing. My creative background helps me bring an innovative and engaging approach to teaching.`,
        price: 'Rp450000',
        isActive: true
    });

    const [editing, setEditing] = useState({
        subject: false,
        adsTitle: false,
        level: false,
        availability: false,
        aboutYou: false
    });

    const [newTimeSlot, setNewTimeSlot] = useState({
        day: 'Monday',
        startTime: '06:00',
        endTime: '07:00'
    });

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newLanguage, setNewLanguage] = useState('');

    const handleEdit = (field) => {
        setEditing({...editing, [field]: true});
    };

    const handleSave = (field) => {
        setEditing({...editing, [field]: false});
    };

    const handleChange = (field, value) => {
        setFormData({...formData, [field]: value});
    };

    const toggleActive = () => {
        setFormData({...formData, isActive: !formData.isActive});
    };

    const selectLanguage = (id) => {
        const updatedLanguages = languages.map(lang => ({
            ...lang,
            selected: lang.id === id
        }));
        setLanguages(updatedLanguages);

        // If switching from Indonesian to English, adjust the form data
        if (id === 1) {
            setFormData({
                ...formData,
                subject: 'English for Indonesian Speakers',
                adsTitle: 'Native English Speaker: Teach English Language—All Levels and Needs (Adults & Kids) to Indonesian Speakers: Speaking, Writing, General Conversation, Business.'
            });
        } else {
            setFormData({
                ...formData,
                subject: 'Indonesian for Foreign Student',
                adsTitle: 'Indonesian Native Speaker: Teach Indonesian Language—All Levels and Needs (Adults & Kids) to English Speakers: Speaking, Writing, General Conversation, Business.'
            });
        }
    };

    const createNewAd = () => {
        if (newLanguage.trim() === '') return;

        const newId = Math.max(...languages.map(lang => lang.id)) + 1;
        const newLang = {
            id: newId,
            name: newLanguage,
            active: true,
            selected: false
        };

        setLanguages([...languages, newLang]);
        setNewLanguage('');
        setShowCreateModal(false);
    };

    const deleteCurrentAd = () => {
        const selectedLangId = languages.find(lang => lang.selected)?.id;
        if (!selectedLangId || languages.length <= 1) return;

        const updatedLanguages = languages.filter(lang => lang.id !== selectedLangId);
        // Select the first language after deletion
        updatedLanguages[0].selected = true;

        setLanguages(updatedLanguages);
        setShowDeleteConfirm(false);

        // Update form data to match the newly selected language
        if (updatedLanguages[0].name === 'English') {
            setFormData({
                ...formData,
                subject: 'English for Indonesian Speakers',
                adsTitle: 'Native English Speaker: Teach English Language—All Levels and Needs (Adults & Kids) to Indonesian Speakers: Speaking, Writing, General Conversation, Business.'
            });
        }
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const hours = [];
    for (let i = 6; i <= 23; i++) {
        const formattedHour = i.toString().padStart(2, '0') + ':00';
        hours.push(formattedHour);
    }

    const formatTimeRange = (startTime, endTime) => {
        // Convert 24-hour format to 12-hour format
        const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            const hoursNum = parseInt(hours, 10);
            const period = hoursNum >= 12 ? 'PM' : 'AM';
            const formattedHours = hoursNum % 12 || 12;
            return `${formattedHours}${minutes !== '00' ? ':' + minutes : ''} ${period}`;
        };

        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    };

    const handleAddTimeSlot = () => {
        if (newTimeSlot.startTime < newTimeSlot.endTime) {
            setFormData({
                ...formData,
                availability: [...formData.availability, { ...newTimeSlot }]
            });
            setNewTimeSlot({
                day: 'Monday',
                startTime: '06:00',
                endTime: '07:00'
            });
        }
    };

    const handleRemoveTimeSlot = (index) => {
        const updatedAvailability = [...formData.availability];
        updatedAvailability.splice(index, 1);
        setFormData({
            ...formData,
            availability: updatedAvailability
        });
    };

    const handleTimeSlotChange = (field, value) => {
        setNewTimeSlot({
            ...newTimeSlot,
            [field]: value
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-4 min-h-screen font-sans bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left side - Form fields */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <button
                            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <FaPlus /> Create ads
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {languages.map(language => (
                            <div
                                key={language.id}
                                className={`flex items-center p-4 justify-between border-b cursor-pointer ${
                                    language.selected ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'
                                }`}
                                onClick={() => selectLanguage(language.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/placeholder.svg"
                                        alt={language.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{language.name}</p>
                                        <p className="text-sm text-green-500">active</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Subject Field */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-orange-500 font-medium">Subject</label>
                            <button onClick={() => handleEdit('subject')} className="text-gray-500 hover:text-gray-700">
                                <FaPen />
                            </button>
                        </div>
                        {editing.subject ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                <button onClick={() => handleSave('subject')} className="text-green-500">
                                    <FaCheck />
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                {formData.subject}
                            </div>
                        )}
                    </div>

                    {/* Ads Title Field */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-orange-500 font-medium">Ads Title</label>
                            <button onClick={() => handleEdit('adsTitle')} className="text-gray-500 hover:text-gray-700">
                                <FaPen />
                            </button>
                        </div>
                        {editing.adsTitle ? (
                            <div className="flex items-center gap-2">
                <textarea
                    value={formData.adsTitle}
                    onChange={(e) => handleChange('adsTitle', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="4"
                />
                                <button onClick={() => handleSave('adsTitle')} className="text-green-500">
                                    <FaCheck />
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                {formData.adsTitle}
                            </div>
                        )}
                    </div>

                    {/* Level Field */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-orange-500 font-medium">Level</label>
                            <button onClick={() => handleEdit('level')} className="text-gray-500 hover:text-gray-700">
                                <FaPen />
                            </button>
                        </div>
                        {editing.level ? (
                            <div className="flex items-center gap-2">
                                <select
                                    value={formData.level}
                                    onChange={(e) => handleChange('level', e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="All Level">All Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                <button onClick={() => handleSave('level')} className="text-green-500">
                                    <FaCheck />
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg">
                <span className="bg-white py-2 px-4 rounded-full inline-flex items-center gap-2">
                  <span className="bg-gray-300 w-4 h-4 rounded-full flex items-center justify-center text-xs">•</span>
                    {formData.level}
                </span>
                            </div>
                        )}
                    </div>

                    {/* Availability Field */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-orange-500 font-medium">Your Availability</label>
                            <button onClick={() => handleEdit('availability')} className="text-gray-500 hover:text-gray-700">
                                <FaPen />
                            </button>
                        </div>
                        {editing.availability ? (
                            <div className="space-y-4">
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Current Availability</h4>
                                    <div className="space-y-2">
                                        {formData.availability.map((slot, index) => (
                                            <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md">
                                                <span>{slot.day}: {formatTimeRange(slot.startTime, slot.endTime)}</span>
                                                <button
                                                    onClick={() => handleRemoveTimeSlot(index)}
                                                    className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Add New Time Slot</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <select
                                            value={newTimeSlot.day}
                                            onChange={(e) => handleTimeSlotChange('day', e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            {days.map(day => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={newTimeSlot.startTime}
                                            onChange={(e) => handleTimeSlotChange('startTime', e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            {hours.map(hour => (
                                                <option key={`start-${hour}`} value={hour}>{hour}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={newTimeSlot.endTime}
                                            onChange={(e) => handleTimeSlotChange('endTime', e.target.value)}
                                            className="p-2 border rounded-md"
                                        >
                                            {hours.map(hour => (
                                                <option key={`end-${hour}`} value={hour}>{hour}</option>
                                            ))}
                                        </select>

                                        <button
                                            onClick={handleAddTimeSlot}
                                            disabled={newTimeSlot.startTime >= newTimeSlot.endTime}
                                            className={`flex items-center justify-center gap-1 p-2 rounded-md ${
                                                newTimeSlot.startTime >= newTimeSlot.endTime
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                        >
                                            <FaAdd /> Add
                                        </button>
                                    </div>
                                    {newTimeSlot.startTime >= newTimeSlot.endTime && (
                                        <p className="text-red-500 text-sm mt-1">End time must be after start time</p>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleSave('availability')}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Save Availability
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <div className="flex flex-wrap gap-2">
                                    {formData.availability.map((slot, index) => (
                                        <span key={index} className="bg-white py-2 px-4 rounded-full">
                      {slot.day}: {formatTimeRange(slot.startTime, slot.endTime)}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* About You Field */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-orange-500 font-medium">About You</label>
                            <button onClick={() => handleEdit('aboutYou')} className="text-gray-500 hover:text-gray-700">
                                <FaPen />
                            </button>
                        </div>
                        {editing.aboutYou ? (
                            <div className="flex items-center gap-2">
                <textarea
                    value={formData.aboutYou}
                    onChange={(e) => handleChange('aboutYou', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="10"
                />
                                <button onClick={() => handleSave('aboutYou')} className="text-green-500">
                                    <FaCheck />
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-line">
                                {formData.aboutYou}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side - Profile card and controls */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <img
                                    src="/placeholder.svg"
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full">
                                    <FaPen className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold">Kevin</h3>
                            <span className="text-green-500 inline-flex items-center">
                <FaCheck className="ml-1" />
              </span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500">Price/Hour</span>
                            <span className="font-bold">{formData.price}</span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-t">
                            <span>Your ads is active</span>
                            <button
                                onClick={toggleActive}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <button className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md">
                            <FaEye className="text-gray-700" />
                            <span>View from the students perspective</span>
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <button
                            className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-md text-red-500"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            <FaTrash />
                            <span>Remove your ads</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Ad Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 backdrop-blur-md">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md border-2 border-gray-200">
                        <h3 className="text-xl font-bold mb-4">Create New Ad</h3>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Language</label>
                            <input
                                type="text"
                                placeholder="Enter language (e.g. Spanish, French)"
                                value={newLanguage}
                                onChange={(e) => setNewLanguage(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={createNewAd}
                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                disabled={!newLanguage.trim()}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/10 backdrop-blur-md">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md border-2 border-gray-200">
                        <h3 className="text-xl font-bold mb-4">Remove Advertisement</h3>
                        <p className="mb-4">
                            Are you sure you want to remove your {languages.find(lang => lang.selected)?.name} advertisement?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteCurrentAd}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}