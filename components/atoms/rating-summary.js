import { useState } from "react"

export function RatingSummary({averageRating,totalReviews,dataReview,ratingCounts}) {
    const roundedRating = Math.round(averageRating)

    const [showAll, setShowAll] = useState(false)
    const displayedReviews = showAll ? dataReview : dataReview.slice(0, 6)

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-8 md:gap-[16px]">
                {/* Left section - Average rating */}
                <div className="flex flex-col">
                    <span className="text-[44px] font-medium">{averageRating.toFixed(1)}</span>
                    <div className="flex my-[8px] md:min-w-[140px] gap-[4px]">
                        {Array(roundedRating).fill().map((_, i) => (
                            <img src="/assets/star-review.svg" alt="Star" key={i} className="w-[24px] h-[24px]" />
                        ))}
                    </div>
                    <span className="text-[14px]">{totalReviews} reviews</span>
                </div>

                {/* Right section - Rating distribution */}
                <div className="flex-1 space-y-4">
                    {[5, 4, 3, 2, 1].map((rating) => {
                    const count = ratingCounts[rating]

                    return (
                        <div key={rating} className="flex items-center gap-2">
                        <span className="text-[14px]">{rating}</span>
                        <div className="relative flex-1 h-[10px] border-[2px] border-[#E35D33]  overflow-hidden">
                            {count > 0 && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#E35D33] animation-effect"
                                    style={{
                                    width: `${(count / totalReviews) * 100}%`,
                                    }}
                                />
                            )}
                        </div>
                            <span className={`${count > 0 ? "text-[#E35D33]" : "text-gray-500"} w-12 text-center`}>({count})</span>
                        </div>
                    )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-[32px] gap-[40px] animation-effect">
                {displayedReviews.length > 0 ? (
                    displayedReviews.map((item, index) => (
                        <div key={index} className="flex flex-col animation-effect">
                            <div className="flex items-center gap-[16px]">
                                <img src={item.photoUrl || "/placeholder.svg"} alt="img" className="h-[48px] w-[48px]"/>
                                <div className="flex flex-col justify-between">
                                    <span className="text-[14px] font-semibold">{item.author}</span>
                                    <span className="text-[14px]">
                                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex mt-[16px] mb-[8px]">
                                {Array(item.rating).fill().map((_, i) => (
                                    <img src="/assets/star-review.svg" alt="Star" key={i} className="w-[18px] h-[18px]" />
                                ))}
                            </div>
                            <span className="">{item.description}</span>
                        </div>
                    ))
                ): (
                    <div>No Reviews yet</div>
                )}
            </div>
            {/* BLM KE BWH */}
            {dataReview.length > 6 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="animation-effect font-semibold py-[10px] px-[18px] mx-auto mt-[50px] border-[2px] border-[#DCDCE5] rounded-[8px]"
                >
                    {showAll ? "Show less" : `Show all (${dataReview.length}) reviews`}
                </button>
            )}

        </div>
    )
}

