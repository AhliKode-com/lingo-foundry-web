import React, {Suspense} from "react";
import TutorDashboardMySubject from "@/components/organisms/dashboard/tutor/my-subject";

export default function MySubject() {
    return (
        <Suspense fallback={null}>
            <TutorDashboardMySubject/>
        </Suspense>
    )
}