'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import useSelectRegion from '@/hooks/useSelectRegion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LocationSearchPage() {
    const { SelectRegion, thirdLevelLocation } = useSelectRegion();
    const router = useRouter();

    const handleSelectClick = () => {
        if (thirdLevelLocation) {
            const query = new URLSearchParams(window.location.search);
            query.set('location', thirdLevelLocation);

            // 문자열로 변환 후 url에 포함시킴
            const newURL = `/search?${query.toString()}`;
            router.push(newURL);

            console.log(thirdLevelLocation);
        }
    };

    return (
        <div className="p-5">
            <SearchPageTitle
                title="어디로 떠나시나요?"
                description="지역, 국가, 도시를 1개 선택해주세요."
            />
            <SelectRegion />
            <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-2xl bg-main-color font-semibold text-white text-xl m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-1/2 xl:mt-8"
                onClick={handleSelectClick}
            >
                선택하기
            </button>
        </div>
    );
}
