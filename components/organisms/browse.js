/*
 * @Author: danteclericuzio
 * @Date: 2025-03-13 14:21:29
 * @Last Modified by: danteclericuzio
 * @Last Modified time: 2025-03-13 21:27:13
 */

import { TitleText } from '@/components/atoms/title';
import { Home } from '@/constants/en'

export default function Browse() {
    const { browse } = Home;
    return (
        <div className="w-full flex justify-center pt-[100px] flex-col">
            <TitleText text={browse.title}/>
        </div>
    )
}