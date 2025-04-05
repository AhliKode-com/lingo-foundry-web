/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 14:40:42
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-05 23:19:50
 */

export default function MyCourses({data}) {
    return (
        <div className=" bg-[#F9F9F9] border-[1px] border-[#E0E0E0] rounded-[16px] flex justify-between items-center py-[8px] px-[8px] md:px-[16px] animation-effect">
            <div className="flex items-center gap-[16px]">
                <img src={data.tutorProfileUrl} alt={data.tutorFirstName} className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] rounded-[8px] md:rounded-[16px] animation-effect"/>
                <div className="flex flex-col gap-[4px]">
                    <span className="text-[12px] md:text-[14px] font-bold animation-effect">{data.subjectName}{" "}{data.subjectLevel}</span>
                    <span className="text-[10px] md:text-[12px] text-[#E35D33] font-bold animation-effect">Sessions completed{" "}{data.remainingSession}/{data.sessionCount}</span>
                </div>
            </div>
            {/* <div className="flex items-center relative">
                <img src="/assets/man-1.png" alt="man" className="animation-effect -ml-4 w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border-[1.5px] border-[#F9F9F9]"/>
                <img src="/assets/men-3.jpg" alt="man" className="animation-effect -ml-4 w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border-[1.5px] border-[#F9F9F9]"/>
                <img src="/assets/man-2.png" alt="man" className="animation-effect -ml-4 w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border-[1.5px] border-[#F9F9F9]"/>
                <img src="/assets/women-1.png" alt="man" className="animation-effect -ml-4 w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border-[1.5px] border-[#F9F9F9]"/>
                <div className="animation-effect -ml-4 flex items-center justify-center rounded-full w-[30px] h-[30px] md:w-[36px] md:h-[36px] bg-[#9EE4FB] text-[#1D4AED] text-[10px] md:text-[12px] font-semibold border-[1.5px] border-[#F9F9F9]">+41</div>
            </div> */}
        </div>
    )
}