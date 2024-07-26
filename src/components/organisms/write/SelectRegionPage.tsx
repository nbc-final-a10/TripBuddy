import { useState, useEffect } from 'react';
import locationData from '@/data/location';
import { SecondLevel, ThirdLevel } from '@/types/Location.types';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LocationToggleButton from '@/components/atoms/write/LocationToggleButton';
import LocationList from '@/components/atoms/write/LocationList';

type Location = {
    name: string;
    subLocations?: Location[];
};

export default function SelectRegionPage() {
    // Todo: useState 말고 string으로 해도 될 듯
    // selectedLocationName은 국내의 경우는 선택한 도, 해외의 경우 선택한 대륙 하나만 초기화 됨. (예) 경상남도, 오세아니아
    const [selectedLocationName, setSelectedLocationName] = useState<
        string | null
    >(null);
    // firstLevelLocation은 'korea', 'global'로 초기화 됨.
    const [firstLevelLocation, setFirstLevelLocation] =
        useState<string>('korea');
    // secondLevelLocation은 국내의 경우 도, 해외의 경우 대륙 이름들이 열로 초기화 됨.
    const [secondLevelLocation, setSecondLevelLocation] = useState<
        SecondLevel[]
    >([]);
    // selectedSecondLevelLocations는 국내는 도, 해외는 대륙을 선택한 경우 해당 대륙에 포함된 나라, 도시들이 배열로 초기화 됨.
    const [selectedSecondLevelLocations, setSelectedSecondLevelLocations] =
        useState<ThirdLevel[]>([]);
    // finalSelectedLocation은 최종 선택한 지역 이름으로 초기화 됨.
    const [finalSelectedLocation, setFinalSelectedLocation] = useState<
        string | null
    >(null);

    useEffect(() => {
        const selectedLocationData =
            locationData[firstLevelLocation === 'korea' ? 0 : 1];

        if (selectedLocationData) {
            setSecondLevelLocation([...selectedLocationData.subLocations]);
        } else {
            setSecondLevelLocation([]);
        }
    }, [firstLevelLocation]);

    console.log(`firstLevelLocation: ${firstLevelLocation}`);
    console.log(`secondLevelLocation: ${secondLevelLocation}`);
    console.log(`selectedLocationName: ${selectedLocationName}`);
    console.log(
        `selectedSecondLevelLocations: ${selectedSecondLevelLocations}`,
    );
    console.log(`finalSelectedLocation: ${finalSelectedLocation}`);

    // 국내/해외 선택 처리
    const handleLocationTypeClick = (isKoreaSelected: boolean) => {
        setFirstLevelLocation(isKoreaSelected ? 'korea' : 'global');
        setSelectedLocationName(null);
        setSelectedSecondLevelLocations([]);
    };

    // 칩 클릭 처리 (시도, 대륙 선택 시 도시, 국가명 렌더링)
    const handleChipClick = (name: string) => {
        console.log(name);
        setSelectedLocationName(name);
        // const selectedLocation = secondLevelLocation.find(
        //     location => location === name,
        // );
        const secondLevel = [
            ...locationData[firstLevelLocation === 'korea' ? 0 : 1]
                .subLocations,
        ];
        const thirdLevel =
            secondLevel.find(subLocation => subLocation.name.ko === name)
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
                                    className="flex mt-2 ml-2 mr-2 border-b pb-3"
                                    onClick={() =>
                                        setFinalSelectedLocation(loc.name)
                                    }
                                >
                                    <div>
                                        <div className="text-sm text-gray-500 xl:text-base">
                                            {firstLevelLocation === 'korea' ? (
                                                <div>
                                                    <p className="font-bold">
                                                        {loc.name}
                                                    </p>
                                                    <p>한국</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="font-bold">
                                                        {loc.name}
                                                    </p>
                                                    <p>
                                                        {selectedLocationName}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
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
