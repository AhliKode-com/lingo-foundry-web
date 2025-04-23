/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-23 17:08:42
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import { LastDaysButton } from "@/components/atoms/buttons";
import { IoCloudDownloadOutline, IoWalletOutline } from "react-icons/io5";
import { PiWarningCircleLight } from "react-icons/pi";
import { RupiahChart } from "@/components/atoms/chart";

export default function Earnings() {
    const dataEarned = [
        { date: "2025-04-01", amount: 750000 },
        { date: "2025-04-02", amount: 900000 },
        { date: "2025-04-03", amount: 1200000 },
        { date: "2025-04-04", amount: 2200000 },
        { date: "2025-04-05", amount: 970000 },
    ];

    const totalEarned = dataEarned.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="flex flex-col mt-[85px]">
            <div className="flex md:flex-row flex-col gap-[20px] md:gap-0 md:items-center mb-[32px]">
                <TitleStudentDashboard text="Earnings"/>
                <div className="ml-auto flex gap-[8px]">
                    <button className='w-full cursor-pointer flex items-center px-[10px] justify-center bg-white border-[2px] border-[#DCDCE5] rounded-[8px]'>
                        <IoCloudDownloadOutline className="text-[24px]"/>
                    </button>
                    <LastDaysButton custom="ml-auto"/>
                </div>
            </div>
            <div className="p-[34px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                <div className="h-full flex flex-col w-full">
                    {/* title */}
                    <div className="flex gap-[12px]">
                        <IoWalletOutline className="text-[45px]"/>
                        <div className="flex flex-col">
                            <span className="text-[24px] md:text-[32px] font-medium">Rp.{totalEarned.toLocaleString()}</span>
                            <div className="flex items-center gap-[8px]">
                                <span className="text-[12px] text-[#050507]">Income earned</span>
                                <PiWarningCircleLight/>
                            </div>
                        </div>
                    </div>
                    {/* chart */}
                    <div className="my-[40px]">
                        <RupiahChart data={dataEarned}/>
                    </div>
                </div>
            </div>
        </div>
    )
}