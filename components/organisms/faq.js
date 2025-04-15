/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:06:48
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-05 23:29:49
 */

"use client";

import { Question } from "@/components/atoms/accordion";
import { TitleText } from "../atoms/title";
import { FindTutor } from "@/constants/en";
import { getFaqs } from "@/apis/getFaqs";

export default function Faq({purpose}) {
    const {faq} = FindTutor;

    const { data: faqs, loading } = getFaqs(purpose);

    return (
        <div className="lingo-container flex flex-col justify-center items-center pt-[250px]">
            <TitleText text={faq.title} marginX="mx-auto" marginBottom="mb-[35px]"/>

            <div className="max-w-[648px] flex flex-col gap-[25px] w-full">
                {loading ? (
                    <>
                        <div className="animate-pulse bg-gray-300 p-5 h-[80px] w-full" />
                        <div className="animate-pulse bg-gray-300 p-5 h-[80px] w-full" />
                        <div className="animate-pulse bg-gray-300 p-5 h-[80px] w-full" />
                    </>
                ): faqs?.length > 0 ? (
                    faqs.map((item, index) => (
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