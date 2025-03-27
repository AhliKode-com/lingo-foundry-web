/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 20:38:54
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-27 15:27:42
 */


export default function EducationalMetricsChart() {
    const data = [
        { day: "Mon", buyRate: 25, completionRate: 25, quizRate: 25 },
        { day: "Tue", buyRate: 33, completionRate: 33, quizRate: 33 },
        { day: "Wed", buyRate: 50, completionRate: 25, quizRate: 25 },
        { day: "Thu", buyRate: 10, completionRate: 10, quizRate: 10 },
        { day: "Fri", buyRate: 10,  completionRate: 10, quizRate: 10 },
        { day: "Sat", buyRate: 10, completionRate: 10, quizRate: 10 },
        { day: "Sun", buyRate: 10, completionRate: 10, quizRate: 10 },
    ]

    const heightMultiplier = 1.5;

    const computeHeight = (rate) => `${rate * heightMultiplier}px`;

  return (
    <div className="w-full bg-[#F9F9F9] border-[1px] border-[#E0E0E0] rounded-[16px] p-[20px]">
        {/* Container for the chart */}
        <div className="flex flex-col">
            <div className="flex mb-[8px]">
                {/* Y-Axis labels */}
                <div className="flex flex-col gap-[17px] mb-[27px] mt-auto">
                    {["100%", "75%", "50%", "25%", "0%"].map((label, i) => (
                        <div key={i} className="text-[12px] text-[#8D8D8D] font-bold">{label}</div>
                    ))}
                </div>

                {/* Chart Bars */}
                <div className="flex-1 flex items-end">
                    <div className="w-full flex justify-between items-end">
                            {data.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-1 w-[40px] relative">
                                    <div className="relative w-4 h-full flex flex-col">
                                        {/* <div className="relative group">
                                            <div
                                                className="w-[8px] bg-[#1E419D] rounded-[3px]"
                                                style={{
                                                    height: computeHeight(item.quizRate),
                                                }}
                                            />
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-[10px] text-white bg-black rounded hidden group-hover:block">
                                                {item.quizRate}%
                                            </div>
                                        </div> */}
                                        <div className="relative group">
                                            <div
                                                className="w-[8px] bg-[#E35D33] rounded-[3px]"
                                                style={{
                                                    height: computeHeight(item.completionRate),
                                                }}
                                            />
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-[10px] text-white bg-black rounded hidden group-hover:block">
                                                {item.completionRate}%
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <div
                                                className="w-[8px] bg-[#FFBA7D] rounded-[3px]"
                                                style={{ height: computeHeight(item.buyRate) }}
                                            />
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-[10px] text-white bg-black rounded hidden group-hover:block">
                                                {item.buyRate}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[12px] text-[#8D8D8D] mt-[8px]">{item.day}</div>
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
