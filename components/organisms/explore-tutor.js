/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 00:15:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 00:47:07
 */

import CategorySelection from "@/components/atoms/category-selection";
import { TitleText } from "@/components/atoms/title";
import { OrangeText } from "@/components/atoms/title";
import { Home } from "@/constants/en";

export default function ExploreTutor() {
    const { findTutor } = Home;
    return (
        <div className="lingo-container pt-[100px] flex flex-col relative">
            <OrangeText text={findTutor.title} position="justify-center"/>
            <TitleText text={findTutor.subtitle} marginBottom='mb-[40px]'/>
            <CategorySelection />

            {/* advis */}
        </div>
    )
}