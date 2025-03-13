/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 21:27:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-14 00:16:16
 */

import Browse from '@/components/organisms/browse';
import Carousel from '@/components/organisms/carousel';
import HeroHome from '@/components/organisms/hero-home';
import Looking from '@/components/organisms/looking';
import ExploreTutor from '@/components/organisms/explore-tutor';

export default function Home() {
    return (
        <>
            <HeroHome/>
            <Carousel/>
            <Looking/>
            <Browse/>
            <ExploreTutor/>
        </>
    )
}