/*
 * @Author: danteclericuzio
 * @Date: 2025-04-20 18:01:07
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-23 22:33:37
 */

import MyStudents from '@/components/organisms/dashboard/tutor/my-students';
import React, {Suspense} from "react";

export default function Home() {
    return (
        <Suspense fallback={null}>
            <MyStudents/>
        </Suspense>
    )
}