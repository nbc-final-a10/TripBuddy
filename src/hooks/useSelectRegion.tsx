'use client';

import LocationList from '@/components/atoms/write/LocationList';
import LocationToggleButton from '@/components/atoms/write/LocationToggleButton';
import SelectedResultRealtimeText from '@/components/organisms/write/SelectedResultRealtimeText';
import locationData from '@/data/location';
import { SecondLevel, ThirdLevel } from '@/types/Location.types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import useTapScroll from './useTapScroll';
import ThirdLevelSection from '@/components/molecules/onboarding/ThirdLevelSection';

type Location = {
    name: string;
    subLocations?: Location[];
};

export default function useSelectRegion() {
    // Todo: 이거 클로저 패턴임 추가 학습요
    // finalSelectedLocation은 최종 선택한 지역 이름으로 초기화 됨.
    const [thirdLevelLocation, setThirdLevelLocation] = useState<string | null>(
        null,
    );
    // Todo: useState 말고 string으로 해도 될 듯
    // selectedLocationName은 국내의 경우는 선택한 도, 해외의 경우 선택한 대륙 하나만 초기화 됨. (예) 경상남도, 오세아니아
    const [secondLevelLocation, setSecondLevelLocation] = useState<
        string | null
    >(null);
    // firstLevelLocation은 '한국', '해외'로 초기화 됨.
    const [firstLevelLocation, setFirstLevelLocation] =
        useState<string>('한국');

    // secondLevelLocation은 국내의 경우 도, 해외의 경우 대륙 이름들이 열로 초기화 됨.
    const [secondLevelLocations, setSecondLevelLocations] = useState<
        SecondLevel[]
    >([]);
    // selectedSecondLevelLocations는 국내는 도, 해외는 대륙을 선택한 경우 해당 대륙에 포함된 나라, 도시들이 배열로 초기화 됨.
    const [selectedSecondLevelLocations, setSelectedSecondLevelLocations] =
        useState<ThirdLevel[]>([]);

    const buddiesRef = useRef<HTMLDivElement>(null);
    useTapScroll({ refs: [buddiesRef] });

    useEffect(() => {
        const selectedLocationData =
            locationData[firstLevelLocation === '한국' ? 0 : 1];

        if (selectedLocationData) {
            setSecondLevelLocations([...selectedLocationData.subLocations]);
        } else {
            setSecondLevelLocations([]);
        }
    }, [firstLevelLocation]);

    const SelectRegion = () => {
        // 국내/해외 선택 처리 : 1단계
        const handleLocationTypeClick = (isKoreaSelected: boolean) => {
            setFirstLevelLocation(isKoreaSelected ? '한국' : '해외');
            setSecondLevelLocation(null);
            setSelectedSecondLevelLocations([]);
        };

        // 칩 클릭 처리 : 2단계 (시도, 대륙 선택 시 도시, 국가명 렌더링)
        const handleChipClick = (name: string) => {
            setSecondLevelLocation(name);
            const secondLevel = [
                ...locationData[firstLevelLocation === '한국' ? 0 : 1]
                    .subLocations,
            ];
            const thirdLevel =
                secondLevel.find(subLocation => subLocation.name.ko === name)
                    ?.subLocations || [];
            setSelectedSecondLevelLocations(thirdLevel as ThirdLevel[]);
        };

        return (
            <>
                {/* 국내/해외 스위치 버튼 */}
                <section className="mb-2">
                    <LocationToggleButton
                        firstLabel="국내"
                        secondLabel="해외"
                        isKoreaSelected={firstLevelLocation === '한국'}
                        onKoreaClick={() => handleLocationTypeClick(true)}
                        onGlobalClick={() => handleLocationTypeClick(false)}
                    />
                </section>

                {/* 도시/대륙 선택 */}
                <section
                    className="py-3 overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={buddiesRef}
                >
                    <LocationList
                        locations={secondLevelLocations}
                        selectedLocationName={secondLevelLocation || ''}
                        onChipClick={handleChipClick}
                    />
                </section>

                {/* 선택한 지역 렌더링 */}
                {/* Todo: vh말고 px이 안 먹힘 - 퍼센트로 해결 추후 수정요망 */}
                {secondLevelLocation && (
                    <ThirdLevelSection
                        selectedSecondLevelLocations={
                            selectedSecondLevelLocations
                        }
                        setThirdLevelLocation={setThirdLevelLocation}
                        secondLevelLocation={secondLevelLocation}
                        thirdLevelLocation={thirdLevelLocation}
                    />
                )}

                <section>
                    {thirdLevelLocation && (
                        <SelectedResultRealtimeText
                            selectedData={thirdLevelLocation}
                            firstLabel="선택한 지역은"
                            secondLabel="입니다."
                        />
                    )}
                </section>
            </>
        );
    };

    return {
        SelectRegion,
        firstLevelLocation,
        secondLevelLocation,
        thirdLevelLocation,
        setThirdLevelLocation,
    };
}
