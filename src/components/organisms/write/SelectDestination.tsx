import React, { useEffect } from 'react';
import useSelectRegion from '@/hooks/useSelectRegion';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';

export default function SelectDestination() {
    const { SelectRegion, finalSelectedLocation } = useSelectRegion();

    useEffect(() => {
        if (finalSelectedLocation) {
            console.log(`finalSelectedLocation: ${finalSelectedLocation}`);
        }
    }, [finalSelectedLocation]);

    return (
        <div>
            <Left2xlBoldText text="여행지를 선택해주세요" />
            <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            <SelectRegion />
        </div>
    );
}
