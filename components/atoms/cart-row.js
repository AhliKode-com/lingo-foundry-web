/*
 * @Author: danteclericuzio
 * @Date: 2025-03-19 11:15:09
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-08-13 21:05:00
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
      <div className="mt-[20px] md:mt-0 py-[5px] md:py-[20px] lg:col-span-1 flex items-center gap-[30px] md:gap-[12px]">
        <TitlePayment text={confirmPayment.product} custom="w-[80px] md:hidden"/>
        <div className="flex md:flex-col items-center gap-[12px]">
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
      <div className="py-[20px] flex items-center gap-[30px] md:gap-0">
        <TitlePayment text={confirmPayment.discount} custom="w-[80px] md:hidden"/>
        <span className={cellClass}>
          {item.discount.includes(".") && item.discount.split(".")[1] && item.discount.split(".")[1][0] !== "0" 
            ? `${item.discount.split(".")[0]}.${item.discount.split(".")[1][0]}%`
            : `${item.discount.split(".")[0]}%`
          }
        </span>
      </div>
      <div className="flex items-center gap-[30px] md:gap-0 mb-[30px] md:mb-0">
        <TitlePayment text={confirmPayment.subTotal} custom="w-[80px] md:hidden"/>
        {item.discount !== "0" ? (
          <div className="flex flex-col">
            <span className="text-[12px] lg:text-[16px] text-[#9c9c9c] font-bold line-through">Rp.{Number(item.totalPrice).toLocaleString('id-ID')}</span>
            <span className="text-[12px] lg:text-[16px] text-[#484848] font-bold">Rp.{Number(item.finalPrice).toLocaleString('id-ID')}</span>
          </div>
        ): 
          <span className="text-[12px] lg:text-[16px] text-[#484848] font-bold">Rp.{Number(item.totalPrice).toLocaleString('id-ID')}</span>
        }
      </div>
      <button
          onClick={() => onDelete(item.orderItemId)}
          className={`bg-red-500 text-[14px] mb-[50px] py-[13px] text-white animation-effect md:hidden block`}
      >
        Delete from cart
      </button>
      <Image
        src="/assets/delete.svg"
        alt="delete"
        height={15}
        width={15}
        className="right-[0px] top-[30px] lg:top-[70px] absolute cursor-pointer md:block hidden"
        onClick={() => onDelete(item.orderItemId)}
      />
    </div>
  );
}
