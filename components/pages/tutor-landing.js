/*
 * @Author: danteclericuzio
 * @Date: 2025-03-30 13:30:53
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-31 10:31:54
 */

import HeroTutorLanding from "@/components/organisms/hero-tutor-landing";
import HowTutor from '@/components/organisms/how-tutor';
import BecomeTutor from '@/components/organisms/become-tutor';
import ReviewTutor from '@/components/organisms/review-tutor';
import Faq from "@/components/organisms/faq";
import HeroBottom from '@/components/organisms/hero-bottom';

export default function TutorLanding() {
    return (
        <>
            <HeroTutorLanding/>
            <HowTutor/>
            <BecomeTutor/>
            <ReviewTutor/>
            <Faq purpose="TUTOR"/>
            <HeroBottom/>
        </>
    )
}