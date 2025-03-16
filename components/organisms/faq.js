/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 19:06:48
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-16 19:45:38
 */

"use client";

import { Question } from "@/components/atoms/question";
import { TitleText } from "../atoms/title";
import { FindTutor } from "@/constants/en";

export default function Faq() {
    const {faq} = FindTutor;
    
    const faqItems = [
        { question: faq.question1, answer: faq.answer1 },
        { question: faq.question2, answer: faq.answer2 },
        { question: faq.question3, answer: faq.answer3 },
        { question: faq.question4, answer: faq.answer4 },
    ];

    return (
        <div className="lingo-container flex flex-col justify-center items-center pt-[100px]">
            <TitleText text={faq.title} marginX="mx-auto" marginBottom="mb-[35px]"/>

            <div className="max-w-[648px] flex flex-col gap-[25px] w-full">
                {faqItems.map((item, index) => (
                    <Question
                        key={index}
                        title={item.question}
                        answer={item.answer}
                        defaultOpen={index === 0}
                    />
                ))}
            </div>
        </div>
  );
}