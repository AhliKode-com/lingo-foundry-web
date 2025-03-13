/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 14:21:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 00:47:43
 */

import { TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en'

export default function Browse() {
    const { category } = Home;
    const bgColors = {
        english: "#EBEBFF",
        englishBusiness: "#E1F7E3",
        koreanGrammar: "#FFF2E5",
        conversationalEnglish: "#FFF0F0",
        franceForTourist: "#E1F7E3",
        thailand: "#F5F7FA",
        japanese: "#EBEBFF",
        italian: "#F5F7FA",
        businessAndLifestyle: "#FFF2E5",
        englishWriting: "#FFEEE8",
        englishForAdults: "#E1F7E3",
        listeningAndSpeaking: "#FFF0F0"
      };
    const box = [
        { id: 1, category: "english", src: './assets/category/1.png', alt: category.english.title, nums: category.english.nums},
        { id: 2, category: "englishBusiness", src: './assets/category/2.png', alt: category.englishBusiness.title, nums: category.englishBusiness.nums},
        { id: 3, category: "koreanGrammar", src: './assets/category/3.png', alt: category.koreanGrammar.title, nums: category.koreanGrammar.nums},
        { id: 4, category: "conversationalEnglish", src: './assets/category/4.png', alt: category.conversationalEnglish.title, nums: category.conversationalEnglish.nums},
        { id: 5, category: "franceForTourist", src: './assets/category/5.png', alt: category.franceForTourist.title, nums: category.franceForTourist.nums},
        { id: 6, category: "thailand", src: './assets/category/6.png', alt: category.thailand.title, nums: category.thailand.nums},
        { id: 7, category: "japanese", src: './assets/category/7.png', alt: category.japanese.title, nums: category.japanese.nums},
        { id: 8, category: "italian", src: './assets/category/8.png', alt: category.italian.title, nums: category.italian.nums},
        { id: 9, category: "businessAndLifestyle", src: './assets/category/9.png', alt: category.businessAndLifestyle.title, nums: category.businessAndLifestyle.nums},
        { id: 10, category: "englishWriting", src: './assets/category/10.png', alt: category.englishWriting.title, nums: category.englishWriting.nums},
        { id: 11, category: "englishForAdults", src: './assets/category/11.png', alt: category.englishForAdults.title, nums: category.englishForAdults.nums},
        { id: 12, category: "listeningAndSpeaking", src: './assets/category/12.png', alt: category.listeningAndSpeaking.title, nums: category.listeningAndSpeaking.nums},
    ]
    return (
        <div className="bg-[#FFFFFF] w-full flex justify-center pt-[100px] flex-col">
            <TitleText text={category.title} marginBottom='mb-[55px]'/>
            <div className='lingo-container px-[20px] mb-[55px] xl:px-0 z-10 animation-effect'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-[18px] md:gap-[24px] animation-effect'>
                    {box.map((item, index) => (
                        <div style={{ backgroundColor: bgColors[item.category] }} className="p-[10px] sm:p-[14px] md:p-[16px] lg:p-[20px] animation-effect" key={index}>
                            <div className='flex items-center'>
                                <img src={item.src} alt={item.alt} className='w-[45px] h-[45px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px] animation-effect'/>
                                <div className='flex flex-col ml-[20px] gap-[4px] sm:gap-[8px] animation-effect'>
                                    <span className='text-[14px] sm:text-[16px] font-medium animation-effect'>{item.alt}</span>
                                    <span className='text-[12px] sm:text-[14px] animation-effect'>{item.nums}</span>
                                </div>
                            </div>
                        </div>
                    ) )}
                </div>
            </div>
            <div className='flex flex-col md:flex-row mx-auto gap-[8px] md:gap-[36px] items-center animation-effect'>
                <span className='text-[14px] text-[#4E5566]'>{category.seeAll}</span>
                <div className='flex items-center gap-[8px]'>
                    <span className='text-[14px] text-[#E35D33]'>{category.browseAll}</span>
                    <img src='./assets/arrow-right.svg' alt='arrow-right' className='w-[18px] h-[18px] md:w-[24px] md:h-[24px] animation-effect'/>
                </div>
            </div>
        </div>
    )
}