import { useState, useEffect } from 'react';
import locationData from '@/data/location';
import Left2xlBoldText from '@/components/atoms/MyPage/Left2xlText';
import LeftSmGrayText from '@/components/atoms/MyPage/LeftSmGrayText';
import LocationToggleButton from '@/components/atoms/MyPage/LocationToggleButton';
import LocationList from '@/components/atoms/MyPage/LocationList';
import { SecondLevelNames, ThirdLevel } from '@/types/Location.types';

type Location = {
    name: string;
    subLocations?: Location[];
};

export default function SelectRegionPage() {
    // Todo: useState 말고 string으로 해도 될 듯
    const [selectedLocationName, setSelectedLocationName] = useState<
        string | null
    >(null);
    // Todo: 이름 더 시멘틱하게 변경 레벨 단위로
    const [firstLevelLocation, setFirstLevelLocation] =
        useState<string>('korea');
    const [secondLevelLocation, setSecondLevelLocation] = useState<
        SecondLevelNames[]
    >([]);
    const [selectedSecondLevelLocations, setSelectedSecondLevelLocations] =
        useState<ThirdLevel[]>([]);

    useEffect(() => {
        setSecondLevelLocation(
            (
                locationData[firstLevelLocation === 'korea' ? 0 : 1]
                    ?.subLocations || []
            ).map(location => location.name),
        );
    }, [firstLevelLocation]);

    console.log(`firstLevelLocation: ${firstLevelLocation}`);
    console.log(`secondLevelLocation: ${secondLevelLocation}`);
    console.log(`selectedLocationName: ${selectedLocationName}`);

    // 국내/해외 선택 처리
    const handleLocationTypeClick = (isKoreaSelected: boolean) => {
        setFirstLevelLocation(isKoreaSelected ? 'korea' : 'global');
        setSelectedLocationName(null);
        setSelectedSecondLevelLocations([]);
    };

    // 칩 클릭 처리 (시도, 대륙 선택 시 도시, 국가명 렌더링)
    const handleChipClick = (name: string) => {
        setSelectedLocationName(name);
        const selectedLocation = secondLevelLocation.find(
            location => location === name,
        );
        const secondLevel = [
            ...locationData[firstLevelLocation === 'korea' ? 0 : 1]
                .subLocations,
        ];
        const thirdLevel =
            secondLevel.find(subLocation => subLocation.name === name)
                ?.subLocations || [];
        setSelectedSecondLevelLocations(thirdLevel as ThirdLevel[]);
    };

    // 최종 지역 데이터
    console.log(selectedSecondLevelLocations);

    return (
        <>
            <header className="mt-10 mb-5">
                <Left2xlBoldText text="여행지를 선택해주세요" />
                <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            </header>

            {/* 국내/해외 스위치 버튼 */}
            <section className="mb-2">
                <LocationToggleButton
                    firstLabel="국내"
                    secondLabel="해외"
                    isKoreaSelected={firstLevelLocation === 'korea'}
                    onKoreaClick={() => handleLocationTypeClick(true)}
                    onGlobalClick={() => handleLocationTypeClick(false)}
                />
            </section>

            {/* 도시/대륙 선택 */}
            <section className="py-3">
                <LocationList
                    locations={secondLevelLocation}
                    selectedLocationName={selectedLocationName || ''}
                    onChipClick={handleChipClick}
                />
            </section>

            {/* 선택한 지역 렌더링 */}
            <section>
                <div className="my-3">
                    {selectedLocationName && (
                        <div>
                            {selectedSecondLevelLocations.map(loc => (
                                <div
                                    key={loc.name}
                                    className="flex items-center border-b border-gray-300 pb-3 mt-3"
                                >
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {firstLevelLocation === 'korea' ? (
                                                <>
                                                    <p>{loc.name}</p>
                                                    <p>한국</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>{loc.name}</p>
                                                    <p>
                                                        {selectedLocationName}
                                                    </p>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
