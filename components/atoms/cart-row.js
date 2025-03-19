/*
 * @Author: danteclericuzio
 * @Date: 2025-03-19 11:15:09
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-19 11:23:50
 */

import Image from "next/image";

export function CartRow({ item, onDelete }) {
  const cellClass =
    "text-[16px] border border-[#DCDFE6] rounded-[4px] w-[160px] p-[10px]";

  return (
    <div className="relative grid grid-cols-7 border-b-[2px] last:border-b-0 border-[#D2D2D250]">
      <div className="py-[20px] col-span-2 flex items-center gap-[12px]">
        <Image
          src={item.image}
          alt="confirm-payment"
          height={120}
          width={120}
          className="rounded-full w-[80px] h-[80px]"
        />
        <div className="flex flex-col">
          <span className="text-[16px]">{item.titleLine1}</span>
          <span className="text-[16px]">{item.titleLine2}</span>
        </div>
      </div>
      <div className="py-[20px] flex items-center">
        <span className={cellClass}>{item.subject}</span>
      </div>
      <div className="py-[20px] flex items-center">
        <span className={cellClass}>{item.category}</span>
      </div>
      <div className="py-[20px] flex items-center">
        <span className={cellClass}>{item.duration}</span>
      </div>
      <div className="py-[20px] flex items-center">
        <span className={cellClass}>{item.sessions}</span>
      </div>
      <div className="flex items-center">
        <span className="text-[#484848] font-bold">{item.subtotal}</span>
      </div>
      <Image
        src="/assets/delete.svg"
        alt="delete"
        height={15}
        width={15}
        className="right-[0px] top-[53px] absolute cursor-pointer"
        onClick={onDelete}
      />
    </div>
  );
}
