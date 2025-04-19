"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { EyeClosedIcon, EyeOpenedIcon } from "@/components/organisms/dashboard/settings/icons"
import {useAuth} from "@/context/AuthContext";
import {toast} from "react-toastify"
import {useGetUserMe} from "@/apis/getUserMe";
import {useUserController} from "@/apis/userController";
import UserProfileSkeleton from "@/components/organisms/dashboard/settings/student-dashboard-settings-skeleton";

export default function StudentDashboardChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const {data: userMe, loading} = useGetUserMe()
    const { refreshUser } = useAuth()
    const { updateProfile } = useUserController()
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onSubmit = async (data) => {
        await updateProfile(data)
        await refreshUser()
        toast.success("Password changed successfully")
    }

    if (!userMe || loading) {
        return <UserProfileSkeleton/>
    }

    return (
        <div className="pt-12 w-full border-t-[1px] border-[#CFCFCF]">
            <div className="lingo-container pb-24">
                <div className="max-w-[600px]">
                    <h1 className="text-3xl font-medium mb-8">Change password</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="currentPassword" className="block mb-2 font-medium">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0] pr-10"
                                    {...register("currentPassword", { required: true })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? (
                                        <EyeOpenedIcon />
                                    ) : (
                                        <EyeClosedIcon />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block mb-2 font-medium">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0] pr-10"
                                    {...register("newPassword", { required: true })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOpenedIcon />
                                    ) : (
                                        <EyeClosedIcon />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0] pr-10"
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (value) => value === watch("newPassword") || "Passwords do not match",
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOpenedIcon />
                                    ) : (
                                        <EyeClosedIcon />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-[#E55A2D] text-white px-8 py-2 rounded-md transition-colors cursor-pointer mt-2"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

