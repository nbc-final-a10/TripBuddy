'use client';

import AgeCount from '@/components/molecules/search/AgeCount';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import PeopleCount from '@/components/molecules/search/PeopleCount';
import usePreferTheme from '@/hooks/usePreferTheme';
import React, { useState } from 'react';

const SearchPage: React.FC = () => {
    // // 각 chip의 선택 상태를 저장
    // const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>(
    //     {},
    // );

    // chips 선택 요소들 감추기
    const [isChipsHidden, setIsChipsHidden] = useState(false);

    const [PreferBuddyTheme, selectedBuddyTheme] = usePreferTheme({
        mode: 'buddy',
        isLabel: true,
    });

    const [PreferTripTheme, selectedTripTheme] = usePreferTheme({
        mode: 'trip',
        isLabel: true,
    });

    // // 칩 클릭 핸들러(클릭 시 상태 토글)
    // const handleChipClick = (label: string) => {
    //     setSelectedChips(prevSelectedChips => ({
    //         ...prevSelectedChips,
    //         [label]: !prevSelectedChips[label],
    //     }));
    // };

    const toggleChipsHidden = () => {
        setIsChipsHidden(!isChipsHidden);
    };

    return (
        <main className="p-5 xl:p-0 xl:py-5">
            <section className="flex flex-col mx-auto my-5 xl:flex-row xl: items-center xl:justify-center">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                />

                <div className="hidden xl:flex xl:gap-2 xl:w-full xl:ml-5">
                    <button
                        className="flex-1 px-4 py-2 rounded-[10px] border border-gray-500 text-gray-500 font-semibold text-sm min-w-[130px] py-2.5"
                        onClick={toggleChipsHidden}
                    >
                        접기
                    </button>
                    <button
                        className="flex-1 px-4 py-2 rounded-[10px] bg-gray-500 font-semibold text-white text-sm xl:w-24 min-w-[130px]"
                        // onClick={() => setCurrentPage('result')}
                    >
                        검색 결과 보기
                    </button>
                </div>
            </section>

            <GenderChipGroup />
            <AgeCount />
            <PeopleCount />
            <MeetingPlaceChipGroup />

            <div className={isChipsHidden ? 'hidden' : ''}>
                <section>
                    {/* <SearchPageChipsTitle
                        title="여행 테마"
                        limit="최대 3개 선택 가능"
                    /> */}

                    <div className="py-3 xl:mb-3">
                        <PreferTripTheme />
                    </div>
                </section>

                <section>
                    {/* <SearchPageChipsTitle
                        title="버디즈 성향"
                        limit="최대 3개 선택 가능"
                    /> */}

                    <div className="py-3 xl:mb-3">
                        <PreferBuddyTheme />
                    </div>
                </section>
            </div>
            <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden"
                // onClick={() => setCurrentPage('result')}
            >
                검색 결과 보기
            </button>
        </main>
    );
};

export default SearchPage;
