/*
 * @Author: advistasyam
 * @Date: 2025-03-24 08:41:45
 * @Last Modified by: advistasyam
 * @Last Modified time: 2025-03-24 11:08:47
 */

import StudentRescheduleBooking from "@/components/organisms/dashboard/reschedule/template";
import {Suspense} from "react";

export default function StudentDashboardReschedule() {
    return (
        <Suspense fallback={null}>
            <StudentRescheduleBooking />
        </Suspense>
    )
}