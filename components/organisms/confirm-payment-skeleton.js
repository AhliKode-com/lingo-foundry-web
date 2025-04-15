import React from "react"

export default function ConfirmPaymentSkeleton() {
    return (
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md animate-pulse mt-16 w-full">
            {/* Profile section */}
            <div className="flex items-center gap-4">
                {/* Profile Picture Skeleton */}
                <div className="w-14 h-14 rounded-full bg-gray-300" />

                {/* Name and title */}
                <div className="flex flex-col">
                    <div className="w-32 h-4 bg-gray-300 rounded mb-1" />
                    <div className="w-24 h-4 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2 ml-4 flex-wrap">
                <div className="w-20 h-8 bg-gray-200 rounded" />
                <div className="w-20 h-8 bg-gray-200 rounded" />
                <div className="w-24 h-8 bg-gray-200 rounded" />
                <div className="w-24 h-8 bg-gray-200 rounded" />
            </div>

            {/* Price Skeleton */}
            <div className="w-20 h-5 bg-gray-300 rounded ml-4" />

            {/* Close Button Skeleton */}
            <div className="w-4 h-4 bg-gray-300 rounded-full ml-2" />
        </div>
    )
}
