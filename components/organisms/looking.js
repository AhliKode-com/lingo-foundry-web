/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 13:17:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 21:26:01
 */

import { OrangeText, TitleText } from '@/components/atoms/title';
import { OrangeButton, WhiteButton } from '../atoms/buttons';
import { Home } from '@/constants/en';

export default function Looking() {
    const { looking } = Home;
    return (
        <div className="lingo-container pt-[100px] flex flex-col relative overflow-hidden">
            <div className='bg-gradient-to-b blur-lg from-pink-50 rounded-full to-white h-[550px] w-[550px] absolute left-[50px] md:left-[250px] top-[200px]'></div>
            <div className='bg-gradient-to-b blur-lg from-purple-100 rounded-full to-white h-[550px] w-[550px] absolute left-[200px] md:left-[550px] top-[450px]'></div>
            <OrangeText text={looking.title} position="justify-center"/>

            <div className="w-full flex justify-center flex-col">
                <TitleText text={looking.subtitle}/>
                <div className="flex flex-col md:flex-row gap-[36px]">
                    <div className="items-center flex flex-col w-full md:h-[455px] py-[50px] px-[46px] drop-shadow-xl bg-[#FFFFFF] rounded-[10px] animation-effect">
                        <img src='/assets/teach.png' alt='teacher' className="w-[96px] h-[100px] mx-auto"/>
                        <span 
                        className="
                            text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[34px]
                            font-bold
                            my-[25px]
                            animation-effect
                        ">
                            {looking.teachTitle}
                        </span>
                        <span className='text-[#707070] text-center mb-[32px]'>{looking.teachDesc}</span>
                        <WhiteButton text={looking.registerButton}/>
                    </div>
                    <div className="items-center flex flex-col w-full md:h-[455px] py-[50px] px-[46px] drop-shadow-xl bg-[#FFFFFF] rounded-[10px] animation-effect">
                        <img src='/assets/learn.png' alt='teacher' className="w-[96px] h-[100px] mx-auto"/>
                        <span 
                        className="
                            text-[16px] sm:text-[24px] md:text-[16px] lg:text-[24px] xl:text-[34px]
                            font-bold
                            my-[25px]
                            animation-effect
                        ">
                            {looking.learnTitle}
                        </span>
                        <span className='text-[#707070] text-center mb-[32px] text-[14px] sm:text-[16px] animation-effect'>{looking.learnDesc}</span>
                        <OrangeButton text={looking.registerButton}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}