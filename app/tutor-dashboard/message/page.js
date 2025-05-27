/*
 * @Author: danteclericuzio
 * @Date: 2025-04-24 09:23:40
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-24 09:23:41
 */

import TutorDashboardMessage from "@/components/pages/dashboard/student-dashboard-message";
import { Suspense } from "react";

export default function StudentMessage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TutorDashboardMessage />
        </Suspense>
    )
}