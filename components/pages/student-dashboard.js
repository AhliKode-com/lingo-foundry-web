/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 08:41:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-14 09:01:20
 */

import StudentDashboard from '@/components/organisms/dashboard/main/student-dashboard';
import StudentLikeCourses from '@/components/organisms/dashboard/main/student-like-courses';
import StudentCoursesGmeet from '@/components/organisms/dashboard/main/student-dashboard-courses-gmeet';
// import StudentShorts from '@/components/organisms/dashboard/main/student-dashboard-shorts';

export default function Home() {
    return (
        <>
            <StudentCoursesGmeet/>
            <StudentDashboard/>
            <StudentLikeCourses/>
            {/* <StudentShorts/> */}
        </>
    )
}