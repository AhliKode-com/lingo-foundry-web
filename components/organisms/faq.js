/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:06:48
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-24 08:30:20
 */

"use client";

import { Question } from "@/components/atoms/question";
import { TitleText } from "../atoms/title";
import { FindTutor } from "@/constants/en";
import { getFaqs } from "@/api/getFaqs";

export default function Faq({purpose}) {
    const {faq} = FindTutor;

    const { data: faqs, loading } = getFaqs(purpose);

    //for sorting faqs based on priority (descending)
    const sortedFaqs = [...faqs].sort((a, b) => b.priority - a.priority);

    return (
        <div className="lingo-container flex flex-col justify-center items-center pt-[100px]">
            <TitleText text={faq.title} marginX="mx-auto" marginBottom="mb-[35px]"/>

            <div className="max-w-[648px] flex flex-col gap-[25px] w-full">
                {loading ? (
                    <>
                        <div className="animate-pulse bg-gray-300 p-5 h-[80px] w-full" />
                        <div className="animate-pulse bg-gray-300 p-5 h-[80px] w-full" />
                        <div className="animate-pulse bg-gray-300 p-5 h-[80px] w-full" />
                    </>
                ): sortedFaqs?.length > 0 ? (
                    sortedFaqs.map((item, index) => (
                        <Question
                            key={index}
                            title={item.title}
                            answer={item.description}
                            defaultOpen={index === 0}
                        />
                    ))
                ) : (
                    <div className="text-center py-10">No FAQs available.</div>
                )}
            </div>
        </div>
  );
}