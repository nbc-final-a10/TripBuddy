'use client';

import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import SelectRegions from '@/components/molecules/common/SelectRegion';
import { SelectRegionPageProps } from '@/types/Location.types';
import clsx from 'clsx';
import React from 'react';

export default function SelectRegionPage({
    isMini,
    states,
    actions,
}: SelectRegionPageProps) {
    return (
        <div>
            <div className={clsx('mt-2 mb-5 xl:mt-10', isMini && 'mb-0.5')}>
                <Left2xlBoldText text="여행지를 선택해주세요" />
                <LeftSmGrayText text="지역, 국가, 도시를 1개 선택해주세요." />
            </div>

            <div className="bg-white h-full">
                <SelectRegions states={states} actions={actions} />
            </div>
        </div>
    );
}
