/*
 * @Author: danteclericuzio
 * @Date: 2025-03-14 17:29:13
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-15 16:42:18
 */

import { TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en';
import { OrangeButton } from '@/components/atoms/buttons';

export default function Review() {
    const { review } = Home

    const reviewsData = [
        {
            id: 1,
            userImage: "/assets/user-one.png",
            userAlt: "user-one",
            starCount: 5,
            reviewText: review.reviewOne,
            userName: review.userOne,
            userOccupation: review.occupationOne,
            teacherName: review.teacherOne,
        },
        {
            id: 2,
            userImage: "/assets/user-two.png",
            userAlt: "user-two",
            starCount: 3,
            reviewText: review.reviewTwo,
            userName: review.userTwo,
            userOccupation: review.occupationTwo,
            teacherName: review.teacherTwo,
        },
        {
            id: 3,
            userImage: "/assets/user-three.png",
            userAlt: "user-three",
            starCount: 4,
            reviewText: review.reviewThree,
            userName: review.userThree,
            userOccupation: review.occupationThree,
            teacherName: review.teacherThree,
        },
    ];

    return (
        <div className="lingo-container pt-[115px] flex flex-col relative">
            <div className='flex justify-between items-center mb-[90px]'>
                <TitleText text={review.title}/>
                <OrangeButton text={review.readButton}/>
            </div>
            <div className="w-full flex justify-between flex-col lg:flex-row gap-[76px] lg:gap-[38px] mb-[60px] animation-effect">
            {reviewsData.map((item) => (
                <div
                    key={item.id}
                    className="animation-effect relative h-fit lg:w-1/3 flex flex-col justify-between
                            px-[25px] pt-[75px] pb-[35px] bg-[#FFFFFF] rounded-[16px]
                            shadow-[0px_28.93px_61.56px_0px_rgba(21,21,21,0.12)]"
                >
                    <img
                        src={item.userImage}
                        alt={item.userAlt}
                        className="absolute top-[-40px] w-[75px] h-[75px]"
                    />
                    <div className="absolute right-[25px] top-[25px] flex gap-[4px]">
                        {Array.from({ length: item.starCount }).map((_, i) => (
                        <img
                            key={i}
                            src="/assets/star.svg"
                            alt="star"
                            className="h-[20px] w-[20px]"
                        />
                        ))}
                    </div>
                    <span className="animation-effect text-[16px] sm:text-[20px] mb-[30px] lg:mb-[50px]">
                        {item.reviewText}
                    </span>
                    <div className="flex justify-between gap-[1px]">
                        <div className="flex flex-col">
                        <span className="text-[14px] font-extrabold">{item.userName}</span>
                        <span className="text-[10px]">{item.userOccupation}</span>
                        </div>
                        <div className="flex w-[120px] gap-[10px]">
                        <img
                            src="/assets/thumb-up.svg"
                            alt="thumb-up"
                            className="h-[17px] w-[17px]"
                        />
                        <span className="text-[12px] text-[#E35D33]">
                            {item.teacherName}
                        </span>
                        </div>
                    </div>
                </div>
            ))}

            </div>
            
        </div>
    )
}