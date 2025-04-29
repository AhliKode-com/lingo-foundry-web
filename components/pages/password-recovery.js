"use client"
import Image from "next/image"
import Link from "next/link"
import PasswordRecoveryForm from "@/components/organisms/password-recovery-form"
import { usePathname } from 'next/navigation';
import {FaFacebookF, FaInstagram, FaWhatsapp} from "react-icons/fa";

export default function PasswordRecoveryPage() {
    return (
        <main className="pt-[100px]">
            <div className={`flex md:min-h-screen flex-col md:flex-row lingo-container my-[40px] md:my-[84px] gap-2 animation-effect`}>
                {/* Left side - Login Form */}
                <div className="flex flex-1 items-start justify-center bg-[#F9F9F9] rounded-xl">
                    <PasswordRecoveryForm />
                </div>

                {/* Right side - Image and Content */}
                <div className="relative hidden md:flex flex-1 flex-col justify-between rounded-xl animation-effect">
                    <Image
                        src="/assets/login/login-side-img.png"
                        alt="Woman presenting"
                        fill
                        className={`object-cover rounded-xl`}
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                    {/* Logo */}
                    <div className="mt-auto">
                        <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-10 items-end">
                            <Image
                                src="/assets/logo.png"
                                alt="Logo"
                                width={120}
                                height={120}
                                className="max-w-none w-[90px] md:w-[120px] h-auto animation-effect"
                                priority
                            />
                        </div>
                        </div>

                        {/* Placeholder text */}
                        <p className="mb-6 text-sm text-[#F9F9F9]">
                            Language learning platform made easy & fun. Connecting Top Instructors with students.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-[32px]">
                        <Link
                            href="https://www.instagram.com/lingofoundry/"
                            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E35D33] text-white"
                        >
                            <FaInstagram className="text-[25px]"/>
                        </Link>
                        <Link
                            href="https://www.facebook.com/lingofoundry"
                            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E35D33] text-white"
                        >
                            <FaFacebookF className="text-[25px]"/>
                        </Link>
                        <Link
                            href="https://whatsapp.com/channel/0029Vb7T6qH3wtb9qe7Mol2w"
                            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E35D33] text-white"
                        >
                            <FaWhatsapp className="text-[25px]"/>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

