/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-31 23:44:49
 */

import { useState } from "react";
import {
  TitleTutorRegis,
  DescTutorRegis,
  LabelTutorRegis,
} from "@/components/atoms/title";

export default function About() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryOfBirth: "",
        subjectYouTeach: "",
        expertise: [],
        languages: [{ language: "", level: "" }],
        phoneNumber: "",
        isOver18: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleLanguageChange = (index, field, value) => {
        const updatedLanguages = [...formData.languages];
        updatedLanguages[index] = {
            ...updatedLanguages[index],
            [field]: value,
        };
        setFormData((prevState) => ({
            ...prevState,
            languages: updatedLanguages,
        }));
    };

    const addLanguage = () => {
        setFormData((prevState) => ({
            ...prevState,
            languages: [...prevState.languages, { language: "", level: "" }],
        }));
    };

    const removeLanguage = (index) => {
        if (formData.languages.length > 1) {
            const updatedLanguages = [...formData.languages];
            updatedLanguages.splice(index, 1);
            setFormData((prevState) => ({
                ...prevState,
                languages: updatedLanguages,
            }));
        }
    };

    const handleExpertiseAdd = (expertise) => {
        if (!formData.expertise.includes(expertise)) {
            setFormData((prevState) => ({
                ...prevState,
                expertise: [...prevState.expertise, expertise],
            }));
        }
    };

    const handleExpertiseRemove = (expertiseToRemove) => {
        setFormData((prevState) => ({
            ...prevState,
            expertise: prevState.expertise.filter((exp) => exp !== expertiseToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="lingo-container flex flex-col">
            <TitleTutorRegis text="About" custom="mb-[10px] md:mb-[25px]" />
            <DescTutorRegis
                text="Start creating your public tutor profile. Your progress will be automatically saved as you complete each section. You can return at any time to finish your registration."
                custom="mb-[10px] md:mb-[25px]"
            />
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                    <LabelTutorRegis text="First name" />
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <LabelTutorRegis text="Last name" />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <LabelTutorRegis text="Email" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Country of birth" />
                    <div className="relative">
                        <select
                            name="countryOfBirth"
                            value={formData.countryOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            required
                        >
                            <option value="" disabled>
                                Choose country...
                            </option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Subject you teach (select subjects)" />
                    <div className="relative">
                        <select
                            name="subjectYouTeach"
                            value={formData.subjectYouTeach}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            required
                        >
                            <option value="" disabled>
                                Select subject...
                            </option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="English">English</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="History">History</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Expertise" />
                    <div className="border border-gray-300 rounded-lg p-4 relative">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.expertise.length > 0 ? (
                                formData.expertise.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 rounded-[6px] px-3 py-1 flex items-center gap-1"
                                    >
                                        <span>{exp}</span>
                                        <button
                                        type="button"
                                        onClick={() => handleExpertiseRemove(exp)}
                                        className="ml-1 rounded-full bg-gray-300 w-5 h-5 flex items-center justify-center"
                                        >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No expertise selected</p>
                            )}
                        </div>
                        <div className="relative">
                            <select
                                onChange={(e) => {
                                if (e.target.value) {
                                    handleExpertiseAdd(e.target.value);
                                    e.target.value = "";
                                }
                                }}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="">Select expertise...</option>
                                <option value="Indonesian for Adults">
                                Indonesian for Adults
                                </option>
                                <option value="Fundamental Indonesian">
                                Fundamental Indonesian
                                </option>
                                <option value="Indonesian for Children (6-11)">
                                Indonesian for Children (6-11)
                                </option>
                                <option value="Indonesian for Teenagers (12-17)">
                                Indonesian for Teenagers (12-17)
                                </option>
                                <option value="Business Indonesian">Business Indonesian</option>
                                <option value="Conversational Indonesian">
                                Conversational Indonesian
                                </option>
                                <option value="Indonesian Grammar">Indonesian Grammar</option>
                                <option value="Indonesian Culture">Indonesian Culture</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Languages you speak" />
                    {formData.languages.map((lang, index) => (
                        <div key={index} className="flex gap-4 mb-2">
                            <div className="relative flex-1">
                                <select
                                    value={lang.language}
                                    onChange={(e) =>
                                        handleLanguageChange(index, "language", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    required={index === 0}
                                >
                                    <option value="" disabled>
                                        Language...
                                    </option>
                                    <option value="English">English</option>
                                    <option value="Indonesian">Indonesian</option>
                                    <option value="Malay">Malay</option>
                                    <option value="Mandarin">Mandarin</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                    <option value="German">German</option>
                                    <option value="Arabic">Arabic</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative flex-1">
                                <select
                                    value={lang.level}
                                    onChange={(e) =>
                                        handleLanguageChange(index, "level", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-gray-100"
                                    required={index === 0}
                                >
                                    <option value="" disabled>
                                        Level
                                    </option>
                                    <option value="Native">Native</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Basic">Basic</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeLanguage(index)}
                                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 self-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addLanguage}
                        className="underline text-[16px] font-semibold"
                    >
                        Add another language
                    </button>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis
                        text={
                        <span>
                            Phone number{" "}
                            <span className="text-gray-500 font-normal">(optional)</span>
                        </span>
                        }
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+62"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mt-6 flex items-start">
                    <div className="flex items-center h-5">
                        <input
                        id="isOver18"
                        name="isOver18"
                        type="checkbox"
                        checked={formData.isOver18}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-red-300 text-[#E35D33] focus:ring-[#E35D33]"
                        required
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="isOver18" className="font-medium text-gray-700">
                        I confirm I&#39;m over 18
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
}
