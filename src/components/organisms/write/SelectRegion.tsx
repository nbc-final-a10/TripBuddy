import { useState, useRef } from 'react';
import locationData from '@/data/location';
import Left2xlBoldText from '@/components/atoms/MyPage/Left2xlText';
import LeftSmGrayText from '@/components/atoms/MyPage/LeftSmGrayText';
import useTapScroll from '@/hooks/useTapScroll';

type Location = {
    name: string;
    subLocations?: Location[];
};

type ChipProps = {
    label: string;
    isSelected: boolean;
    onClick: () => void;
};

function Chip({ label, isSelected, onClick }: ChipProps) {
    return (
        <button
            className={`px-4 py-2 rounded-full ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={onClick}
            style={{ minWidth: '100px' }}
            type="button"
        >
            {label}
        </button>
    );
}

export default function SelectRegion() {
    const [isDomestic, setIsDomestic] = useState(true);
    const [selectedChip, setSelectedChip] = useState<string | null>(null);
    const [selectedSubLocations, setSelectedSubLocations] = useState<
        Location[]
    >([]);

    // 가로 스크롤 커스텀 훅 호출, 탭 스크롤 생성, 마우스 다운 이벤트 핸들러
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { createMouseDownHandler } = useTapScroll();
    const handleMouseDown = createMouseDownHandler(scrollContainerRef);

    // 위치 데이터 필터링
    const topLocations = isDomestic
        ? locationData[0].subLocations
        : locationData[1].subLocations;

    // 국내/해외 선택 처리
    const handleLocationTypeClick = (isDomestic: boolean) => {
        setIsDomestic(isDomestic);
        setSelectedChip(null);
        setSelectedSubLocations([]);
    };

    // 칩 클릭 처리 (시도, 대륙 선택 시 도시, 국가명 렌더링)
    const handleChipClick = (name: string) => {
        setSelectedChip(name);
        const selectedLocation = topLocations?.find(
            location => location.name === name,
        );
        setSelectedSubLocations(selectedLocation?.subLocations?.slice() || []);
    };

    return (
        <>
            <header className="mt-2 mb-5">
                <Left2xlBoldText text="여행지를 선택해주세요" />
                <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            </header>
            <main className="p-4">
                <section className="mb-2">
                    <div className="flex justify-center items-center w-full">
                        <label
                            htmlFor="toggle"
                            className="flex cursor-pointer items-center bg-gray-200 rounded-full p-1 w-full"
                        >
                            <div
                                onClick={() => handleLocationTypeClick(true)}
                                className={`rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${isDomestic ? 'bg-white text-black' : 'bg-gray-200 text-black'}`}
                            >
                                국내
                            </div>
                            <div
                                onClick={() => handleLocationTypeClick(false)}
                                className={`rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${!isDomestic ? 'bg-white text-black' : 'bg-gray-200 text-black'}`}
                            >
                                해외
                            </div>
                        </label>
                    </div>
                </section>

                <section className="py-3">
                    <div
                        className="flex flex-nowrap gap-2 py-3 whitespace-nowrap mb-5 overflow-x-auto custom-scroll"
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                    >
                        {topLocations?.map(subLocation => (
                            <div key={subLocation.name} className="flex-none">
                                <Chip
                                    label={subLocation.name}
                                    isSelected={
                                        selectedChip === subLocation.name
                                    }
                                    onClick={() =>
                                        handleChipClick(subLocation.name)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="my-3">
                        {selectedSubLocations.map(loc => (
                            <div
                                key={loc.name}
                                className="flex items-center border-b border-gray-300 pb-3 mt-3"
                            >
                                <div className="w-9 h-9 bg-gray-300 mr-2 rounded-full"></div>
                                <div>
                                    <h3 className="text-sm">{loc.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {selectedChip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <button className="flex mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden">
                    검색 결과 보기
                </button>
            </main>
        </>
    );
}
