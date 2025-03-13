/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 00:14:16
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 00:35:04
 */

"use client"
import { useState } from "react";

import { Home } from "@/constants/en";
import { CategoryButton } from "./buttons";

export default function CategorySelection() {
    const {findTutor} = Home;
    const categories = [
        { id: 1, name: findTutor.categorySelection.all },
        { id: 2, name: findTutor.categorySelection.recommended },
        { id: 3, name: findTutor.categorySelection.highestRatedTutor },
        { id: 4, name: findTutor.categorySelection.newestTutor },
        { id: 5, name: findTutor.categorySelection.mostLessonCompleted },
    ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {categories.map((category) => (
            <CategoryButton
                key={category.id}
                text={category.name}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
            />
        ))}
      </div>
    </div>
  );
}