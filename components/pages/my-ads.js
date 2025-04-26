import React, {Suspense} from "react";
import MyAdsOrganism from "@/components/organisms/dashboard/tutor/my-ads";

export default function MyAds() {
    return (
        <Suspense fallback={null}>
            <MyAdsOrganism/>
        </Suspense>
    )
}