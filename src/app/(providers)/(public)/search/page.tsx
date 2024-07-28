'use client';

import AgeCount from '@/components/molecules/search/AgeCount';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchPageChipsTitle from '@/components/molecules/search/SearchMainPageChipsTitle';
import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import DateSearchPage from '@/components/organisms/search/DateSearchPage';
import { Accordion, useAccordion } from '@/hooks/useAccordion';
import usePreferTheme from '@/hooks/usePreferTheme';
import useSelectBuddyCounts from '@/hooks/useSelectBuddyCounts';
import useSelectRegion from '@/hooks/useSelectRegion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchPage: React.FC = () => {
    // 선택 요소들 감추기
    const [optionHidden, setOptionHidden] = useState(false);

    const [showResult, setShowResult] = useState(false);

    const [PreferBuddyTheme, selectedBuddyTheme] = usePreferTheme({
        mode: 'buddy',
        isLabel: true,
    });

    const [PreferTripTheme, selectedTripTheme] = usePreferTheme({
        mode: 'trip',
        isLabel: true,
    });

    const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();
    const { SelectRegion, finalSelectedLocation } = useSelectRegion();

    const router = useRouter();

    const participatingAccordion = useAccordion(false);
    const createdAccordion = useAccordion(true);

    // const handleMoveSearchResult = () => {
    //     router.push('/searchResult');
    // };

    const toggleOptionHidden = () => {
        setOptionHidden(!optionHidden);
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
                        className="flex-1 px-4 py-2 rounded-[10px] border border-gray-500 text-gray-500 font-semibold text-sm min-w-[130px] py-2.5"
                        onClick={toggleOptionHidden}
                    >
                        접기
                    </button>
                    <button
                        className="flex-1 px-4 py-2 rounded-[10px] bg-gray-500 font-semibold text-white text-sm xl:w-24 min-w-[130px]"
                        onClick={handleShowResult}
                    >
                        검색 결과 보기
                    </button>
                </div>
            </section>

            <Accordion
                title="성별"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <GenderChipGroup />
            </Accordion>

            <Accordion
                title="나이"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <AgeCount />
            </Accordion>

            <Accordion
                title="인원수"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">
                    인원수 최대 4명까지 가능해요
                </p>
                <SelectBuddyCounts />
            </Accordion>

            <Accordion
                title="만남 장소"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <MeetingPlaceChipGroup />
            </Accordion>

            <Accordion
                title="여행지를 선택해주세요"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">
                    지역, 국가, 도시를 1개 선택해주세요.
                </p>
                <SelectRegion />
            </Accordion>

            <Accordion
                title="언제 떠나시나요?"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">
                    버디즈와 함께 여행하고 싶은 날짜를 선택해주세요.
                </p>
                <DateSearchPage />
            </Accordion>

            <Accordion
                title="여정 테마"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">3가지를 선택해주세요</p>
                <div className="py-4">
                    <PreferTripTheme />
                </div>
            </Accordion>

            <Accordion
                title="버디즈 성향"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
            >
                <p className="text-sm text-gray-500">3가지를 선택해주세요</p>
                <div className="py-4">
                    <div className="py-3">
                        <PreferBuddyTheme />
                    </div>
                </div>
            </Accordion>

            {/* <div className={isChipsHidden ? 'hidden' : ''}> */}

            <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden"
                onClick={handleShowResult}
            >
                검색 결과 보기
            </button>

            {showResult && (
                <>
                    <section className="my-5">
                        <h3 className="text-base font-semibold py-4 my-3">
                            여정 검색 결과
                        </h3>

                        <div className="flex flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-hidden gap-4 xl:grid xl:grid-cols-4 xl:auto-cols-[minmax(0,1fr)]">
                            {items
                                .slice(0, visibleFirstItems)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-300 w-[178px] h-[176px] rounded-lg flex-shrink-0 xl:w-[250px] xl:h-[250px]"
                                    ></div>
                                ))}
                        </div>
                        {visibleFirstItems < items.length && (
                            <button
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg mx-auto block"
                                onClick={loadMoreFirstItems}
                            >
                                더보기
                            </button>
                        )}
                    </section>

                    <section className="mt-10 xl:mt-24">
                        <SearchPageTitle
                            title="이런 여정은 어떠세요?"
                            description="모집 마감이 얼마 남지 않은 여정들이에요!"
                        />

                        <ul className="grid grid-cols-1 gap-1 xl:grid-cols-3 xl:gap-2 xl:w-full">
                            {items
                                .slice(0, visibleSecondItems)
                                .map((item, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-300 w-[335px] h-[93px] rounded-[11px] mx-auto mb-6 xl:mx-0 xl:w-full xl:h-[120px]"
                                    ></li>
                                ))}
                        </ul>
                        {visibleSecondItems < items.length && (
                            <button
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg mx-auto block"
                                onClick={loadMoreSecondItems}
                            >
                                더보기
                            </button>
                        )}
                    </section>
                </>
            )}
        </main>
    );
};

export default SearchPage;
