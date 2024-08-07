'use client';

import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import clsx from 'clsx';
import React from 'react';

type SelectRegionPageProps = {
    SelectRegion: React.FC;
    isMini?: boolean;
};

export default function SelectRegionPage({
    SelectRegion,
    isMini,
}: SelectRegionPageProps) {
    return (
        <div>
            <div className={clsx('mt-2 mb-5 xl:mt-10', isMini && 'mb-0.5')}>
                <Left2xlBoldText text="여행지를 선택해주세요" />
                <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            </div>

            <div className="bg-white h-full">
                <SelectRegion />
            </div>
        </div>
    );
}
