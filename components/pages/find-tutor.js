/*
 * @Author: danteclericuzio
 * @Date: 2025-03-16 18:38:38
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-28 22:00:50
 */

import HeroTutor from "@/components/organisms/hero-find-tutor";
import ExploreTutor from '@/components/organisms/explore-tutor';
import Faq from "@/components/organisms/faq";
import Review from "@/components/organisms/review";
import HeroBottom from '@/components/organisms/hero-bottom';
import {Suspense} from "react";

export default function FindTutor() {
    return (
        <>
            <HeroTutor/>
            <section id="search">
                <Suspense feedback={null}>
                    <ExploreTutor/>
                </Suspense>
            </section>
            <section id="faqStudent">
                <Faq purpose="STUDENT"/>
            </section>
            <section id="hearWhatTheySaid">
                <Review authorType="STUDENT"/>
            </section>
            <HeroBottom/>
        </>
    )
}