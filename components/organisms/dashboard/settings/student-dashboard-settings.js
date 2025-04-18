"use client"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify";
import {useAuth} from "@/context/AuthContext";
import {getUserMe} from "@/apis/getUserMe";
import UserProfileSkeleton from "@/components/organisms/dashboard/settings/student-dashboard-settings-skeleton";
import postUploadFile from "@/apis/static-file/postUploadFile";
import {useUserController} from "@/apis/userController";

export default function StudentDashboardSettings() {
    const {user} = useAuth();
    const {data: userMe, loading} = getUserMe()
    const { uploadFile, error } = postUploadFile()
    const { updateProfile } = useUserController()
    const { refreshUser } = useAuth()

    const [selectedImage, setSelectedImage] = useState(null)
    const [photo, setPhoto] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const bio = watch("bio") || ""

    const onSubmit = async (data) => {
        if (photo) {
            const fileUrl = await uploadFile(photo)
            console.log(fileUrl)
            let objectKey = fileUrl.split("/")
            objectKey = objectKey[objectKey.length - 1]
            if (!error && objectKey) {
                data.profilePhotoObjectKey = objectKey
            }
        }

        console.log(data)
        await updateProfile(data)
        await refreshUser()

        toast.success("Data changed successfully")
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

        const file = e.target.files[0]
        if (file) {
            // check file type
            if (!file.type.includes("image/jpeg") && !file.type.includes("image/png")) {
                alert("Please upload a JPG or PNG file")
                return
            }

            // check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB")
                return
            }

            setPhoto(file)
        }
    }

    if (!userMe || loading) {
        return <UserProfileSkeleton/>
    }

    const photoUrl = userMe?.profilePhotoObjectKey ? process.env.NEXT_PUBLIC_API_BASE_URL + "/file/download/" + userMe.profilePhotoObjectKey : "/placeholder.svg"

    return (
        <div className="lingo-container pb-12">
            <h1 className="text-3xl font-medium mb-8">Account settings</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column - Profile photo */}
                    <div
                        className="border border-[#E9EAF0] rounded-md p-6 flex flex-col items-center justify-center h-fit">
                        <div className="relative w-full max-w-[300px] aspect-square mb-4">
                            {selectedImage ? (
                                <img src={selectedImage || photoUrl} alt="Profile"
                                     className="w-full h-full object-cover"/>
                            ) : (
                                <img
                                    src={photoUrl}
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
                            <input id="photo-upload" type="file" accept="image/*" className="hidden"
                                   onChange={handleImageUpload}/>
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
                                    required={true}
                                    defaultValue={userMe.firstName || ""}
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                    {...register("firstName")}
                                />
                                <input
                                    id="lastName"
                                    placeholder="Last name"
                                    required={true}
                                    defaultValue={userMe.lastName || ""}
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                    {...register("lastName")}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="mobileNumber" className="block mb-2 font-medium">
                                Mobile Number
                            </label>
                            <input
                                id="mobileNumber"
                                placeholder="Enter your mobile number"
                                defaultValue={userMe.mobileNumber || ""}
                                className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                required={true}
                                type={"number"}
                                {...register("mobileNumber")}
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
                                disabled={true}
                                className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0] disabled bg-gray-100"
                                defaultValue={user?.username}
                                {...register("email")}
                            />
                        </div>


                        <div>
                            <label htmlFor="bio" className="block mb-2 font-medium">
                                Bio
                            </label>
                            <div className="relative">
                                <textarea
                                    id="bio"
                                    placeholder="Your bio, proffesion or small biography"
                                    className="w-full border border-[#E9EAF0] rounded-md px-3 py-2 resize-none pr-16 focus:outline-none focus:ring-2 focus:ring-[#E9EAF0]"
                                    rows={2}
                                    maxLength={50}
                                    defaultValue={userMe?.bio || ""}
                                    {...register("bio", {maxLength: 50})}
                                />
                                <span
                                    className="absolute bottom-2 right-2 text-gray-400 text-sm">{bio.length}/50</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#E55A2D] text-white px-8 py-2 rounded-md transition-colors cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

