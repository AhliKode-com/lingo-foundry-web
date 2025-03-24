/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 08:41:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 22:04:29
 */

import StudentDashboard from '@/components/organisms/dashboard/main/student-dashboard';
import StudentLikeCourses from '@/components/organisms/dashboard/main/student-like-courses';
import StudentCoursesZoom from '@/components/organisms/dashboard/main/student-dashboard-courses-zoom';
import StudentShorts from '@/components/organisms/dashboard/main/student-dashboard-shorts';

export default function Home() {
    return (
        <>
            <StudentDashboard/>
            <StudentLikeCourses/>
            <StudentCoursesZoom/>
            <StudentShorts/>
        </>
    )
}