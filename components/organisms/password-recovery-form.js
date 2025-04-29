"use client"

import { useState } from "react"
import Image from "next/image"
import { useSendOtp } from "@/hooks/useSendOtp"

export default function LoginForm() {
    const { sendOtp, loadingSendOtp } = useSendOtp();
    const [showPassword, setShowPassword] = useState(false)
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendOtp(email, otp, password);
    }

    return (
        <>
            <div className="w-full space-y-4 md:space-y-8 py-[80px] md:py-[40px] px-[40px] animation-effect">
                <div className="text-left mb-[60px] md:mt-[70px] animation-effect">
                    <h1 className="text-[48px] font-bold text-gray-900">Password Recovery</h1>
                    <p className="mt-2 text-gray-600">Please fill in the OTP and create your new password</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                OTP
                            </label>
                            <div className="flex justify-between space-x-2">
                                {[...Array(6)].map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-[#E35D33] focus:outline-none text-lg"
                                        onChange={(e) => {
                                        const value = e.target.value;
                                        if (!/^[0-9]$/.test(value) && value !== "") return;
                                        
                                        const newOtp = otp.split('');
                                        newOtp[index] = value;
                                        setOtp(newOtp.join(''));

                                        if (value && e.target.nextSibling) {
                                            e.target.nextSibling.focus();
                                        }
                                        }}
                                        onKeyDown={(e) => {
                                        if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
                                            e.target.previousSibling.focus();
                                        }
                                        }}
                                    />
                                ))}
                            </div>
                            </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Image
                                        src="/assets/login/email.svg"
                                        alt="Email"
                                        width={24}
                                        height={24}
                                        className=""
                                    />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-[#E35D33] focus:outline-none"
                                    placeholder="Enter your email here"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Image
                                        src="/assets/login/key.svg"
                                        alt="Key"
                                        width={24}
                                        height={24}
                                        className=""
                                    />
                                </div>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#E35D33] focus:outline-none"
                                    placeholder="New Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <Image
                                            src="/assets/login/eye-close.svg"
                                            alt="eye-close"
                                            width={24}
                                            height={24}
                                            className="cursor-pointer"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`flex w-full justify-center rounded-lg bg-[#E35D33] py-3 px-4 text-sm font-medium text-white shadow-sm cursor-pointer`}
                    >
                        {/* {
                            loadingSendOtp ? 
                            <div>
                                <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-[#FFFFFF]"></div>
                            </div>
                            :
                        } */}
                        <span>Recover your account</span>
                    </button>
                </form>
            </div>
        </>
    )
}