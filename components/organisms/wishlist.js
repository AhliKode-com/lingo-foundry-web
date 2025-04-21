/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 17:29:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 14:48:49
 */
"use client"
import {toast} from "react-toastify";
import React from 'react'
import {useStudentWishList} from "@/apis/studentWishList";
import { TitleText } from "../atoms/title";
import Image from 'next/image';
import {useLingoContext} from "@/context/LingoContext";
import Link from "next/link";

export default function Wishlist() {
    const { getWishList, deleteWishList } = useStudentWishList();
    const { wishlists } = useLingoContext();

    const handleDeleteWishlist = async (tutorId) => {
        await deleteWishList(tutorId);
        await getWishList()
        toast.success("Removed tutor wishlist success.")
    };

    return (
        <div className="lingo-container flex flex-col pt-[120px] md:pt-[200px]">
            <TitleText text='Wishlist'/>
            
            {wishlists && wishlists.length > 0 ? (
                <>
                    <div className="w-full animation-effect grid grid-cols-1 md:grid-cols-2 gap-[25px] mt-[30px] mb-[50px]">
                        {wishlists && wishlists?.map((item, index) => (
                            <div
                                key={index}
                                className={`animation-effect relative h-fit flex flex-row items-center p-[20px] bg-[#FFFFFF] rounded-[8px] drop-shadow-lg`}
                            >
                                    <Link href={`/tutor/${item.tutorId}`} className="flex flex-row items-center">
                                        <img
                                            src={item.tutorProfileUrl}
                                            alt={item.tutorName}
                                            className="w-[75px] h-[75px] rounded-full object-cover mr-[14px]"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-[16px] font-semibold">{item.tutorName}</span>
                                            <span className="text-[16px] font-semibold">{item.bio}</span>
                                        </div>
                                    </Link>
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
                <div className="text-center py-10 mx-auto w-full min-h-[500px] flex items-center justify-center">No Wishlist Yet.</div>
            )}
        </div>
    )
}