'use client';

import LocationSearchButton from '@/components/atoms/LocationSearchButton';
import DateSearchButton from '@/components/atoms/search/DateSearchButton';
import {
    additionalAttributes,
    buddiesPreferences,
    Chip,
    travelThemes,
} from '@/components/molecules/H_chips';
import SearchPageChipsTitle from '@/components/molecules/search/SearchMainPageChipsTitle';
import useStore from '@/zustand/store';
import React, { useState } from 'react';

const SearchMainPage: React.FC = () => {
    const { setCurrentPage } = useStore();

    // 각 chip의 선택 상태를 저장
    const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>(
        {},
    );

    // chips 선택 요소들 감추기
    const [isChipsHidden, setIsChipsHidden] = useState(false);

    // 칩 클릭 핸들러(클릭 시 상태 토글)
    const handleChipClick = (label: string) => {
        setSelectedChips(prevSelectedChips => ({
            ...prevSelectedChips,
            [label]: !prevSelectedChips[label],
        }));
    };

    const toggleChipsHidden = () => {
        setIsChipsHidden(!isChipsHidden);
    };

    return (
        <main className="p-5 xl:p-0 xl:py-5">
            <section className="flex flex-col gap-3 mx-auto my-2 mb-10 xl:flex-row xl: items-center xl:justify-center xl: mt-10">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                />
                <LocationSearchButton
                    onClick={() => setCurrentPage('location')}
                />

                <DateSearchButton onClick={() => setCurrentPage('date')} />

                <div className="hidden xl:flex xl:gap-2 xl:w-full xl:ml-5">
                    <button
                        className="flex-1 px-4 rounded-[10px] border border-gray-500 text-gray-500 font-semibold text-sm min-w-[130px] py-2.5"
                        onClick={toggleChipsHidden}
                    >
                        접기
                    </button>
                    <button
                        className="flex-1 px-4 py-2 rounded-[10px] bg-gray-500 font-semibold text-white text-sm xl:w-24 min-w-[130px]"
                        onClick={() => setCurrentPage('result')}
                    >
                        검색 결과 보기
                    </button>
                </div>
            </section>

            <div className={isChipsHidden ? 'hidden' : ''}>
                <section className="border-b border-gray-300 mt-3 mb-5">
                    <SearchPageChipsTitle
                        title="여행 테마"
                        limit="최대 3개 선택 가능"
                    />

                    <div className="flex flex-wrap gap-1.5 py-3 xl:mb-3">
                        {travelThemes.map(theme => (
                            <Chip
                                key={theme}
                                label={theme}
                                isSelected={!!selectedChips[theme]}
                                onClick={() => handleChipClick(theme)}
                            ></Chip>
                        ))}
                    </div>
                </section>

                <section className="border-b border-gray-300 mt-3 mb-5">
                    <SearchPageChipsTitle
                        title="버디즈 성향"
                        limit="최대 3개 선택 가능"
                    />

                    <div className="flex flex-wrap gap-1.5 py-3 xl:mb-3">
                        {buddiesPreferences.map(preference => (
                            <Chip
                                key={preference}
                                label={preference}
                                isSelected={!!selectedChips[preference]}
                                onClick={() => handleChipClick(preference)}
                            ></Chip>
                        ))}
                    </div>
                </section>
                <section className="mb-7 xl:border-b xl:border-gray-300 xl:mt-3 xl:mb-5">
                    <SearchPageChipsTitle
                        title="추가 속성"
                        limit="최대 2개 선택 가능"
                    />

                    <div className="flex flex-wrap gap-1.5 py-3 xl:mb-3">
                        {additionalAttributes.map(attribute => (
                            <Chip
                                key={attribute}
                                label={attribute}
                                isSelected={!!selectedChips[attribute]}
                                onClick={() => handleChipClick(attribute)}
                            ></Chip>
                        ))}
                    </div>
                </section>
            </div>
            <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden"
                onClick={() => setCurrentPage('result')}
            >
                선택하기
            </button>
        </main>
    );
};

export default SearchMainPage;
