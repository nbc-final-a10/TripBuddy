import { useState, useEffect } from 'react';
import locationData from '@/data/location';
import Left2xlBoldText from '@/components/atoms/MyPage/Left2xlText';
import LeftSmGrayText from '@/components/atoms/MyPage/LeftSmGrayText';
import LocationToggleButton from '@/components/atoms/MyPage/LocationToggleButton';
import LocationList from '@/components/atoms/MyPage/LocationList';

// Location 타입 정의 추가
type Location = {
    name: string;
    subLocations?: Location[];
};

export default function SelectRegionPage() {
    const [isDomestic, setIsDomestic] = useState<boolean>(true);
    const [selectedLocationName, setSelectedLocationName] = useState<
        string | null
    >(null);
    const [selectedSubLocations, setSelectedSubLocations] = useState<
        Location[]
    >([]);
    const [selectedLocationData, setSelectedLocationData] = useState<
        Location[]
    >([]);

    useEffect(() => {
        setSelectedLocationData(
            (locationData[isDomestic ? 0 : 1]?.subLocations || []).map(
                location => ({
                    name: location.name,
                    subLocations: location.subLocations
                        ? [...location.subLocations]
                        : [],
                }),
            ),
        );
    }, [isDomestic]);

    // 국내/해외 선택 처리
    const handleLocationTypeClick = (isDomesticSelected: boolean) => {
        setIsDomestic(isDomesticSelected);
        setSelectedLocationName(null);
        setSelectedSubLocations([]);
    };

    // 칩 클릭 처리 (시도, 대륙 선택 시 도시, 국가명 렌더링)
    const handleChipClick = (name: string) => {
        setSelectedLocationName(name);
        const selectedLocation = selectedLocationData.find(
            location => location.name === name,
        );
        setSelectedSubLocations(selectedLocation?.subLocations?.slice() || []);
    };

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
                    isDomesticSelected={isDomestic}
                    onDomesticClick={() => handleLocationTypeClick(true)}
                    onOverseasClick={() => handleLocationTypeClick(false)}
                />
            </section>

            {/* 도시/대륙 선택 */}
            <section className="py-3">
                <LocationList
                    locations={selectedLocationData}
                    selectedLocationName={selectedLocationName || ''}
                    onChipClick={handleChipClick}
                />
            </section>
        </>
    );
}