import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import React from 'react';

type SelectTripThemesPageProps = {
    PreferThemeToRender: React.FC;
    SelectMeetPlaceButton: React.FC;
};

export default function SelectTripThemesPage({
    PreferThemeToRender,
    SelectMeetPlaceButton,
}: SelectTripThemesPageProps) {
    return (
        <div>
            <div className="mb-10">
                <Left2xlBoldText text="어떤 유형의 여정을 원하세요?" />
                <LeftSmGrayText text="여정 테마를 3개 선택해주세요" />
            </div>
            <div className="mb-10 mx-2">
                <PreferThemeToRender />
            </div>
            <div className="mb-10 mx-2">
                <LeftXlBoldText text="어디에서 만날까요?" />
                <SelectMeetPlaceButton />
            </div>
        </div>
    );
}
