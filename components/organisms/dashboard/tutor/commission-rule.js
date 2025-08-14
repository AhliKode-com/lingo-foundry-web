/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 23:55:17
 */

import { useState } from "react";
import { TitleStudentDashboard } from "@/components/atoms/title";
import { getDashboardEarning } from "@/apis/getDashboardEarning";
import { CommissionChart } from "@/components/atoms/chart";

export default function CommissionRule() {
    const [interval] = useState('daily');
    const { data } = getDashboardEarning(interval);
    const totalEarningSum = data?.reduce((sum, item) => {
        return sum + (item.totalEarning || 0);
    }, 0) || 0;
    const today = new Date();
    const monthLong = today.toLocaleString("en-US", { month: "long" });
    const mtdLabel = `Month-to-date gross income (MTD) — ${monthLong}`;
    const mtdLabelNett = `Month-to-date estimate Nett income (MTD) — ${monthLong}`;
    return (
        <div className="flex flex-col mt-[85px]">
            <div className="flex md:flex-row flex-col gap-[20px] md:gap-0 md:items-center mb-[32px]">
                <TitleStudentDashboard text="Commision Rule"/>
            </div>
            <div className="p-[20px] md:p-[34px] bg-white border-[1px] border-[#DCDCE5] rounded-[4px]">
                {/* chart */}
                <CommissionChart data={totalEarningSum} label1={mtdLabel} label2={mtdLabelNett}/>
            </div>
        </div>
    )
}

