/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 01:06:46
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-09-13 11:37:19
 */
"use client"
import { Home } from '@/constants/en';
import SearchNow from '@/components/molecules/search-now';
import Image from 'next/image';
import { OrangeButton } from '@/components/atoms/buttons';
import {useRouter} from "next/navigation";
import { useState } from 'react';

export default function Hero() {
    const { hero } = Home;
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
        if (searchValue.trim()) {
            router.push(`/find-tutor?q=${searchValue}&category=all#search`);
        }
    };

    return (
      <div className="lingo-container flex h-full pt-[70px] sm:pt-[103.61px]">
        <div className="relative w-full flex flex-col">
          <Image 
              src="/assets/dot-plane.svg" 
              alt="Hero plane" 
              width={278}
              height={278}
              className="animation-effect absolute -left-[15px] md:-left-[45px] lg:-left-[80px] xl:-left-[140px] -bottom-[100px] md:-bottom-[130px] w-[150px] lg:w-[200px] xl:w-[278px]"
          />
          <Image 
            src="/assets/hero.png" 
            alt="Hero swirl" 
            width={689}
            height={689}
            className="hidden min-[900px]:block absolute top-[30px] right-0 md:w-[400px] lg:w-[480px] xl:w-[689px] max-w-none animation-effect"
          />
          <Image 
            src="/assets/hero-decoration.png" 
            alt="Hero swirl update" 
            width={150}
            height={150}
            className="min-[900px]:hidden absolute w-[150px] right-[28px] top-[50px] animation-effect"
          />
          <h1 className="z-10 font-bold text-[22px] lg:text-[30px] xl:text-[40px] lg:leading-[60px] xl:leading-[84px] md:w-[520px] mt-[70px] animation-effect">
            {hero.title1}
            <span className="relative flex">
              <Image 
                src="./assets/circle.svg" 
                alt="Circle" 
                width={365}
                height={365}
                className="absolute w-[230px] lg:w-[350px] xl:w-[400px] top-[-10px] left-[-10px] animation-effect"
              />
              {hero.title2}
            </span>
          </h1>
          <h1 className="animation-effect font-semibold text-[14px] md:text-[16px] lg:text-[20px] leading-[20px] md:leading-[30px] md:w-[480px] mt-[20px] md:mt-[40px] mb-[27px]">{hero.subtitle}</h1>
          <SearchNow 
            placeholder={hero.placeholder} 
            buttonSearch={hero.buttonSearch} 
            onSearch={(value) => setSearchValue(value)}
          />
          <OrangeButton 
            text="Search Now" 
            marginTop="mt-[10px]" 
            custom="block md:hidden"
            onClick={handleSearch}
          />
        </div>
      </div>
    )
}