/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 00:13:22
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 13:05:29
 */

import Carousel from '@/components/organisms/carousel';
import HeroHome from '@/components/organisms/hero-home';


export default function Home() {
  return (
    <div className="">
          
      {/* hero */}
      <div className="lingo-container flex h-full pt-[70px] sm:pt-[103.61px]">
        <HeroHome/>
      </div>

      {/* carousel */}
      <div className="lingo-container pt-[220px] flex flex-col">
        <span className="text-[#E35D33] font-bold text-[16px] sm:text-[18px] border-b-[1px] border-[#E35D33] mb-[23px] w-fit animation-effect">Our Language Tutors</span>
        <Carousel/>
      </div>
      
    </div>
  );
}
