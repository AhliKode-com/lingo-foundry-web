/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:53:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-19 15:32:05
 */


"use client";
import { useState } from "react";

import { RiArrowRightSLine } from "react-icons/ri";

import ConfirmPayment from "@/components/templates/confirm-payment";
import BookClass from "@/components/templates/book-class";
import TakeClass from "@/components/templates/take-class";
import { StepButton } from "@/components/atoms/buttons";
import { multiStepPayment } from "@/constants/en";

export default function ProcessBooking() {

    const [currentStep, setCurrentStep] = useState(2);
    const { tab } = multiStepPayment;

    const onCompletePayment = () => {
        setCurrentStep(2);
    };

    const steps = [
        { id: 1, label: tab.confirmPayment, component: <ConfirmPayment onCompletePayment={onCompletePayment}/> },
        { id: 2, label: tab.bookClass, component: <BookClass /> },
        { id: 3, label: tab.takeClass, component: <TakeClass /> },
    ];

    return (
        <div className="pt-[100px]">
            <div className="w-full">
                <div className="w-full fixed z-50 bg-[#FFFFFF] border-b-[1px] border-[#E5E5E5]">
                    <div className="lingo-container flex items-center gap-[12px] py-[25px] ">
                        {steps.map((step, index) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;
                            return (
                                <div key={step.id} className="flex items-center gap-[12px]">
                                    <div
                                        className={`
                                        flex items-center justify-center w-[22px] h-[22px] rounded-full border-2 text-white
                                        ${
                                            isActive
                                            ? "bg-[#E35D33] text-[#E35D33]"
                                            : isCompleted
                                            ? "bg-[#E35D33]"
                                            : "bg-[#7A7A7A] text-[#7A7A7A]"
                                        }
                                        `}
                                    >
                                        {step.id}
                                    </div>
                                    <span className={`text-[16px]
                                        ${
                                            isActive 
                                            ? "text-[#E35D33]" 
                                            : isCompleted
                                            ? "text-[#E35D33]"
                                            : "text-[#7A7A7A]"}`
                                        }
                                    >
                                        {step.label}
                                    </span>
                                    <div>
                                        {index < steps.length - 1 && (
                                            <RiArrowRightSLine className={`
                                                text-[22px]
                                                ${
                                                    isActive 
                                                    ? "text-[#7A7A7A]" 
                                                    : isCompleted
                                                    ? "text-[#E35D33]"
                                                    : "text-[#7A7A7A]"}
                                                `}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="lingo-container flex flex-col pb-[50px] pt-[130px]">
                {steps.find((step) => step.id === currentStep)?.component}
                <div className="mt-4 flex gap-2">
                    {currentStep > 1 && (
                        <div className="mt-4 flex gap-2">
                            {currentStep > 1 && (
                                <StepButton
                                    text={tab.prevBtn}
                                    bgColor="bg-[#BFBBBA]"
                                    onClick={() => setCurrentStep((prev) => prev - 1)}
                                />
                            )}
                            {currentStep < steps.length && (
                                <StepButton
                                    text={tab.nextBtn}
                                    bgColor="bg-[#E35D33]"
                                    onClick={() => setCurrentStep((prev) => prev + 1)}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
  );
}
