/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-27 22:15:58
 */
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TitleTutorRegis, DescTutorRegis } from "@/components/atoms/title"
import { IoIosArrowDown } from "react-icons/io";

export default function Availability({setCurrentStep}) {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState({});
    const [selectedTimes, setSelectedTimes] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
            timeAvail: {
                monday: [{ from: "", to: "" }],
                tuesday: [{ from: "", to: "" }],
                wednesday: [{ from: "", to: "" }],
                thursday: [{ from: "", to: "" }],
                friday: [{ from: "", to: "" }],
                saturday: [{ from: "", to: "" }],
                sunday: [{ from: "", to: "" }],
            }
        },
    })

    const days = watch("days");
    const timeAvail = watch("timeAvail");

    const handleDropdownToggle = (day, slotIndex, type) => {
        setDropdownOpen(`${day}-${slotIndex}-${type}`);
    };

    // Generate time options (24-hour format)
    const timeOptions = Array.from({ length: 24 }, (_, i) => {
        return `${i.toString().padStart(2, '0')}:00`;
    });

    const filteredTimes = timeOptions.filter(time =>
        time.toLowerCase().includes((searchTerm[dropdownOpen] || "").toLowerCase())
    );

    const addTimeSlot = (day) => {
        const currentSlots = getValues(`timeAvail.${day}`);
        setValue(`timeAvail.${day}`, [...currentSlots, { from: "", to: "" }]);
    };

    const removeTimeSlot = (day, index) => {
        const currentSlots = getValues(`timeAvail.${day}`);
        if (currentSlots.length > 1) {
            setValue(`timeAvail.${day}`, currentSlots.filter((_, i) => i !== index));
        }
    };

    const onSubmit = (data) => {
        // Filter out unchecked days
        const formData = {
            timeAvail: {}
        };
        // Only include checked days and their time slots
        Object.keys(data.days).forEach(day => {
            if (data.days[day]) {
                formData.timeAvail[day] = data.timeAvail[day];
            }
        });

        localStorage.setItem("applyTutorStep5Data", JSON.stringify(formData))
        localStorage.setItem("applyTutorCurrentStep", "6")
        setCurrentStep(6);
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col">
            <TitleTutorRegis text="Set your availability" custom="mb-[10px] md:mb-[25px]" />
            <DescTutorRegis
                text="Availability shows your potential working hours. Students can book lessons at these times."
                custom="mb-[10px] md:mb-[25px]"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
                <div className="space-y-6">
                    {Object.keys(days).map((day) => (
                        <div key={day} className="border border-gray-200 rounded-lg p-4">
                            <div className={`flex items-center ${days[day] ? 'mb-4' : ''}`}>
                                <input
                                    type="checkbox"
                                    id={day}
                                    className="h-4 w-4 rounded border-gray-300 text-[#E35D33] focus:ring-[#E35D33]"
                                    {...register(`days.${day}`)}
                                />
                                <label htmlFor={day} className="ml-2 text-sm font-medium text-gray-700 capitalize">
                                    {day}
                                </label>
                            </div>

                            {days[day] && (
                                <div className="space-y-4">
                                    {timeAvail[day].map((slot, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div className="relative flex-1">
                                                <input
                                                    type="hidden"
                                                    {...register(`timeAvail.${day}.${index}.from`)}
                                                    value={selectedTimes[`${day}-${index}-from`] || ""}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDropdownToggle(day, index, 'from')}
                                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                >
                                                    <span className="text-left flex-1">
                                                        {selectedTimes[`${day}-${index}-from`] || "From..."}
                                                    </span>
                                                    <IoIosArrowDown />
                                                </button>

                                                {dropdownOpen === `${day}-${index}-from` && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                        <div className="p-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                value={searchTerm[dropdownOpen] || ""}
                                                                onChange={(e) =>
                                                                    setSearchTerm(prev => ({ ...prev, [dropdownOpen]: e.target.value }))
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                            />
                                                        </div>
                                                        {filteredTimes.map((time, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                onClick={() => {
                                                                    setSelectedTimes(prev => ({
                                                                        ...prev,
                                                                        [`${day}-${index}-from`]: time
                                                                    }));
                                                                    setValue(`timeAvail.${day}.${index}.from`, time);
                                                                    setDropdownOpen(null);
                                                                }}
                                                            >
                                                                <span className="text-[16px]">{time}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative flex-1">
                                                <input
                                                    type="hidden"
                                                    {...register(`timeAvail.${day}.${index}.to`)}
                                                    value={selectedTimes[`${day}-${index}-to`] || ""}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDropdownToggle(day, index, 'to')}
                                                    className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                >
                                                    <span className="text-left flex-1">
                                                        {selectedTimes[`${day}-${index}-to`] || "To..."}
                                                    </span>
                                                    <IoIosArrowDown />
                                                </button>

                                                {dropdownOpen === `${day}-${index}-to` && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                                        <div className="p-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Search..."
                                                                value={searchTerm[dropdownOpen] || ""}
                                                                onChange={(e) =>
                                                                    setSearchTerm(prev => ({ ...prev, [dropdownOpen]: e.target.value }))
                                                                }
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                                            />
                                                        </div>
                                                        {filteredTimes.map((time, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                                                onClick={() => {
                                                                    setSelectedTimes(prev => ({
                                                                        ...prev,
                                                                        [`${day}-${index}-to`]: time
                                                                    }));
                                                                    setValue(`timeAvail.${day}.${index}.to`, time);
                                                                    setDropdownOpen(null);
                                                                }}
                                                            >
                                                                <span className="text-[16px]">{time}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTimeSlot(day, index)}
                                                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
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
                                        onClick={() => addTimeSlot(day)}
                                        className="text-[#E35D33] underline text-sm font-medium"
                                    >
                                        Add another time slot
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {setCurrentStep(4)}}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className={`px-8 py-3 bg-[#E35D33] text-white rounded-lg hover:bg-[#d04e26] transition-colors`}
                    >
                        Save and Continue
                    </button>
                </div>
            </form>
        </div>
    )
}