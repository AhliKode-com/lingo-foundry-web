// import Window from '@/components/window';
import Carousel from '@/components/organisms/carousel';


export default function Home() {
  return (
    <div className="">
          
      {/* hero */}
      <div className="lingo-container flex h-full pt-[103.61px]">
        <div className="relative w-full flex flex-col">
          <img src="./assets/dot-plane.svg" alt="Hero plane" className="absolute -left-[140px] -bottom-[130px] w-[278px]"/>
          <img src="./assets/hero.png" alt="Hero swirl" className="absolute top-[30px] right-0 w-[689px] max-w-none"/>
          <h1 className="font-bold text-[56px] leading-[84px] w-[520px] mt-[70px]">
            Learn Everyday & Any New Language Online with Top 
            <span className="relative flex">
              <img src="./assets/circle.svg" alt="Circle" className="absolute w-[365px] left-[-10px]"/>
              Instructors.
            </span>
          </h1>
          <h1 className="font-semibold text-[20px] leading-[34px] w-[480px] mt-[40px] mb-[27px]">Language learning made easy and fun—tailored just for you!</h1>
          <div className="relative items-center flex w-[614px] bg-[#FF723A10] rounded-[40px] border-[1px] border-[#C9C9C9] px-[31px] h-[65px]">
            <img src="./assets/check.svg" alt="Search" className="mr-[8px]"/>
            <span>Try English Tutor</span>
            <button className="absolute right-0 bg-[#E35D33] px-[28px] h-[65px] rounded-[40px] text-white">
                Apply as Tutor
            </button>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div className="lingo-container pt-[220px] flex flex-col">
        <span className="text-[#E35D33] font-bold text-[16px] sm:text-[18px] border-b-[1px] border-[#E35D33] mb-[23px] w-fit animation-effect">Our Language Tutors</span>
        <Carousel/>
      </div>
      
    </div>
  );
}
