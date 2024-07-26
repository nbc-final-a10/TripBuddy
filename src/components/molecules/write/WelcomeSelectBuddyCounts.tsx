import SelectBuddyCounts from '@/components/atoms/write/SelectBuddyCounts';
import { useState } from 'react';

export default function WelcomeSelectBuddyCounts() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex mt-10 mb-2 text-2xl xl:text-4xl xl:mt-20 xl:mb-5">
                여정 인원을 선택해주세요
            </div>
            <div className="flex flex-col items-center text-gray-600 text-sm xl:text-lg mb-5 xl:mb-10">
                <p>최대 여정 인원은 4명까지 선택 가능해요.</p>
            </div>

            <div className="flex flex-row gap-[2px]">
                <SelectBuddyCounts />
            </div>
        </div>
    );
}
