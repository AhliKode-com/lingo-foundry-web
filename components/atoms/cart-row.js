/*
 * @Author: danteclericuzio
 * @Date: 2025-03-19 11:15:09
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-15 00:45:58
 */

import Image from "next/image";
import { TitlePayment } from "@/components/atoms/title";
import { multiStepPayment } from "@/constants/en";

export function CartRow({ item, onDelete }) {
  const { confirmPayment } = multiStepPayment;
  const cellClass =
    "text-[12px] lg:text-[16px] border border-[#DCDFE6] rounded-[4px] w-[160px] p-[10px]";

  return (
    <div className="gap-[10px] relative grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 border-b-[2px] last:border-b-0 border-[#D2D2D250]">
      <div className="py-[5px] md:py-[20px] lg:col-span-2 flex items-center gap-[30px] md:gap-[12px]">
        <TitlePayment text={confirmPayment.product} custom="w-[80px] md:hidden"/>
        <div className="flex items-center gap-[12px]">
          <img
            src={item.tutorProfileUrl || "placeholder.svg"}
            alt="tutor-profile"
            className="rounded-full w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] md:hidden lg:block object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[12px] lg:text-[16px]">{item.tutorName}</span>
          </div>
        </div>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.subject} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.subjectName}</span>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.category} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.subjectLevelName}</span>
      </div>
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.sessions} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>{item.sessionCount}{" "}Sessions</span>
      </div>
      <div className="flex items-center gap-[30px] md:gap-0 mb-[30px] md:mb-0">
        <TitlePayment text={confirmPayment.subTotal} custom="w-[80px] md:hidden"/>
        <span className="text-[12px] lg:text-[16px] ext-[#484848] font-bold">Rp.{Number(item.totalPrice).toLocaleString('id-ID')}</span>
      </div>
      <Image
        src="/assets/delete.svg"
        alt="delete"
        height={15}
        width={15}
        className="right-[0px] top-[53px] md:top-[53px] absolute cursor-pointer"
        onClick={() => onDelete(item.orderItemId)}
      />
    </div>
  );
}
