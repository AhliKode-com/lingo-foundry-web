/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 17:29:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-13 18:07:22
 */
"use client"
import {toast} from "react-toastify";
import React, {useEffect} from 'react'
import {useStudentWishList} from "@/api/studentWishList";
import { TitleText } from "../atoms/title";
import Image from 'next/image';
export default function Wishlist() {

    const { data: wishlist = [], getWishList, deleteWishList } = useStudentWishList();
    useEffect(() => {
            getWishList();
    }, [getWishList]);

    const handleDeleteWishlist = async (tutorId) => {
        await deleteWishList(tutorId);
        toast.success("Removed tutor wishlist success.")
    };

    return (
        <div className="lingo-container flex flex-col pt-[120px] md:pt-[200px]">
            <TitleText text='Wishlist'/>
            
            {wishlist.length > 0 ? (
                <>
                    <div className="w-full animation-effect grid grid-cols-1 md:grid-cols-2 gap-[25px] mt-[30px] mb-[50px]">
                        {wishlist && wishlist?.map((item, index) => (
                            <div
                                key={index}
                                className={`animation-effect relative h-fit flex flex-row items-center p-[20px] bg-[#FFFFFF] rounded-[8px] drop-shadow-lg`}
                            >
                                <img
                                    src={item.tutorProfileUrl}
                                    alt={item.tutorName}
                                    className="w-[75px] h-[75px] rounded-full object-cover mr-[14px]"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[16px] font-semibold">{item.tutorName}</span>
                                    <span className="text-[16px] font-semibold">{item.bio}</span>
                                </div>
                                <Image
                                    src="/assets/delete.svg"
                                    alt="delete"
                                    height={15}
                                    width={15}
                                    className="ml-auto cursor-pointer"
                                    onClick={() => handleDeleteWishlist(item.tutorId)}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-10 mx-auto w-full">No Wishlist Yet.</div>
            )}
        </div>
    )
}