/*
 * @Author: danteclericuzio
 * @Date: 2025-03-19 11:15:09
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-20 13:32:15
 */

import Image from "next/image";
import { TitlePayment } from "@/components/atoms/title";
import { multiStepPayment } from "@/constants/en";

export function CartRow({ item, onDelete }) {
  const { confirmPayment } = multiStepPayment;
  const cellClass =
    "text-[12px] lg:text-[16px] border border-[#DCDFE6] rounded-[4px] w-[160px] p-[10px]";

  return (
    <div className="gap-[10px] relative grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 border-b-[2px] last:border-b-0 border-[#D2D2D250]">
      <div className="mt-[30px] py-[5px] md:py-[20px] lg:col-span-2 flex items-center gap-[30px] md:gap-[12px]">
        <TitlePayment text={confirmPayment.product} custom="w-[80px] md:hidden"/>
        <div className="flex items-center gap-[12px]">
          <Image
            src={item.image}
            alt="confirm-payment"
            height={120}
            width={120}
            className="rounded-full w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] md:hidden lg:block"
          />
          <div className="flex flex-col">
            <span className="text-[12px] lg:text-[16px]">{item.titleLine1}</span>
            <span className="text-[12px] lg:text-[16px]">{item.titleLine2}</span>
          </div>
        </div>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.subject} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.subject}</span>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.category} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.category}</span>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.duration} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.duration}</span>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.sessions} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.sessions}</span>
      </div>
      <div className="flex items-center gap-[30px] md:gap-0 mb-[30px] md:mb-0">
        <TitlePayment text={confirmPayment.subTotal} custom="w-[80px] md:hidden"/>
        <span className="text-[12px] lg:text-[16px] ext-[#484848] font-bold">{item.subtotal}</span>
      </div>
      <Image
        src="/assets/delete.svg"
        alt="delete"
        height={15}
        width={15}
        className="right-[0px] top-[53px] md:top-[53px] absolute cursor-pointer"
        onClick={onDelete}
      />
    </div>
  );
}
