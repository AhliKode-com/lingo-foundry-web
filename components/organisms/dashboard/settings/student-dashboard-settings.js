"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {toast} from "react-toastify";

export default function StudentDashboardSettings() {
    const [selectedImage, setSelectedImage] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const title = watch("title") || ""

    const onSubmit = (data) => {
        console.log(data)
        toast.success("Data changed successfully")
        // Handle form submission
    }

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    setSelectedImage(e.target.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="lingo-container pb-12">
            <h1 className="text-3xl font-medium mb-8">Account settings</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column - Profile photo */}
                    <div className="border border-[#E9EAF0] rounded-md p-6 flex flex-col items-center justify-center h-fit">
                        <div className="relative w-full max-w-[300px] aspect-square mb-4">
                            {selectedImage ? (
                                <img src={selectedImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <img
                                    src="/placeholder.svg?height=300&width=300"
                                    alt="Profile"
                                    className="w-full h-full object-cover bg-gray-200"
                                />
                            )}
                            <label
                                htmlFor="photo-upload"
                                className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-2 px-4 flex items-center justify-center cursor-pointer"
                            >
                                <span className="mr-2">↑</span>
                                Upload Photo
                            </label>
                            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                        <p className="text-center text-gray-500 text-sm">
                            Image size should be under 1MB and image ration needs to be 1:1
                        </p>
                    </div>

                    {/* Right column - Form fields */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="fullname" className="block mb-2 font-medium">
                                Full name
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    id="firstName"
                                    placeholder="First name"
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                    {...register("firstName")}
                                />
                                <input
                                    id="lastName"
                                    placeholder="Last name"
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                    {...register("lastName")}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block mb-2 font-medium">
                                Username
                            </label>
                            <input
                                id="username"
                                placeholder="Enter your username"
                                className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                {...register("username")}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                {...register("email")}
                            />
                        </div>

                        <div>
                            <label htmlFor="title" className="block mb-2 font-medium">
                                Title
                            </label>
                            <div className="relative">
                <textarea
                    id="title"
                    placeholder="Your title, proffesion or small biography"
                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 resize-none pr-16 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                    rows={2}
                    maxLength={50}
                    {...register("title", { maxLength: 50 })}
                />
                                <span className="absolute bottom-2 right-2 text-gray-400 text-sm">{title.length}/50</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#FF6636] hover:bg-[#E55A2D] text-white px-8 py-2 rounded-md transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

