/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 18:38:38
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-25 20:08:54
 */

import HeroTutor from "@/components/organisms/hero-find-tutor";
import ExploreTutor from '@/components/organisms/explore-tutor';
import Faq from "@/components/organisms/faq";
import Review from "@/components/organisms/review";
import HeroBottom from '@/components/organisms/hero-bottom';

export default function FindTutor() {
    return (
        <>
            <HeroTutor/>
            <section id="search">
                <ExploreTutor/>
            </section>
            <Faq purpose="STUDENT"/>
            <Review authorType="STUDENT"/>
            <HeroBottom/>
        </>
    )
}