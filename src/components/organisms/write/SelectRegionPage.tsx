'use client';

import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import useSelectRegion from '@/hooks/useSelectRegion';
import React from 'react';

export default function SelectRegionPage() {
    const { SelectRegion, finalSelectedLocation } = useSelectRegion();

    return (
        <div>
            <header className="mt-10 mb-5">
                <Left2xlBoldText text="여행지를 선택해주세요" />
                <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            </header>

            <section>
                <SelectRegion />
            </section>
        </div>
    );
}
