import React from 'react';

const MessagingSkeleton = () => {
    return (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden" style={{height: "80vh"}}>
            <div className="flex h-full flex-col md:flex-row">
                {/* Sidebar - hidden on mobile, visible on desktop */}
                <div className="w-full md:w-auto md:max-w-xs border-r border-gray-200 hidden md:block">
                    <div className="p-4 border-b border-gray-200">
                        {/* Header Skeleton */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-5 w-20 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Message List Skeleton */}
                    <div className="overflow-y-auto" style={{height: "calc(80vh - 120px)"}}>
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div key={idx} className="flex items-start p-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 animate-pulse flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="h-3 w-12 bg-gray-300 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col h-full">
                    {/* Chat Header */}
                    <div className="border-b border-gray-200 p-3 md:p-[14px] flex items-center flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full mr-2 md:mr-3 animate-pulse"></div>
                        <div className="flex-1">
                            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div key={idx} className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`space-y-2 ${idx % 2 === 0 ? 'max-w-[90%] md:max-w-[80%]' : 'max-w-[90%] md:max-w-[80%]'}`}>
                                        {idx % 2 === 0 && (
                                            <div className="flex items-start">
                                                <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full mr-2 animate-pulse"></div>
                                                <div className="space-y-2 flex-1">
                                                    <div className="h-10 md:h-12 w-48 md:w-64 bg-gray-300 rounded-lg animate-pulse"></div>
                                                </div>
                                            </div>
                                        )}
                                        {idx % 2 !== 0 && (
                                            <div className="h-10 md:h-12 w-48 md:w-64 bg-gray-300 rounded-lg animate-pulse"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white flex-shrink-0">
                        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse flex-shrink-0"></div>
                        <div className="flex-1 h-10 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-16 md:w-20 h-10 bg-gray-300 rounded-md animate-pulse flex-shrink-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagingSkeleton;
