"use client"

/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-12 17:13:37
 */
import { IoIosArrowDown } from "react-icons/io";
import { useFieldArray, useForm } from "react-hook-form"
import { TitleTutorRegis, DescTutorRegis, LabelTutorRegis } from "@/components/atoms/title"
import { useEffect, useState } from "react"
import {getLandingSubjects} from "@/apis/getLandingSubjects";
import {getEnums} from "@/apis/getEnum";
import {useAuth} from "@/context/AuthContext";

export default function About({ setCurrentStep }) {
    const [savedData, setSavedData] = useState(null)

    const { data: enums } = getEnums();
    const { user } = useAuth()

    console.log(user)

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
            check1: false,
            check2: false,
            check3: false,
            check4: false,
            check5: false,
            check6: false,
            check7: false
        },
    })

    // update form with saved data when it's loaded
    useEffect(() => {
        if (savedData) {
            reset(savedData)
        }
    }, [savedData, reset])

    useEffect(() => {
        if (user?.username) {
            setValue("email", user.username);
        }
    }, [user?.username, setValue]);

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

    const selectedCountry = watch("countryOfBirth") || "";

    const selectedSubject = watch("subjectYouTeach") || "";

    // expertise
    const MAX_EXPERTISE = 3
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

    useEffect(() => {
        if (savedData) {
            const languages = savedData?.languages?.map((val) => {
                return val.language
            })
            const levels = savedData?.languages?.map((val) => {
                return val.level
            })
            setSelectedLanguages(languages);
            setSelectedLevels(levels);
        }
    }, [savedData])

    //checkbox
    const checkboxFields = [
        { id: "isOver18", label: "I confirm I'm over 18" },
        { id: "check1", label: "Teachers must enter the designated online Gmeet meeting room on time to start the scheduled lesson(s);" },
        { id: "check2", label: "Teachers can request salary withdrawal before the 30th of each month, and their salary payment will be received by the range of 5th to 10th of that month;" },
        { id: "check3", label: `Active teachers will be listed on a "teacher's wall" for each subject. Each teacher's position on the wall (ranking) is calculated using comprehensive performance data from all teachers that is updated dynamically. A teacher will receive greater exposure and appear higher on the teacher's wall if our system detects an improvement in overall performance. For example, some factors that can raise your profile on the teacher's wall include: adding more time slots to teach, increasing the number of lessons you've sold, teaching more lessons;` },
        { id: "check4", label: "If a student reports any misconduct or inappropriate behavior by the teacher (e.g. arriving late to class, skipping the lesson, leaving the lesson early), Lingo Foundry reserves the right to terminate all cooperation with the teacher should LingoFoundry deem it necessary;" },
        { id: "check5", label: "If LingoFoundry discovers that a teacher is found to have attempted to teach LingoFoundry users outside the platform or circumvent LingoFoundry, LingoFoundry reserves the right to pursue appropriate legal action;" },
        { id: "check6", label: "Teachers agree to abide by and support marketing and promotional activities organized by LingoFoundry as needed (such activities aim to increase teachers' income);" },
        { id: "check7", label: "If LingoFoundry finds that a teacher is involved in any act of inappropriate behavior or slander (including but not limited to misrepresentations and scams) and deems the teacher's actions to have damaged the LingoFoundry brand or reputation, LingoFoundry reserves the right to pursue appropriate legal action." }
    ];

    // const [searchTerm, setSearchTerm] = useState({
    //     country: "",
    //     subject: "",
    //     expertise: "",

    // });
    const [searchTerm, setSearchTerm] = useState({});
    
    const filteredCountries = enums.country.filter((country) =>
        (country?.displayName || "").toLowerCase().includes((searchTerm.country || "").toLowerCase())
    );
      
    const filteredSubjects = enums.subjectTeach.filter((subject) =>
        (subject?.displayName || "").toLowerCase().includes((searchTerm.subject || "").toLowerCase())
    );
      
    const filteredExpertise = enums.expertise
        .filter((option) => !expertise.includes(option.name))
        .filter((option) =>
          (option?.displayName || "").toLowerCase().includes((searchTerm.expertise || "").toLowerCase())
    );

    const [prevDropdownOpen, setPrevDropdownOpen] = useState(null);

    useEffect(() => {
        if (prevDropdownOpen && prevDropdownOpen !== dropdownOpen) {
          setSearchTerm((prevSearch) => ({
            ...prevSearch,
            [prevDropdownOpen]: ""
          }));
        }
      
        setPrevDropdownOpen(dropdownOpen);
    }, [dropdownOpen]);

    const handleDropdownToggle = (type) => {
        setDropdownOpen((prev) => (prev === type ? null : type));
    };

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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] disabled:bg-gray-100"
                        disabled={true}
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
                            onClick={() => handleDropdownToggle('country')}
                            className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        >
                            <span className="text-left flex-1">
                                {selectedCountry ? enums.country.find(country => country.name === selectedCountry)?.displayName : "Choose country..."}
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen === 'country' && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm.country}
                                        onChange={(e) =>
                                            setSearchTerm(prev => ({ ...prev, country: e.target.value }))
                                          }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                </div>
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((item, index) => (
                                        <div
                                            key={index}
                                            className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                            onClick={() => {
                                                setValue("countryOfBirth", item.name);
                                                setDropdownOpen(false);
                                                setSearchTerm({});
                                            }}
                                        >
                                            <span className="text-[16px]">{item.displayName}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">No results found</div>
                                )}
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
                            onClick={() => handleDropdownToggle('subject')}
                            className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        >
                            <span className="text-left flex-1">
                                {selectedSubject ? enums.subjectTeach.find(subject => subject.displayName === selectedSubject)?.displayName : "Select subject..."}
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen === 'subject' && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm.subject}
                                        onChange={(e) =>
                                            setSearchTerm(prev => ({ ...prev, subject: e.target.value }))
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                </div>
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((subject, index) => (
                                        <div
                                            key={index}
                                            className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                            onClick={() => {
                                                setValue("subjectYouTeach", subject.displayName);
                                                setDropdownOpen(null);
                                                setSearchTerm({});
                                            }}
                                        >
                                            <span className="text-[16px]">{subject.displayName}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text={`Expertise (maximum ${MAX_EXPERTISE})`} />
                    <div className="border border-gray-300 rounded-lg p-4 relative">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {expertise.length > 0 ? (
                                expertise.map((exp, index) => {
                                    const expMatch = enums.expertise.find(expertiseItem => expertiseItem.name === exp)?.displayName;
                                    return(
                                        <div key={index} className="bg-gray-100 rounded-[6px] px-3 py-1 flex items-center gap-1">
                                            <span>{expMatch}</span>
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
                                    )
                                })
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
                                {...register("expertise")}
                                value=""
                            />
                            <button
                                type="button"
                                disabled={isExpertiseMaxReached}
                                onClick={() => handleDropdownToggle('expertise')}
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
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm.expertise}
                                            onChange={(e) =>
                                            setSearchTerm((prev) => ({ ...prev, expertise: e.target.value }))
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                        />
                                    </div>
                                    
                                    {filteredExpertise.length > 0 ? (
                                        filteredExpertise.map((option, index) => (
                                            <div
                                                key={index}
                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                onClick={() => {
                                                    handleExpertiseAdd(option.name)
                                                    setDropdownOpen(null)
                                                    setSearchTerm({})
                                                }}
                                            >
                                                <span className="text-[16px]">{option.displayName}</span>
                                            </div>
                                        ))
                                    ): (
                                        <div className="px-4 py-2 text-gray-500">No results found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mt-6">
                    <LabelTutorRegis text="Languages you speak" />
                    {fields.map((field, index) => {
                        const filteredLangs = enums?.subjectTeach?.filter((lang) =>
                            (lang?.displayName || "").toLowerCase().includes((searchTerm[`language-${index}`] || "").toLowerCase())
                        );
                      
                        const filteredLevels = enums?.subjectLevelTeach?.filter((level) =>
                            (level?.displayName || "").toLowerCase().includes((searchTerm[`level-${index}`] || "").toLowerCase())
                        );
                        return(
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
                                            {filteredLangs.length > 0 ? (
                                                filteredLangs.map((lang, idx) => (
                                                    <div
                                                    key={idx}
                                                    className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                    onClick={() => {
                                                        const newSelected = [...selectedLanguages];
                                                        newSelected[index] = lang.displayName;
                                                        setSelectedLanguages(newSelected);
                                                        setValue(`languages.${index}.language`, lang.displayName);
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
                                    <input
                                        type="hidden"
                                        {...register(`languages.${index}.level`, {
                                        required: index === 0 ? "Level is required" : false,
                                        })}
                                        value={selectedLevels[index] || ""}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleDropdownToggle(`level-${index}`)}
                                        className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33] bg-gray-100"
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
                                            {filteredLevels.length > 0 ? (
                                                filteredLevels.map((level, idx) => (
                                                    <div
                                                    key={idx}
                                                    className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                    onClick={() => {
                                                        const newSelected = [...selectedLevels];
                                                        newSelected[index] = level.displayName;
                                                        setSelectedLevels(newSelected);
                                                        setValue(`languages.${index}.level`, level.displayName);
                                                        setDropdownOpen(null);
                                                    }}
                                                    >
                                                        <span className="text-[16px]">{level.displayName}</span>
                                                    </div>
                                                ))
                                            ): (
                                                <div className="px-4 py-2 text-gray-500">No results found</div>
                                            )}
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
                        )
                    })}
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
                        placeholder={savedData?.phoneNumber || "enter your phone number"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("phoneNumber")}
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <span className="font-semibold text-[18px]">LingoFoundry Terms of Service </span>
                    <span>Dear Teacher,</span>
                    <span>Welcome to LingoFoundry. Before you register to become a teacher on LingoFoundry, please read our Terms of Service. By checking each box, you acknowledge that you have read this consent form and agree to abide by the following items:</span>
                </div>
                
                {checkboxFields.map(({ id, label }) => (
                    <div key={id} className="mt-2 flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id={id}
                                type="checkbox"
                                className="h-4 w-4 rounded border-red-300 text-[#E35D33] focus:ring-[#E35D33]"
                                {...register(id, { required: true })}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                        <label htmlFor={id} className="font-medium text-gray-700">
                            {label}
                        </label>
                        </div>
                    </div>
                ))}

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

