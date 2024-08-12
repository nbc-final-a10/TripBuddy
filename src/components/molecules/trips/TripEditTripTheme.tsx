'use client';
import Button from '@/components/atoms/common/Button';
import TripEditModalWrapper from '@/components/atoms/trips/TripEditModalWrapper';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import { useModal } from '@/contexts/modal.context';
import { usePreferTheme, useSelectMeetPlace } from '@/hooks';
import React from 'react';

type TripEditTripThemeProps = {
    PreferThemeToRender: React.FC;
    SelectMeetPlaceButton: React.FC;
};

const TripEditTripTheme: React.FC<TripEditTripThemeProps> = ({
    PreferThemeToRender,
    SelectMeetPlaceButton,
}: TripEditTripThemeProps) => {
    const modal = useModal();

    return (
        <TripEditModalWrapper>
            <div className="w-[70%] h-[10%] mx-auto flex justify-start flex-col mt-2 mb-5 xl:mt-2">
                <Left2xlBoldText text="어떤 유형의 여정을 원하세요?" />
                <LeftSmGrayText text="여정 테마를 3개 선택해주세요" />
            </div>
            <div className="w-[70%] h-[84%] mx-auto">
                <div className="mb-10 mx-2">
                    <PreferThemeToRender />
                </div>
                <div className="mb-10 mx-2">
                    <LeftXlBoldText text="어디에서 만날까요?" />
                    <SelectMeetPlaceButton />
                </div>
            </div>
            <Button
                className="w-[70%] h-[6%] mx-auto my-2"
                onClick={modal.closeModal}
            >
                완료
            </Button>
        </TripEditModalWrapper>
    );
};

export default TripEditTripTheme;
