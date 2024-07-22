'use client';

import {
    additionalAttributes,
    buddiesPreferences,
    Chip,
    travelThemes,
} from '@/components/molecules/chips';
import { useState } from 'react';

const SearchPage = () => {
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
        <main>
            <section className="flex flex-col gap-4 p-4 mx-auto my-2 mb-5">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="bg-gray-100 p-2 rounded-xl"
                />
                <input
                    type="button"
                    placeholder="지역, 국가를 찾아보세요"
                    className="bg-gray-100 p-2 rounded-xl"
                />
                <input type="date" className="bg-gray-100 p-2 rounded-xl" />
            </section>

            <section>
                <header className="flex flex-row justify-between mx-4">
                    <h2 className="text-base font-semibold">여행 테마</h2>
                    <p className="text-sm text-gray-500">최대 3개 선택 가능</p>
                </header>
                <div className="flex flex-wrap gap-2 p-3">
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
            <div className="mx-4 border-b border-gray-300 mt-1 mb-5"></div>
            <section>
                <header className="flex flex-row justify-between mx-4">
                    <h2 className="text-base font-semibold">버디즈 성향</h2>
                    <p className="text-sm text-gray-500">최대 3개 선택 가능</p>
                </header>
                <div className="flex flex-wrap gap-2 p-3">
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
            <div className="mx-4 border-b border-gray-300 mt-1 mb-5"></div>
            <section className="mb-3">
                <header className="flex flex-row justify-between mx-4">
                    <h2 className="text-base font-semibold">추가 속성</h2>
                    <p className="text-sm text-gray-500">최대 2개 선택 가능</p>
                </header>
                <div className="flex flex-wrap gap-2 p-3">
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
            <button className="flex mx-auto px-28 py-2 rounded-xl bg-gray-500 text-white mb-5 transition-colors duration-200 ease-in-out active:bg-gray-300">
                검색하기
            </button>
        </main>
    );
};

export default SearchPage;
