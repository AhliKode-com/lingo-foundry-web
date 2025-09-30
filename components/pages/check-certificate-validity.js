/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 18:38:38
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-10-01 02:24:13
 */

import HeroCheckValidity from "@/components/organisms/hero-check-certificate-validity";
import {Suspense} from "react";

export default function FindTutor() {
    return (
        <>
        <Suspense fallback={null}>
            <HeroCheckValidity/>
        </Suspense>
        </>
    )
}