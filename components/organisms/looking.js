/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 13:17:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 09:36:37
 */

import { OrangeText, TitleText } from '@/components/atoms/title';
import { LookingCard } from '@/components/atoms/card';
import { Home } from '@/constants/en';

export default function Looking() {
    const { looking } = Home;
    return (
        <div className="lingo-container pt-[100px] flex flex-col relative">
            <div className='bg-gradient-to-b blur-lg from-pink-50 rounded-full to-white h-[550px] w-[150px] sm:w-[250px] lg:w-[550px] absolute left-[50px] md:left-[250px] top-[200px]'></div>
            <div className='bg-gradient-to-b blur-lg from-purple-100 rounded-full to-white h-[550px] w-[150px] sm:w-[250px] lg:w-[450px] absolute left-[100px] md:left-[300px] lg:left-[450px] top-[450px]'></div>
            <OrangeText text={looking.title} position="justify-center"/>

            <div className="w-full flex justify-center flex-col">
                <TitleText text={looking.subtitle} marginBottom='mb-[55px]'/>
                <div className="flex flex-col md:flex-row gap-[36px]">
                    <LookingCard
                        image="/assets/teach.png"
                        alt="teacher"
                        title={looking.teachTitle}
                        desc={looking.teachDesc}
                        buttonType="white"
                        buttonText={looking.registerButton}
                    />
                    <LookingCard
                        image="/assets/learn.png"
                        alt="teacher"
                        title={looking.learnTitle}
                        desc={looking.learnDesc}
                        buttonType="orange"
                        buttonText={looking.registerButton}
                    />
                </div>
            </div>
            
        </div>
    )
}