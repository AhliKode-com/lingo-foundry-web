/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 21:27:45
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 21:28:18
 */

import Browse from '@/components/organisms/browse';
import Carousel from '@/components/organisms/carousel';
import HeroHome from '@/components/organisms/hero-home';
import Looking from '@/components/organisms/looking';

export default function Home() {
    return (
        <>
            <HeroHome/>
            <Carousel/>
            <Looking/>
            <Browse/>
        </>
    )
}