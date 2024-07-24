'use client';

import {
    additionalAttributes,
    buddiesPreferences,
    Chip,
    travelThemes,
} from '@/components/molecules/H_chips';
import { useState } from 'react';

const SearchMainPage = () => {
    // 각 chip의 선택 상태를 저장
    const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>(
        {},
    );

    // 칩 클릭 핸들러(클릭 시 상태 토글)
    const handleChipClick = (label: string) => {
        setSelectedChips(prevSelectedChips => ({
            ...prevSelectedChips,
            [label]: !prevSelectedChips[label],
        }));
    };

    return (
        <main className="p-4">
            <section className="flex flex-col gap-4 mx-auto my-2 mb-10 xl:flex-row xl: items-center xl:justify-center">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                />
                <input
                    type="text"
                    placeholder="지역, 국가를 찾아보세요"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                />
                <input
                    type="date"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                />
                <div className="hidden xl:flex xl:gap-2 xl:w-full">
                    <button className="flex-1 px-4 py-2 rounded-lg border border-gray-500 text-gray-700">
                        접기
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-gray-500 text-white">
                        검색 결과 보기
                    </button>
                </div>
            </section>

            <section className="border-b border-gray-300 mt-3 mb-5">
                <header className="flex flex-row justify-between">
                    <h2 className="text-base font-semibold">여행 테마</h2>
                    <p className="text-sm text-gray-500">최대 3개 선택 가능</p>
                </header>
                <div className="flex flex-wrap gap-2 py-3 xl:mb-3">
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
            <div></div>
            <section className="border-b border-gray-300 mt-3 mb-5">
                <header className="flex flex-row justify-between">
                    <h2 className="text-base font-semibold">버디즈 성향</h2>
                    <p className="text-sm text-gray-500">최대 3개 선택 가능</p>
                </header>
                <div className="flex flex-wrap gap-2 py-3 xl:mb-3">
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
                <header className="flex flex-row justify-between">
                    <h2 className="text-base font-semibold">추가 속성</h2>
                    <p className="text-sm text-gray-500">최대 2개 선택 가능</p>
                </header>
                <div className="flex flex-wrap gap-2 py-3 xl:mb-3">
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
            <button className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden">
                선택하기
            </button>
            <div></div>
        </main>
    );
};

export default SearchMainPage;
