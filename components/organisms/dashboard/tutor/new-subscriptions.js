/*
 * @Author: danteclericuzio
 * @Date: 2025-04-21 00:56:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 09:32:39
 */

import { TitleStudentDashboard } from "@/components/atoms/title";
import { LastDaysButton } from "@/components/atoms/buttons";

export default function NewSubscriptions() {
    return (
        <div className="flex flex-col mt-[85px]">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <TitleStudentDashboard text="New subscriptions"/>
                    <span className="text-[#4D4C5C]">See how many learners take the next steps after viewing your profile or taking a trial lesson.</span>
                </div>
                <LastDaysButton custom="ml-auto"/>
            </div>
        </div>
    )
}