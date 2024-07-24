'use client';

import { Chip } from '@/components/molecules/chips';
import locationData from '@/data/location';
import { useState } from 'react';

const LocationSearchPage = () => {
    const [isDomestic, setIsDomestic] = useState(true);
    const [selectedChips, setSelectedChips] = useState<string | null>(null);

    // 국내
    const handleDomesticClick = () => {
        setIsDomestic(true);
    };

    // 해외
    const handleOverseasClick = () => {
        setIsDomestic(false);
    };

    const selectedLocation = isDomestic ? locationData[0] : locationData[1];

    // 칩 클릭 핸들러
    const handleChipClick = (label: string) => {
        setSelectedChips(prev => (prev === label ? null : label));
    };

    // 선택된 칩의 하위 위치 찾기
    const selectedSubLocation = selectedLocation.subLocations?.find(
        subLocation => subLocation.name === selectedChips,
    )?.subLocations;

    return (
        <main className="p-4">
            <section className="mb-2">
                <header className="mt-2 mb-5">
                    <h2 className="text-base font-semibold">
                        어디로 떠나시나요?
                    </h2>
                    <p className="text-sm text-gray-500">
                        지역, 국가, 도시를 1개 선택해주세요.
                    </p>
                </header>

                <div className="flex justify-center items-center w-full">
                    <label
                        htmlFor="toggle"
                        className="flex cursor-pointer items-center bg-gray-200 rounded-full p-1 w-full"
                    >
                        <div
                            onClick={handleDomesticClick}
                            className={`${
                                isDomestic
                                    ? 'bg-white text-black'
                                    : 'bg-gray-200 text-black'
                            } rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold`}
                        >
                            국내
                        </div>
                        <div
                            onClick={handleOverseasClick}
                            className={`${
                                !isDomestic
                                    ? 'bg-white text-black'
                                    : 'bg-gray-200 text-black'
                            } rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold`}
                        >
                            해외
                        </div>
                    </label>
                </div>
            </section>

            <section className="py-3">
                <ul className="flex flex-nowrap gap-2 py-3 whitespace-nowrap mb-5 overflow-x-auto">
                    {selectedLocation.subLocations?.map(subLocation => (
                        <li key={subLocation.name}>
                            <Chip
                                label={subLocation.name}
                                isSelected={selectedChips === subLocation.name}
                                onClick={() =>
                                    handleChipClick(subLocation.name)
                                }
                            />
                        </li>
                    ))}
                </ul>
                <div className="my-3">
                    {selectedSubLocation &&
                        selectedSubLocation.map(loc => (
                            <div
                                key={loc.name}
                                className="flex items-center border-b border-gray-300 pb-3 mt-3"
                            >
                                <div className="w-9 h-9 bg-gray-300 mr-2 rounded-full"></div>
                                <div>
                                    <h3 className="text-sm">{loc.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {selectedChips}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
            <button className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden">
                선택하기
            </button>
        </main>
    );
};

export default LocationSearchPage;
