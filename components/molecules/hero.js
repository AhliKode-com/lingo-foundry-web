/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 01:06:46
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 01:53:28
 */


export default function Hero() {
    return (
        <div className="relative w-full flex flex-col">
            <img 
                src="./assets/dot-plane.svg" 
                alt="Hero plane" 
                className="
                    animation-effect
                    absolute 
                    -left-[15px] md:-left-[45px] lg:-left-[80px] xl:-left-[140px] 
                    -bottom-[100px] md:-bottom-[130px] 
                    w-[150px] lg:w-[200px] xl:w-[278px]"
            />
          <img src="./assets/hero.png" alt="Hero swirl" className="hidden min-[900px]:block absolute top-[30px] right-0 md:w-[400px] lg:w-[480px] xl:w-[689px] max-w-none animation-effect"/>
          <img src="./assets/hero-decoration.png" alt="Hero swirl update" className="min-[900px]:hidden absolute w-[150px] right-[28px] top-[50px] animation-effect"/>
          <h1 className="
                z-10
                font-bold 
                text-[32px] lg:text-[40px] xl:text-[56px] 
                lg:leading-[60px] xl:leading-[84px]
                md:w-[520px] mt-[70px] 
                animation-effect">
            Learn Everyday & Any New Language Online with Top 
            <span className="relative flex">
              <img 
                src="./assets/circle.svg" 
                alt="Circle" 
                className="
                absolute 
                w-[205px] lg:w-[250px] xl:w-[365px] 
                top-[0px]
                left-[-10px]
                animation-effect"/>
              Instructors.
            </span>
          </h1>
          <h1 className="
            animation-effect
            font-semibold 
            text-[14px] md:text-[16px] lg:text-[20px] 
            leading-[34px] 
            md:w-[480px] 
            mt-[20px] md:mt-[40px] mb-[27px]">Language learning made easy and fun—tailored just for you!</h1>
          <div className="relative items-center flex md:w-[550px] lg:w-[614px] bg-[#FF723A10] rounded-[40px] border-[1px] border-[#C9C9C9] px-[31px] h-[50px] lg:h-[65px] animation-effect">
            <img src="./assets/check.svg" alt="Search" className="mr-[8px]"/>
            <span className="animation-effect text-[14px] md:text-[16px]">Try English Tutor</span>
            <button className="hidden md:block absolute right-0 bg-[#E35D33] px-[28px] h-[50px] lg:h-[65px] animation-effect rounded-[40px] text-white">
                Search Now
            </button>
          </div>
          <button className="mt-[10px] block md:hidden bg-[#E35D33] px-[28px] h-[50px] lg:h-[65px] animation-effect rounded-[40px] text-white">
                Search Now
            </button>
        </div>
    )
}