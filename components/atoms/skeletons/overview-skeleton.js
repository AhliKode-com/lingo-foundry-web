import { TitleStudentDashboard } from "@/components/atoms/title";
import { LastDaysButton } from "@/components/atoms/buttons";

export function OverviewSkeleton() {
    return (
        <div className="flex lg:flex-row flex-col px-[32px] py-[44px] bg-[#FDE0D7] mt-[56px] justify-between gap-[24px] lg:gap-0">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <TitleStudentDashboard text="Overview" />
                    <span className="text-[#4D4C5C]">Your business at a glance.</span>
                </div>
                <LastDaysButton custom="mt-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px]">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="p-[24px] flex items-center gap-[24px] bg-white">
                        <div className="h-[60px] w-[60px] bg-gray-200 rounded animate-pulse flex-shrink-0" />
                        <div className="flex flex-col gap-[12px] w-full">
                            <div className="h-[36px] w-[100px] bg-gray-200 rounded animate-pulse" />
                            <div className="h-[21px] w-[140px] bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 