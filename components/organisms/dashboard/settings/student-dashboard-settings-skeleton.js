import React from "react";

export default function UserProfileSkeleton() {
    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow space-y-6 animate-pulse">
            <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0">
                {/* Profile Image Upload */}
                <div className="w-full md:w-1/3 space-y-2">
                    <div className="aspect-square w-full bg-gray-200 rounded-md" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                    {/* Full name fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded" />
                    </div>

                    {/* Username */}
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />

                    {/* Email */}
                    <div className="h-4 w-1/4 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />

                    {/* Title */}
                    <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    <div className="h-10 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Save Button */}
            <div className="w-36 h-10 bg-gray-300 rounded-md mx-auto md:mx-0" />
        </div>
    );
}
