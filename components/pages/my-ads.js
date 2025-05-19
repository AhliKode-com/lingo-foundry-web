import React, {Suspense} from "react";
import MyAdsOrganism from "@/components/organisms/dashboard/tutor/tutor-profile";

export default function MyAds() {
    return (
        <Suspense fallback={null}>
            <MyAdsOrganism/>
        </Suspense>
    )
}