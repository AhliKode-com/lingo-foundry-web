import React from 'react';
import { TitleText } from '@/components/atoms/title';

export default function PrivacyPolicy() {
  return (
    <div className="lingo-container flex flex-col pt-[150px] md:pt-[200px] mb-[100px]">
        <TitleText text="Privacy Policy" marginBottom='mb-[40px]' marginX='mx-auto'/>
        <div className="prose">
            <span className='lg:text-[16px] xl:text-[20px] font-light animation-effect'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </span>
      </div>
    </div>
  );
};
