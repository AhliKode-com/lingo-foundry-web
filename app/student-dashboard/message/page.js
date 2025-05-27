/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:52:57
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-28 00:30:47
 */

import StudentDashboardMessage from "@/components/pages/dashboard/student-dashboard-message";
import { Suspense } from "react";

export default function StudentMessage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentDashboardMessage />
        </Suspense>
    )
}