'use client';

import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import React from 'react';

type SelectRegionPageProps = {
    SelectRegion: React.FC;
    pxHeight: number;
};

export default function SelectRegionPage({
    SelectRegion,
}: SelectRegionPageProps) {
    return (
        <div>
            <div className="mt-10 mb-5">
                <Left2xlBoldText text="여행지를 선택해주세요" />
                <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            </div>

            <div className="bg-white">
                <SelectRegion />
            </div>
        </div>
    );
}
