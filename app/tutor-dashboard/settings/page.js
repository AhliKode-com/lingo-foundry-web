/*
 * @Author: danteclericuzio
 * @Date: 2025-04-24 09:18:05
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-24 09:18:06
 */

import TutorDashboardSettings from "@/components/organisms/dashboard/settings/student-dashboard-settings";
import TutorDashboardChangePassword
    from "@/components/organisms/dashboard/settings/student-dashboard-change-password";

export default function TutorSettings() {
    return (
        <>
            <TutorDashboardSettings />
            <TutorDashboardChangePassword />
        </>
    )
}