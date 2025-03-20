/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:50:17
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-20 11:58:34
 */

import { TitleDashboard, TitlePayment } from "@/components/atoms/title";
import { multiStepPayment } from "@/constants/en";
import { CartRow } from "@/components/atoms/cart-row";

export default function ConfirmPayment({ onCompletePayment }) {
    const { confirmPayment } = multiStepPayment;

    const cartItems = [
        {
          image: "/assets/tutor-profiles/tutor-2.png",
          titleLine1: "JAMES🇺🇸 IELTS/TOEIC",
          titleLine2: "TEST 💯 Engineering 👨",
          subject: "English",
          category: "Children (6-11)",
          duration: "5 X 50 min",
          sessions: "5 Classes",
          subtotal: "Rp1.500.000",
        },
        {
          image: "/assets/tutor-profiles/tutor-3.png",
          titleLine1: "MILA 🇬🇧 IELTS Master",
          titleLine2: "TEST 💯 Business Eng",
          subject: "English",
          category: "Business English",
          duration: "10 X 50 min",
          sessions: "10 Classes",
          subtotal: "Rp3.000.000",
        }
      ];

    return (
        <div className="flex flex-col">
            <div className="mb-[20px] md:mb-[40px]">
                <TitleDashboard text={confirmPayment.title}/>
            </div>
            <div className="pb-[10px] hidden md:grid grid-cols-6 lg:grid-cols-7 border-b-[1px] border-[#D2D2D250]">
                <TitlePayment text={confirmPayment.product} custom={'col-span-1 lg:col-span-2'}/>
                <TitlePayment text={confirmPayment.subject} custom={'col-span-1'}/>
                <TitlePayment text={confirmPayment.category} custom={'col-span-1'}/>
                <TitlePayment text={confirmPayment.duration} custom={'col-span-1'}/>
                <TitlePayment text={confirmPayment.sessions} custom={'col-span-1'}/>
                <TitlePayment text={confirmPayment.subTotal} custom={'col-span-1'}/>
            </div>
            <div className="relative">
                {cartItems.map((item, index) => (
                    <CartRow
                        key={index}
                        item={item}
                        onDelete={() => console.log("Delete item:", index)}
                    />
                ))}
            </div>
            
            <div className="w-full flex flex-col items-end py-[100px]">
                <div className="flex flex-col w-full md:w-[490px]">
                    <TitleDashboard text={confirmPayment.summary} custom="mb-[25px] mx-auto"/>
                    <span className="font-medium text-[18px] mb-[15px]">Order Summary</span>
                    <div className="border-b-[1px] border-[#D2D2D250]">
                        <div className="flex justify-between items-center mb-[15px]">
                            <span className="text-[14px] text-[#6E7485]">Subtotal</span>
                            <span>Rp.6.900.000</span>
                        </div>
                        <div className="flex justify-between items-center mb-[15px]">
                            <span className="text-[14px] text-[#6E7485]">Coupon Discount</span>
                            <span>0%</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-[18px]">Total:</span>
                        <span className="font-semibold text-[24px]">Rp.6.900.000</span>
                    </div>
                    <button 
                        onClick={onCompletePayment}
                        className='bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] mx-[30px] mt-[35px] text-white cursor-pointer animation-effect'
                    >
                        Complete Payment
                    </button>
                </div>
            </div>
        </div>
    )
}