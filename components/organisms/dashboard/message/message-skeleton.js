import React from 'react';

const MessagingSkeleton = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-72 border-r border-gray-200 p-4 flex flex-col">
                {/* Search Bar Skeleton */}
                <div className="h-10 bg-gray-300 rounded mb-6 animate-pulse"></div>

                {/* Message List Skeleton */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div key={idx} className="h-14 bg-gray-300 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 flex items-center space-x-4">
                    <div className="flex-1 h-10 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-16 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default MessagingSkeleton;
