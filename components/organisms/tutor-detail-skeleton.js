import React from "react";

const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const TutorDetailSkeleton = () => {
    return (
        <div className="lingo-container max-w-6xl mx-auto pt-[100px] sm:pt-[120px] pb-[40px]">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left: main skeleton profile */}
                <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-20 h-20 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="w-1/2 h-5" />
                            <Skeleton className="w-3/4 h-4" />
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Skeleton className="w-1/3 h-4" />
                        <Skeleton className="w-1/2 h-4" />
                        <Skeleton className="w-1/4 h-3" />
                    </div>

                    {/* About me section */}
                    <div className="space-y-3">
                        <Skeleton className="w-1/4 h-5" />
                        <Skeleton className="w-full h-4" />
                        <Skeleton className="w-5/6 h-4" />
                        <Skeleton className="w-3/4 h-4" />
                        <Skeleton className="w-2/3 h-4" />
                        <Skeleton className="w-4/5 h-4" />
                    </div>

                    {/* Languages */}
                    <div>
                        <Skeleton className="w-1/6 h-5 mb-2" />
                        <div className="flex gap-2 flex-wrap">
                            <Skeleton className="w-28 h-6" />
                            <Skeleton className="w-32 h-6" />
                            <Skeleton className="w-36 h-6" />
                            <Skeleton className="w-28 h-6" />
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar skeleton */}
                <div className="w-full md:w-72 space-y-4 bg-white p-4 shadow rounded-xl">
                    <Skeleton className="w-full h-40 rounded-md" />
                    <Skeleton className="w-1/2 h-5" />
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-1/4 h-6" />

                    <Skeleton className="w-full h-10 rounded-md" />
                    <Skeleton className="w-full h-10 rounded-md" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-5/6 h-3" />
                </div>

            </div>
        </div>
    );
};

export default TutorDetailSkeleton;
