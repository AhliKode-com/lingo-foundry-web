/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 00:14:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-18 14:50:04
 */

"use client"
import {useState} from "react";

import {Home} from "@/constants/en";
import {CategoryButton} from "./buttons";

export default function CategorySelection({updateCategory, category}) {
    const {findTutor} = Home;
    const categories = [
        {id: 1, name: findTutor.categorySelection.all, tag: "allPreview"},
        {id: 2, name: findTutor.categorySelection.recommended, tag: "recommended"},
        {id: 3, name: findTutor.categorySelection.highestRatedTutor, tag: "highestRated"},
        {id: 4, name: findTutor.categorySelection.newestTutor, tag: "newest"},
        {id: 5, name: findTutor.categorySelection.mostLessonCompleted, tag: "mostLessonCompleted"},
    ];

    return (
        <div className="flex flex-col items-center space-y-4 mb-[40px]">
            <div className="flex flex-wrap justify-center gap-3 mt-4">
                {categories.map((c) => (
                    <CategoryButton
                        key={c.id}
                        text={c.name}
                        isSelected={category === c.tag}
                        onClick={() => updateCategory(c.tag)}
                    />
                ))}
            </div>
        </div>
    );
}