/*
 * @Author: danteclericuzio
 * @Date: 2025-03-17 23:50:17
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-05-10 17:37:49
 */
"use client"
import {TitleDashboard, TitlePayment} from "@/components/atoms/title";
import {multiStepPayment} from "@/constants/en";
import {CartRow} from "@/components/atoms/cart-row";
import {useLingoContext} from "@/context/LingoContext";
import {useStudentCart} from "@/apis/studentCart";
import {toast} from "react-toastify";
import {useStudentOrder} from "@/apis/studentOrder";
import ConfirmPaymentSkeleton from "@/components/organisms/confirm-payment-skeleton";

export default function ConfirmPayment() {
    const {confirmPayment} = multiStepPayment;
    const {carts} = useLingoContext();
    const {getCart, deleteCart, loading} = useStudentCart();
    const {payOrder} = useStudentOrder()

    const handleDeleteCart = async (orderItemId) => {
        await deleteCart(orderItemId)
        await getCart()
        toast.success("Removed course from cart success.")
    };

    const isLoading = carts === 0
    const isEmpty = carts === null || !carts?.cartItems?.length;

    const handleConfirmCart = async () => {
        if (isEmpty) {
            toast.error("Cart is empty, cannot make payment order")
            return;
        }

        const orderId = carts.orderId
        const payload = {
            orderId: orderId,
        }
        toast.loading("Making your payment...")
        const data = await payOrder(payload)
        toast.dismiss()
        if (data) {
            window.open(data.invoiceUrl, "_blank")
        }
    }

    console.log("carts: ", carts)

    return (
        <div className="flex flex-col lingo-container pt-[100px] md:pt-[150px]">
            <div className="mb-[20px] md:mb-[40px]">
                <TitleDashboard text={confirmPayment.title}/>
            </div>
            <div className="pb-[10px] hidden md:grid grid-cols-6 lg:grid-cols-6 border-b-[1px] border-[#D2D2D250]">
                <TitlePayment text={confirmPayment.product} custom={'col-span-1'}/>
                <TitlePayment text={confirmPayment.subject} custom={'col-span-1 ml-[8px]'}/>
                <TitlePayment text={confirmPayment.category} custom={'col-span-1 ml-[8px]'}/>
                <TitlePayment text={confirmPayment.sessions} custom={'col-span-1 ml-[8px]'}/>
                <TitlePayment text={confirmPayment.discount} custom={'col-span-1 ml-[8px]'}/>
                <TitlePayment text={confirmPayment.subTotal} custom={'col-span-1 ml-[8px]'}/>
            </div>
            <div className="relative">
                {isLoading ? (
                    <ConfirmPaymentSkeleton/>
                ) : isEmpty ? (
                    <div className="font-medium pt-12 text-lg">
                        Your cart is empty.
                    </div>
                ) : (
                    <>
                        {carts?.cartItems.map((item, index) => (
                            <CartRow
                                key={index}
                                item={item}
                                onDelete={handleDeleteCart}
                            />
                        ))}
                    </>
                )}
            </div>

            <div className="w-full flex flex-col items-end py-[100px]">
                <div className="flex flex-col w-full md:w-[490px]">
                    <TitleDashboard text={confirmPayment.summary} custom="mb-[25px] mx-auto"/>
                    <span className="font-medium text-[18px] mb-[15px]">Order Summary</span>
                    <div className="border-b-[1px] border-[#D2D2D250]">
                        <div className="flex justify-between items-center mb-[15px]">
                            <span className="text-[14px] text-[#6E7485]">Subtotal</span>
                            <span>Rp.{Number(carts?.subtotal || 0).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-[15px]">
                            <span className="text-[14px] text-[#6E7485]">Discount</span>
                            <span>Rp.{Number(carts?.discountAmount || 0).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-[18px]">Total:</span>
                        <span
                            className="font-semibold text-[24px]">Rp.{Number(carts?.totalPrice || 0).toLocaleString('id-ID')}</span>
                    </div>
                    <button
                        disabled={isEmpty || isLoading}
                        // onClick={handleConfirmCart}
                        // className={`bg-[#E15C31] text-[14px] sm:text-[16px] px-[28px] py-[13px] mx-[30px] mt-[35px] text-white animation-effect ${isEmpty ? "bg-gray-400" : "cursor-pointer"}`}
                        onClick={() => {}}
                        className={`bg-[#D2D2D2] text-[14px] sm:text-[16px] px-[28px] py-[13px] mx-[30px] mt-[35px] text-white animation-effect ${isEmpty ? "bg-gray-400" : "cursor-not-allowed"}`}
                    >
                        {/* Complete Payment */}
                        Currently Unavailable
                    </button>
                </div>
            </div>
        </div>
    )
}