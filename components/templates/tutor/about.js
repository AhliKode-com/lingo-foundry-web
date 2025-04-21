"use client"

/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 11:56:22
 */
import { IoIosArrowDown } from "react-icons/io";
import { useFieldArray, useForm } from "react-hook-form"
import { TitleTutorRegis, DescTutorRegis, LabelTutorRegis } from "@/components/atoms/title"
import { useEffect, useState } from "react"
import {getLandingSubjects} from "@/apis/getLandingSubjects";

export default function About({ setCurrentStep }) {
    const [savedData, setSavedData] = useState(null)

    const { data: subjects, loading } = getLandingSubjects();

    // load data from localStorage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem("applyTutorStep1Data")
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setSavedData(parsedData)
        }
    }, [])

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: savedData || {
            firstName: "",
            lastName: "",
            email: "",
            countryOfBirth: "",
            subjectYouTeach: "",
            expertise: [],
            languages: [{ language: "", level: "" }],
            phoneNumber: "",
            isOver18: false,
        },
    })

    // update form with saved data when it's loaded
    useEffect(() => {
        if (savedData) {
            reset(savedData)
        }
    }, [savedData, reset])

    const { fields, append, remove } = useFieldArray({
        control,
        name: "languages",
    })

    const onSubmit = (data) => {
        localStorage.setItem("applyTutorStep1Data", JSON.stringify(data))
        localStorage.setItem("applyTutorCurrentStep", "2")
        setSavedData(data)
        setCurrentStep(2)
    }

    const [dropdownOpen, setDropdownOpen] = useState(null)

    // country
    const countries = [
        "Indonesia", "Malaysia", "Singapore", "Thailand", "Philippines", "Vietnam", "United States", "United Kingdom", "Australia", "Canada"
    ];
    const selectedCountry = watch("countryOfBirth") || "";

    // subject you teach
    const selectedSubject = watch("subjectYouTeach") || "";

    // expertise
    const MAX_EXPERTISE = 3
    const allExpertise = ["Indonesian for Adults","Fundamental Indonesian","Indonesian for Children (6-11)","Indonesian for Teenagers (12-17)","Business Indonesian","Conversational Indonesian","Indonesian Grammar","Indonesian Culture"]
    const expertise = watch("expertise") || []
    const isExpertiseMaxReached = expertise.length >= MAX_EXPERTISE

    const handleExpertiseAdd = (newExpertise) => {
        if (newExpertise && !expertise.includes(newExpertise) && !isExpertiseMaxReached) {
            setValue("expertise", [...expertise, newExpertise])
        }
    }

    const handleExpertiseRemove = (expertiseToRemove) => {
        setValue(
            "expertise",
            expertise.filter((exp) => exp !== expertiseToRemove),
        )
    }

    // languages you speak
    const languagesList = ["English","Indonesian","Malay","Mandarin","Japanese","Korean","Spanish","French","German","Arabic"];
    const languageLevels = ["Native","Fluent","Advanced","Intermediate","Basic"];
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);

    return (
        <div className="lingo-container flex flex-col">
            <TitleTutorRegis text="About" custom="mb-[10px] md:mb-[25px]" />
            <DescTutorRegis
                text="Start creating your public tutor profile. Your progress will be automatically saved as you complete each section. You can return at any time to finish your registration."
                custom="mb-[10px] md:mb-[25px]"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="space-y-2">
                    <LabelTutorRegis text="First name" />
                    <input
                        type="text"
                        placeholder={savedData?.firstName || "First name"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("firstName", { required: true })}
                    />
                </div>

                <div className="space-y-2">
                    <LabelTutorRegis text="Last name" />
                    <input
                        type="text"
                        placeholder={savedData?.lastName || "Last name"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("lastName", { required: true })}
                    />
                </div>

                <div className="space-y-2">
                    <LabelTutorRegis text="Email" />
                    <input
                        type="email"
                        placeholder={savedData?.email || "Email"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        })}
                    />
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Country of birth" />
                    <div className="relative">
                        <input
                            type="hidden"
                            {...register("countryOfBirth", { required: true })}
                            value={selectedCountry}
                        />
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(dropdownOpen === 'country' ? null : 'country')}
                            className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        >
                            <span className="text-left flex-1">
                                {selectedCountry || "Choose country..."}
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen === 'country' && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                            {countries.map((country, index) => (
                                <div
                                key={index}
                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                onClick={() => {
                                    setValue("countryOfBirth", country)
                                    setDropdownOpen(false)
                                }}
                                >
                                    <span className="text-[16px]">{country}</span>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Subject you teach (select subjects)" />
                    <div className="relative">
                        <input
                            type="hidden"
                            {...register("subjectYouTeach", { required: true })}
                            value={selectedSubject}
                        />
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(dropdownOpen === 'subject' ? null : 'subject')}
                            className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        >
                            <span className="text-left flex-1">
                                {selectedSubject || "Select subject..."}
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen === 'subject' && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                            {subjects && subjects.length > 0 && subjects.map((subject, index) => (
                                <div
                                key={index}
                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                onClick={() => {
                                    setValue("subjectYouTeach", subject.name)
                                    setDropdownOpen(false)
                                }}
                                >
                                <span className="text-[16px]">{subject.name}</span>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text={`Expertise (maximum ${MAX_EXPERTISE})`} />
                    <div className="border border-gray-300 rounded-lg p-4 relative">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {expertise.length > 0 ? (
                                expertise.map((exp, index) => (
                                    <div key={index} className="bg-gray-100 rounded-[6px] px-3 py-1 flex items-center gap-1">
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No expertise selected</p>
                            )}
                        </div>

                        {isExpertiseMaxReached ? (
                            <p className="text-amber-600 text-sm mb-2">
                                Maximum of {MAX_EXPERTISE} expertise reached. Remove one to add another.
                            </p>
                        ) : null}
                        
                        <div className="relative">
                            <input
                                type="hidden"
                                {...register("selectedExpertiseTemp")}
                                value=""
                            />
                            <button
                                type="button"
                                disabled={isExpertiseMaxReached}
                                onClick={() => setDropdownOpen(dropdownOpen === 'expertise' ? null : 'expertise')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] ${
                                isExpertiseMaxReached ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""
                                }`}
                            >
                                <span className="text-left flex-1">
                                {isExpertiseMaxReached ? "Maximum reached" : "Select expertise..."}
                                </span>
                                <IoIosArrowDown />
                            </button>

                            {dropdownOpen === 'expertise' && !isExpertiseMaxReached && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                {allExpertise
                                    .filter((exp) => !expertise.includes(exp))
                                    .map((option, index) => (
                                    <div
                                        key={index}
                                        className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                        onClick={() => {
                                        handleExpertiseAdd(option)
                                        setDropdownOpen(null)
                                        }}
                                    >
                                        <span className="text-[16px]">{option}</span>
                                    </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Languages you speak" />
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 mb-2">
                            <div className="relative flex-1">
                                <input
                                    type="hidden"
                                    {...register(`languages.${index}.language`, {
                                    required: index === 0 ? "Language is required" : false,
                                    })}
                                    value={selectedLanguages[index] || ""}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                    setDropdownOpen(dropdownOpen === `language-${index}` ? null : `language-${index}`)
                                    }
                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                >
                                    <span className="text-left flex-1">
                                        {selectedLanguages[index] || "language..."}
                                    </span>
                                    <IoIosArrowDown />
                                </button>

                                {dropdownOpen === `language-${index}` && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                        {languagesList.map((lang, idx) => (
                                            <div
                                            key={idx}
                                            className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                            onClick={() => {
                                                const newSelected = [...selectedLanguages];
                                                newSelected[index] = lang;
                                                setSelectedLanguages(newSelected);
                                                setValue(`languages.${index}.language`, lang);
                                                setDropdownOpen(null);
                                            }}
                                            >
                                                <span className="text-[16px]">{lang}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="relative flex-1">
                                <input
                                    type="hidden"
                                    {...register(`languages.${index}.level`, {
                                    required: index === 0 ? "Level is required" : false,
                                    })}
                                    value={selectedLevels[index] || ""}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                    setDropdownOpen(dropdownOpen === `level-${index}` ? null : `level-${index}`)
                                    }
                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] bg-gray-100"
                                >
                                    <span className="text-left flex-1">
                                        {selectedLevels[index] || "level..."}
                                    </span>
                                    <IoIosArrowDown />
                                </button>

                                {dropdownOpen === `level-${index}` && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                    {languageLevels.map((level, idx) => (
                                        <div
                                        key={idx}
                                        className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                        onClick={() => {
                                            const newSelected = [...selectedLevels];
                                            newSelected[index] = level;
                                            setSelectedLevels(newSelected);
                                            setValue(`languages.${index}.level`, level);
                                            setDropdownOpen(null);
                                        }}
                                        >
                                            <span className="text-[16px]">{level}</span>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>


                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
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
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ language: "", level: "" })}
                        className="underline text-[16px] font-semibold"
                    >
                        Add another language
                    </button>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis
                        text={
                            <span>
                Phone number <span className="text-gray-500 font-normal">(optional)</span>
              </span>
                        }
                    />
                    <input
                        type="tel"
                        placeholder={savedData?.phoneNumber || "+62"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("phoneNumber")}
                    />
                </div>

                <div className="mt-6 flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="isOver18"
                            type="checkbox"
                            className="h-4 w-4 rounded border-red-300 text-[#E35D33] focus:ring-[#E35D33]"
                            {...register("isOver18", { required: true })}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="isOver18" className="font-medium text-gray-700">
                            I confirm I&#39;m over 18
                        </label>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-[#E35D33] text-white py-3 rounded-lg hover:bg-[#d04e26] transition-colors cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

