"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLogin } from "@/hooks/useLogin"
import { useRegister } from "@/hooks/useRegister"
import { usePathname } from 'next/navigation';

export default function LoginForm() {
  const pathname = usePathname();

  const { login, loading, error } = useLogin()
  const { signup, loadingRegister } = useRegister()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const title = pathname === '/signup' ? "Sign Up" : "Login"

  const handleSubmit = async (e) => {
    e.preventDefault()
    const action = pathname === '/signup' ? signup : login
    await action(email, password)
  }

  return (
    <>
      <div className="w-full space-y-4 md:space-y-8 py-[80px] md:py-[40px] px-[40px] animation-effect">
        <div className="text-left mb-[60px] md:mt-[70px] animation-effect">
          <h1 className="text-[48px] font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">Please {pathname === '/signup' ? 'register ' : "login "}to your account first</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                      src="/assets/login/email.svg"
                      alt="Email"
                      width={24}
                      height={24}
                      className=""
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="Enter your email here"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image
                      src="/assets/login/key.svg"
                      alt="Key"
                      width={24}
                      height={24}
                      className=""
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                      <Image
                          src="/assets/login/eye-close.svg"
                          alt="eye-close"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                      />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-end ${pathname === '/signup' ? 'hidden' : 'block'}`}>
            <div className="text-sm">
              <Link href="#" className="font-medium text-[#1E419D] hover:text-indigo-500">
                Forget Password
              </Link>
            </div>
          </div>

          {/* login google and facebook for phase 2 */}
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">or login with</span>
            </div>
          </div> */}

          {/* login google and facebook for phase 2 */}
          {/* <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                  fill="#34A853"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <svg className="mr-2 h-5 w-5 text-[#1877F2]" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
              Facebook
            </button>
          </div> */}


            <button
              type="submit"
              className={`flex w-full justify-center rounded-lg bg-[#E35D33] py-3 px-4 text-sm font-medium text-white shadow-sm cursor-pointer`}
            >
              {
                loading || loadingRegister ? 
                <div>
                  <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-[#FFFFFF]"></div>
                </div>
                :
                <span>{pathname === '/signup' ? 'Sign Up ' : "Log In"}</span>
              }
            </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {pathname === '/signup' ? 'Already' : "Don't"} have an account?{" "}
          <Link href="#" className="font-medium text-[#1E419D] hover:text-indigo-500">
            {pathname === '/signup' ? 'Log In ' : "SIgn Up "}here
          </Link>
        </div>
      </div>
    </>
  )
}