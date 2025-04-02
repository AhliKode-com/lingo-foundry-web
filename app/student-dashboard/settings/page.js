/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:52:57
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 09:23:45
 */

import StudentDashboardSettings from "@/components/organisms/dashboard/settings/student-dashboard-settings";
import StudentDashboardChangePassword
    from "@/components/organisms/dashboard/settings/student-dashboard-change-password";

export default function StudentSettings() {
    return (
        <>
            <StudentDashboardSettings />
            <StudentDashboardChangePassword />
        </>
    )
}