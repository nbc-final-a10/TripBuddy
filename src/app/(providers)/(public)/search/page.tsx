'use client';

import AgeCount from '@/components/molecules/search/AgeCount';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchResult from '@/components/molecules/search/SearchResult';
import DateSearchPage from '@/components/organisms/search/DateSearchPage';
import { Accordion, useAccordion } from '@/hooks/useAccordion';
import usePreferTheme from '@/hooks/usePreferTheme';
import useSelectBuddyCounts from '@/hooks/useSelectBuddyCounts';
import useSelectRegion from '@/hooks/useSelectRegion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchPage: React.FC = () => {
    const [showResult, setShowResult] = useState(false);

    const [PreferBuddyTheme, selectedBuddyTheme] = usePreferTheme({
        mode: 'buddy',
        // isLabel: true,
    });

    const [PreferTripTheme, selectedTripTheme] = usePreferTheme({
        mode: 'trip',
        // isLabel: true,
    });

    const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();
    const { SelectRegion, finalSelectedLocation } = useSelectRegion();

    const router = useRouter();

    const createdAccordion = useAccordion(true);

    // 아코디언 상태 관리
    const genderAccordion = useAccordion(true);
    const ageAccordion = useAccordion(true);
    const buddyCountsAccordion = useAccordion(true);
    const meetingPlaceAccordion = useAccordion(true);
    const regionAccordion = useAccordion(true);
    const dateAccordion = useAccordion(true);
    const tripThemeAccordion = useAccordion(true);
    const buddyThemeAccordion = useAccordion(true);

    // 아코디언 닫기
    const toggleOptionHidden = () => {
        genderAccordion.closeAccordion();
        ageAccordion.closeAccordion();
        buddyCountsAccordion.closeAccordion();
        meetingPlaceAccordion.closeAccordion();
        regionAccordion.closeAccordion();
        dateAccordion.closeAccordion();
        tripThemeAccordion.closeAccordion();
        buddyThemeAccordion.closeAccordion();
    };

    const [items, setItems] = useState(
        Array.from({ length: 10 }, (_, i) => i + 1),
    );
    const [visibleFirstItems, setVisibleFirstItems] = useState(8);
    const [visibleSecondItems, setVisibleSecondItems] = useState(6);

    const loadMoreFirstItems = () => {
        setVisibleFirstItems(prev => prev + 8);
    };

    const loadMoreSecondItems = () => {
        setVisibleSecondItems(prev => prev + 6);
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    return (
        <main className="p-5 xl:p-0 xl:py-5">
            <section className="flex flex-col mx-auto my-10 xl:flex-row xl: items-center xl:justify-center">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                />

                <div className="hidden xl:flex xl:gap-2 xl:w-full xl:ml-5">
                    <button
                        className="flex-1 px-4 py-2 rounded-[10px] border border-gray-500 text-gray-500 font-semibold text-sm min-w-[130px] py-2.5 transition-colors duration-200 ease-in-out active:bg-gray-500 active:text-white"
                        onClick={toggleOptionHidden}
                    >
                        검색 옵션 접기
                    </button>
                    <button
                        className="flex-1 px-4 py-2 rounded-[10px] bg-gray-500 font-semibold text-white text-sm xl:w-24 min-w-[130px] transition-colors duration-200 ease-in-out active:bg-gray-300"
                        onClick={handleShowResult}
                    >
                        검색 결과 보기
                    </button>
                </div>
            </section>

            <Accordion
                title="성별"
                isOpen={genderAccordion.isOpen}
                toggleAccordion={genderAccordion.toggleAccordion}
            >
                <GenderChipGroup />
            </Accordion>

            <Accordion
                title="나이"
                isOpen={ageAccordion.isOpen}
                toggleAccordion={ageAccordion.toggleAccordion}
            >
                <AgeCount />
            </Accordion>

            <Accordion
                title="인원수"
                isOpen={buddyCountsAccordion.isOpen}
                toggleAccordion={buddyCountsAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">
                    인원수 최대 4명까지 가능해요
                </p>
                <SelectBuddyCounts />
            </Accordion>

            <Accordion
                title="만남 장소"
                isOpen={meetingPlaceAccordion.isOpen}
                toggleAccordion={meetingPlaceAccordion.toggleAccordion}
            >
                <MeetingPlaceChipGroup />
            </Accordion>

            <Accordion
                title="여행지를 선택해주세요"
                isOpen={regionAccordion.isOpen}
                toggleAccordion={regionAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">
                    지역, 국가, 도시를 1개 선택해주세요.
                </p>
                <SelectRegion />
            </Accordion>

            <Accordion
                title="언제 떠나시나요?"
                isOpen={dateAccordion.isOpen}
                toggleAccordion={dateAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">
                    버디즈와 함께 여행하고 싶은 날짜를 선택해주세요.
                </p>
                <DateSearchPage />
            </Accordion>

            <Accordion
                title="여정 테마"
                isOpen={tripThemeAccordion.isOpen}
                toggleAccordion={tripThemeAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">3가지를 선택해주세요</p>
                <div className="py-4">
                    <PreferTripTheme />
                </div>
            </Accordion>

            <Accordion
                title="버디즈 성향"
                isOpen={buddyThemeAccordion.isOpen}
                toggleAccordion={buddyThemeAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">3가지를 선택해주세요</p>
                <div className="py-4">
                    <div className="py-3">
                        <PreferBuddyTheme />
                    </div>
                </div>
            </Accordion>

            <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:mt-8"
                onClick={handleShowResult}
            >
                검색 결과 보기
            </button>

            {showResult && (
                <SearchResult
                    items={items}
                    visibleFirstItems={visibleFirstItems}
                    visibleSecondItems={visibleSecondItems}
                    loadMoreFirstItems={loadMoreFirstItems}
                    loadMoreSecondItems={loadMoreSecondItems}
                />
            )}
        </main>
    );
};

export default SearchPage;
