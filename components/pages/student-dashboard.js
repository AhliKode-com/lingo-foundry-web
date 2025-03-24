/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 08:41:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 11:08:47
 */

import StudentDashboard from '@/components/organisms/dashboard/main/student-dashboard';
import StudentLikeCourses from '@/components/organisms/dashboard/main/student-like-courses';

export default function Home() {
    return (
        <>
            <StudentDashboard/>
            <StudentLikeCourses/>
        </>
    )
}