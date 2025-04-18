/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 20:38:54
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-18 21:07:20
 */

"use client"
export default function EducationalMetricsChart({chart}) {
    const statistics = chart || []

    const maxValue = Math.max(
        ...statistics.flatMap(item => [item.buyCourseCount, item.completedCourseCount])
    ) + 5;

    const chartHeight = 100;
    const computeHeight = (value) => `${(value / maxValue) * chartHeight}px`;


  return (
    <div className="w-full bg-[#F9F9F9] border-[1px] border-[#E0E0E0] rounded-[16px] p-[20px]">
        {/* Container for the chart */}
        <div className="flex flex-col">
            <div className="flex mb-[8px]">
                {/* Y-Axis labels */}
                <div className="flex flex-col gap-[17px] mb-[27px] mt-auto">
                    {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map((label, i) => (
                        <div key={i} className="text-[12px] text-[#8D8D8D] font-bold">{label}</div>
                    ))}
                </div>

                {/* Chart Bars */}
                <div className="flex-1 flex items-end">
                    <div className="w-full flex justify-between items-end">
                            {statistics.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1 w-[40px] relative">
                                    <div className="relative w-4 h-[100px] flex flex-col justify-end">
                                        {/* Completed Course */}
                                        <div className="relative group">
                                            <div
                                                className={
                                                    item.completedCourseCount === 0
                                                        ? "w-[8px] h-full bg-red-100 rounded-[3px]"
                                                        : "w-[8px] bg-[#E35D33] rounded-[3px]"
                                                }
                                                style={{
                                                    height:
                                                        item.completedCourseCount === 0
                                                            ? "100%"
                                                            : computeHeight(item.completedCourseCount),
                                                }}
                                            />
                                            {item.completedCourseCount !== 0 && (
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-[10px] text-white bg-black rounded hidden group-hover:block">
                                                    {item.completedCourseCount}
                                                </div>
                                            )}
                                        </div>
                                        {/* Buy Course */}
                                        <div className="relative group">
                                            <div
                                                className={
                                                    item.buyCourseCount === 0
                                                        ? "w-[8px] h-full bg-red-100 rounded-[3px]"
                                                        : "w-[8px] bg-[#FFBA7D] rounded-[3px]"
                                                }
                                                style={{
                                                    height:
                                                        item.buyCourseCount === 0
                                                            ? "100%"
                                                            : computeHeight(item.buyCourseCount),
                                                }}
                                            />
                                            {item.buyCourseCount !== 0 && (
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-[10px] text-white bg-black rounded hidden group-hover:block">
                                                    {item.buyCourseCount}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-[12px] text-[#8D8D8D] mt-[8px]">
                                        {item.day.slice(0, 3).charAt(0).toUpperCase() + item.day.slice(1, 3).toLowerCase()}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center mt-auto gap-[26px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-[6px] animation-effect">
                    <div className="w-[12px] h-[12px] md:w-[16px] md:h-[16px] bg-[#FFBA7D] rounded-full animation-effect"></div>
                    <span className="text-[10px] sm:text-[12px] font-bold text-[#161616] animation-effect">Buy course</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-[6px] animation-effect">
                    <div className="w-[12px] h-[12px] md:w-[16px] md:h-[16px] bg-[#E35D33] rounded-full animation-effect"></div>
                    <span className="text-[10px] sm:text-[12px] font-bold text-[#161616] animation-effect">Completed course</span>
                </div>
                {/* <div className="flex flex-col sm:flex-row sm:items-center sm:gap-[6px]">
                    <div className="w-[12px] h-[12px] md:w-[16px] md:h-[16px] bg-[#1E419D] rounded-full animation-effect"></div>
                    <span className="text-[10px] sm:text-[12px] font-bold text-[#161616] animation-effect">Completed Quiz</span>
                </div> */}
            </div>
        </div>
    </div>
  );
}
