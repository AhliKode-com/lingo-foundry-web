"use client"

/*
 * @Author: danteclericuzio
 * @Date: 2025-03-31 10:48:52
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-28 15:52:28
 */
import { IoIosArrowDown } from "react-icons/io";
import { useForm } from "react-hook-form"
import { TitleTutorRegis, DescTutorRegis, LabelTutorRegis } from "@/components/atoms/title"
import { useEffect, useState } from "react"
import {getEnums} from "@/apis/getEnum";
import {useTutorController} from "@/apis/tutorController";
import {useRouter} from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function Bank({ setCurrentStep }) {
    const { registerTutor } = useTutorController()
    const router = useRouter()
    const { refreshUser } = useAuth()
    const { data: enums } = getEnums();
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState({});
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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            bankAccountCode: "",
            bankAccountName: "",
            bankAccountNumber: "",
        },
    })

    const selectedBankCode = watch("bankAccountCode") || "";

    const filteredBanks = enums?.banks?.filter((bank) => {
        const searchTermLower = (searchTerm.bank || "").toLowerCase();
        const displayNameWithoutPT = (bank?.displayName || "").replace(/^PT\.\s*/i, "").toLowerCase();
        const bankName = (bank?.name || "").toLowerCase();
        return displayNameWithoutPT.includes(searchTermLower) || bankName.includes(searchTermLower);
    });

    const formatBankName = (displayName) => {
        return displayName.replace(/^PT\.\s*/i, "");
    };

    const onSubmit = async (data) => {
        localStorage.setItem("applyTutorStep5Data", JSON.stringify(data))

        const step4Data = JSON.parse(localStorage.getItem("applyTutorStep4Data"))
        const formData = {...step4Data}
        formData.bankAccountCode = data.bankAccountCode
        formData.bankAccountNumber = data.bankAccountNumber
        formData.bankAccountName = data.bankAccountName
        toast.loading("Registering your tutor profile...", {
            autoClose: 5000,
        })
        const response = await registerTutor(formData)
        console.log(response)

        if (response.error) {
            toast.dismiss()
            toast.error(response.error.message)
            return;
        }

        toast.dismiss()
        localStorage.removeItem("applyTutorCurrentStep")
        localStorage.removeItem("applyTutorStep1Data")
        localStorage.removeItem("applyTutorStep2Data")
        localStorage.removeItem("applyTutorStep3Data")
        localStorage.removeItem("applyTutorStep4Data")
        localStorage.removeItem("applyTutorStep5Data")
        toast.success("register successfully.")
        await refreshUser()
        router.push("/tutor-register-success")
    }
    return (
        <div className="lingo-container flex flex-col">
            <TitleTutorRegis text="Bank Information" custom="mb-[10px] md:mb-[25px]" />
            <DescTutorRegis
                text="We need your bank account information to pay you for your commission. Please fill in the details below."
                custom="mb-[10px] md:mb-[25px]"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="space-y-2">
                    <LabelTutorRegis text="Bank Code" />
                    <div className="relative">
                        <input
                            type="hidden"
                            {...register("bankAccountCode", { required: true })}
                            value={selectedBankCode}
                        />
                        <button
                            type="button"
                            onClick={() => handleDropdownToggle('bank')}
                            className="flex items-center w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        >
                            <span className="text-left flex-1">
                                {selectedBankCode ? formatBankName(enums.banks.find(bank => bank.name === selectedBankCode)?.displayName) : "Select bank..."}
                            </span>
                            <IoIosArrowDown />
                        </button>

                        {dropdownOpen === 'bank' && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-[#DDDFE1] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                                <div className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm.bank || ""}
                                        onChange={(e) =>
                                            setSearchTerm(prev => ({ ...prev, bank: e.target.value }))
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                                    />
                                </div>
                                {filteredBanks?.length > 0 ? (
                                    filteredBanks.map((bank, index) => (
                                        <div
                                            key={index}
                                            className="animation-effect px-[18px] py-[12px] hover:bg-[#FDE0D7] hover:text-[#E35D33] cursor-pointer"
                                            onClick={() => {
                                                setValue("bankAccountCode", bank.name);
                                                setDropdownOpen(null);
                                                setSearchTerm({});
                                            }}
                                        >
                                            <span className="text-[16px]">{formatBankName(bank.displayName)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <LabelTutorRegis text="Bank Account Holder Name" />
                    <input
                        type="text"
                        placeholder={"Bank Account Holder Name"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("bankAccountName", { required: true })}
                    />
                </div>

                <div className="space-y-2">
                    <LabelTutorRegis text="Bank Account Number" />
                    <input
                        type="text"
                        placeholder={"Bank Account Number"}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E35D33]"
                        {...register("bankAccountNumber", { 
                            required: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Only numbers are allowed"
                            },
                            onChange: (e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }
                        })}
                    />
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        className="text-[13px] md:text-[16px] px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {setCurrentStep(4)}}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className={`text-[13px] md:text-[16px] px-8 py-3 bg-[#E35D33] cursor-pointer text-white rounded-lg hover:bg-[#d04e26] transition-colors`}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

