/*
 * @Author: danteclericuzio
 * @Date: 2025-03-11 13:48:00
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-21 23:15:01
 */
"use client"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, {useState, useEffect} from 'react'
import { GoBell, GoHeart } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
import { OrangeButton } from '@/components/atoms/buttons'
import { NavbarData } from '@/constants/en'
import {NavText, OrangeText} from '@/components/atoms/title';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import {useStudentCart} from "@/apis/studentCart";
import {useStudentWishList} from "@/apis/studentWishList";
import {useLingoContext} from "@/context/LingoContext";

export default function Navbar() {

    const { links, auth } = NavbarData;
    
    const pathname = usePathname();
    const [open, setOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [wishlistCount, setWishlistCount] = useState(0)
    const [cartCount, setCartCount] = useState(0)
    const { user, loading, logoutContext } = useAuth()
    const [showSubmenu, setShowSubmenu] = useState(true);
    console.log("navbar user: ", user)

    // wishlist
    const { getWishList } = useStudentWishList();

    useEffect(() => {
        getWishList()
    }, [])

    const { wishlists } = useLingoContext();

    useEffect(() => {
        if (Array.isArray(wishlists)) {
            setWishlistCount(wishlists.length)
        }
    }, [wishlists]);

    // cart
    const { getCart } = useStudentCart();

    useEffect(() => {
        getCart();
    }, []);

    const { carts } = useLingoContext();

    useEffect(() => {
        if (Array.isArray(carts?.cartItems)) {
            setCartCount(carts?.cartItems.length)
        }
    }, [carts]);

    // style mobile
    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
        }
      
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [open]);

    return (
        <nav className="fixed z-50 bg-[#FFFFFF] w-full border-b-2 border-[#FF723A10] font-semibold">
            <div className="lingo-container flex justify-between items-center py-[5px] relative">
                <div className='flex items-center gap-11'>
                    <Link className='cursor-pointer z-30' href='/' onClick={() => setOpen(false)}>
                        <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="max-w-none w-[90px] md:w-[120px] h-auto animation-effect"
                            priority
                        />
                    </Link>
                    <div className="hidden lg:flex">
                        <ul className="flex gap-11 text-[16px]">
                            {links.map((link, index) => {
                                const activeClass = pathname === link.href ? 'text-[#E15C31]' : '';
                                return (
                                    <li key={index} className={`${activeClass}`}>
                                        <Link href={link.href}>{link.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <Image
                    src="/assets/dot-nav.svg"
                    alt="Dot"
                    width={120}
                    height={120}
                    className="
                        block
                        absolute
                        left-[150px]
                        sm:left-[275px]
                        top-[9px]
                        animation-effect
                    "
                    priority
                />
                <div className='hidden lg:flex items-center animation-effect'>
                    {!user?.tutor ? (
                        <Link href={pathname === "/tutor" ? "/tutor-register" : "/tutor"}>
                            <OrangeButton text="Apply as Tutor" />
                        </Link>
                        ) : !user.tutor.approved ? (
                            <OrangeButton text="Waiting for Approval" custom="motion-safe:animate-pulse cursor-not-allowed"/>
                        ) : (
                        <Link href={
                            pathname === "/" ? "/student-dashboard" : 
                            pathname.includes("/tutor-dashboard") ? "/student-dashboard" : 
                            pathname.includes("/student-dashboard") ? "/tutor-dashboard" : "/student-dashboard"
                        }>
                            <NavText text={
                                pathname === "/" ? "Switch to student dashboard" : 
                                pathname.includes("/tutor-dashboard") ? "Switch to student dashboard" : 
                                pathname.includes("/student-dashboard") ? "Switch to tutor dashboard" : "Switch to student dashboard"
                            }/>
                        </Link>
                    )}
                    {loading ?
                        <div className="flex gap-[24px] ml-[26px] items-center">
                            <div className="w-[24px] h-[24px] bg-gray-300 rounded animate-pulse" />
                            <div className="w-[24px] h-[24px] bg-gray-300 rounded animate-pulse" />
                            <div className="w-[24px] h-[24px] bg-gray-300 rounded animate-pulse" />
                            <div className="relative">
                                <div className="w-[40px] h-[40px] bg-gray-300 rounded-full animate-pulse" />
                            </div>
                        </div>
                    :
                        <>
                            {user != null ? (
                                <div className="flex gap-[24px] ml-[26px] items-center relative">
                                    <GoBell className="text-[24px]" />
                                    <Link href='/wishlist'>
                                        <div
                                            className='relative'
                                        >
                                            <GoHeart className="text-[24px]" />
                                            {wishlistCount > 0 ? (
                                                <div className="absolute top-[-10px] right-[-10px] bg-[#E15C31] text-white text-[12px] rounded-full w-[20px] h-[20px] flex items-center justify-center">
                                                    {wishlistCount}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </Link>
                                    <Link href='/shopping-cart'>
                                        <div className='relative'>
                                            <BsCart2 className="text-[24px]" />
                                            {cartCount > 0 ? (
                                                <div className="absolute top-[-10px] right-[-10px] bg-[#E15C31] text-white text-[12px] rounded-full w-[20px] h-[20px] flex items-center justify-center">
                                                    {cartCount}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </Link>
                                    <div
                                        className='relative animation-effect'
                                        onMouseEnter={() => setOpenProfile(true)}
                                        onMouseLeave={() => setOpenProfile(false)}
                                    >
                                        <div className='h-[100px] w-[30px] top-0 right-[5px] bg-transparent absolute cursor-pointer'></div>
                                        <img
                                            src={user.photoProfileUrl || "/placeholder.svg"}
                                            alt="Profile"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/placeholder.svg";
                                            }}
                                            className='cursor-pointer object-cover rounded-full w-[40px] h-[40px]'
                                        />
                                        {openProfile && (
                                            <div className="absolute top-[0px] mt-[50px] right-0 bg-white border border-gray-200 rounded shadow">
                                                <button className='border-b-[1px] border-gray-200 whitespace-nowrap px-4 py-2'>Hello, {!user.firstName || !user.lastName ? user?.username : `${user?.firstName} ${user?.lastName}`}</button>
                                                <>
                                                    {showSubmenu && (
                                                        <div className="pl-0">
                                                            <Link href="/student-dashboard">
                                                                <div className="whitespace-nowrap px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer">
                                                                Student Dashboard
                                                                </div>
                                                            </Link>
                                                            {user?.tutor?.approved && (
                                                                <Link href="/tutor-dashboard">
                                                                    <div className="whitespace-nowrap px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer">
                                                                    Tutor Dashboard
                                                                    </div>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                                <Link href='/student-dashboard/settings'>
                                                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer">Settings</button>
                                                </Link>
                                                <button
                                                    onClick={logoutContext}
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                auth.map((link, index) => {
                                    const marginClass = index === 0 ? "mx-[30px]" : "";
                                    return (
                                        <Link
                                            key={index}
                                            className={`cursor-pointer ${marginClass}`}
                                            href={link.href}
                                        >
                                            {link.title}
                                        </Link>
                                    );
                                })
                            )}
                        </>
                    }
                </div>

                {/* hamburger */}
                <div className='flex ml-auto lg:hidden group z-50 w-6 h-6 cursor-pointer flex-col justify-between items-center' onClick={() => { setOpen(!open) }}>
                    <span className={`h-1 w-full rounded-lg cursor-pointer animation-effect bg-[#E15C31] ${open ? "rotate-45 translate-y-2.5" : ""}`} />
                    <span className={`h-1 rounded-lg cursor-pointer animation-effect bg-[#1D419D] ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full rounded-lg cursor-pointer animation-effect bg-[#E15C31] ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
                </div>

                {/* mobile */}
                <div 
                    className={
                    `fixed top-0 right-0 z-40 w-2/3 h-full bg-white 
                    animation-effect drop-shadow-2xl
                    ${open ? 'translate-x-0' : 'translate-x-full'}`
                    }
                >
                    <div className="flex flex-col justify-center h-full p-5 sm:p-12 animation-effect">
                        <ul className="flex flex-col gap-6 text-[14px] sm:text-[16px] animation-effect">
                            {links.map((link, index) => {
                                const activeClass = pathname === link.href ? 'text-[#E15C31]' : '';
                                return (
                                    <li key={index} className={`${activeClass}`}>
                                        <Link href={link.href} onClick={() => setOpen(false)}>{link.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='flex flex-col mt-6'>
                            {!user?.tutor ? (
                                <Link href={pathname === "/tutor" ? "/tutor-register" : "/tutor"} onClick={() => setOpen(false)}>
                                    <OrangeButton text="Apply as Tutor" />
                                </Link>
                                ) : !user.tutor.approved ? (
                                    <OrangeButton text="Waiting for Approval" custom="w-fit motion-safe:animate-pulse cursor-not-allowed"/>
                                ) : (
                                    <Link 
                                        onClick={() => setOpen(false)}
                                        href={
                                            pathname === "/" ? "/student-dashboard" : 
                                            pathname.includes("/tutor-dashboard") ? "/student-dashboard" : 
                                            pathname.includes("/student-dashboard") ? "/tutor-dashboard" : "/student-dashboard"
                                        }
                                    >
                                        <NavText text={
                                            pathname === "/" ? "Switch to student dashboard" : 
                                            pathname.includes("/tutor-dashboard") ? "Switch to student dashboard" : 
                                            pathname.includes("/student-dashboard") ? "Switch to tutor dashboard" : "Switch to student dashboard"
                                        }/>
                                    </Link>
                                )}
                            <div className='flex mt-6 gap-6'>
                                {loading ?
                                    <div className="flex gap-[24px] items-center">
                                        <div className="relative">
                                            <div className="w-[40px] h-[40px] bg-gray-300 rounded-full animate-pulse" />
                                        </div>
                                        <div className="w-[24px] h-[24px] bg-gray-300 rounded animate-pulse" />
                                        <div className="w-[24px] h-[24px] bg-gray-300 rounded animate-pulse" />
                                        <div className="w-[24px] h-[24px] bg-gray-300 rounded animate-pulse" />
                                    </div>
                                    :
                                    <>
                                        {user != null ? (
                                            <div className="flex gap-[24px] items-center relative">
                                                <div
                                                    className='relative animation-effect'
                                                    onClick={() => setOpenProfile(!openProfile)}
                                                >
                                                    <div className='h-[100px] w-[30px] top-0 right-[5px] bg-transparent absolute'></div>
                                                    <img
                                                        src={user?.photoProfileUrl || "/placeholder.svg"}
                                                        alt="Profile"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "/placeholder.svg";
                                                        }}
                                                        className='cursor-pointer object-cover rounded-full w-[40px] h-[40px]'
                                                    />
                                                    {openProfile && (
                                                        <div className="absolute top-[0px] left-0 mt-[50px] bg-white border border-gray-200 rounded shadow">
                                                            <button className='border-b-[1px] border-gray-200 whitespace-nowrap px-4 py-2'>Hello, {!user.firstName || !user.lastName ? user?.username : `${user?.firstName} ${user?.lastName}`}</button>
                                                            <>
                                                                {showSubmenu && (
                                                                    <div className="">
                                                                        <Link href="/student-dashboard">
                                                                            <div className="whitespace-nowrap px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer">
                                                                                Student Dashboard
                                                                            </div>
                                                                        </Link>
                                                                        {user?.tutor?.approved && (
                                                                            <Link href="/tutor-dashboard">
                                                                                <div className="whitespace-nowrap px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer">
                                                                                Tutor Dashboard
                                                                                </div>
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </>
                                                            <Link href='/student-dashboard/settings' onClick={() => setOpen(false)}>
                                                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer">Settings</button>
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    logoutContext();
                                                                    setOpen(false);
                                                                }}
                                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 animation-effect cursor-pointer"
                                                            >
                                                                Sign Out
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <GoBell className="text-[24px]" />
                                                <Link href='/wishlist'>
                                                    <div 
                                                        className='relative'
                                                    >
                                                        <GoHeart className="text-[24px]" />
                                                        {wishlistCount > 0 ? (
                                                            <div className="absolute top-[-10px] right-[-10px] bg-[#E15C31] text-white text-[12px] rounded-full w-[20px] h-[20px] flex items-center justify-center">
                                                                {wishlistCount}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </Link>
                                                <Link href='/shopping-cart'>
                                                    <div className='relative'>
                                                        <BsCart2 className="text-[24px]" />
                                                        {cartCount > 0 ? (
                                                            <div className="absolute top-[-10px] right-[-10px] bg-[#E15C31] text-white text-[12px] rounded-full w-[20px] h-[20px] flex items-center justify-center">
                                                                {cartCount}
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : (
                                            auth.map((link, index) => {
                                                const marginClass = index === 0 ? "mr-[30px]" : "";
                                                return (
                                                    <Link
                                                        key={index}
                                                        className={`cursor-pointer ${marginClass}`}
                                                        href={link.href}
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        {link.title}
                                                    </Link>
                                                );
                                            })
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </nav>
    )
}