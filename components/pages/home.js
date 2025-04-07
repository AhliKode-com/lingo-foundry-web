/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 21:27:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-04-07 22:35:56
 */

import Browse from '@/components/organisms/browse';
import {Carousel} from '@/components/atoms/carousel';
import HeroHome from '@/components/organisms/hero-home';
import Looking from '@/components/organisms/looking';
import ExploreTutor from '@/components/organisms/explore-tutor';
import Why from '@/components/organisms/why-us';
import How from '@/components/organisms/how';
import Review from '@/components/organisms/review';
import HeroBottom from '@/components/organisms/hero-bottom';

export default function Home() {
    return (
        <>
            <HeroHome/>
            <Carousel/>
            <Looking/>
            <Browse/>
            <ExploreTutor/>
            <Why/>
            <How/>
            <Review authorType="STUDENT"/>
            <HeroBottom/>
        </>
    )
}