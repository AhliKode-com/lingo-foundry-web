/*
 * @Author: danteclericuzio
 * @Date: 2025-03-24 11:08:10
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 22:37:09
 */
"use client"
import { TitleSubDashboard } from "@/components/atoms/title";
import Shorts from "@/components/organisms/dashboard/shorts";

export default function StudentShorts() {
    const data = [
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/men-3.jpg', header: 'English Advance', desc: '🌟5 essential items for your daily life!'},
        {img: '/assets/man-2.png', header: 'English Advance', desc: '🌟5 essential items for your daily life!'}
    ]
    return(
        <div className="lingo-container flex flex-col mb-[100px]">
            <TitleSubDashboard text="Learning Shorts" custom="mb-[22px] w-full border-[#FFBA7D]"/>
            <div className="overflow-x-auto w-full">
                <div className="flex gap-[7px]">
                    {data.map((link, index) => {
                        return (
                            <Shorts key={index} data={link}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}