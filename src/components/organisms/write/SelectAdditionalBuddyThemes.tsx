import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import LeftXlBoldText from '@/components/atoms/write/LeftXlBoldText';
import LeftXsmGrayText from '@/components/atoms/write/LeftXsmGrayText';
import React from 'react';

type SelectAdditionalBuddyThemesProps = {
    PreferThemeToRender: React.FC;
    SelectWantedSexButton: React.FC;
};

export default function SelectAdditionalBuddyThemes({
    PreferThemeToRender,
    SelectWantedSexButton,
}: SelectAdditionalBuddyThemesProps) {
    return (
        <div>
            <div className="mb-10">
                <Left2xlBoldText text="원하는 버디즈의 특성을 알려주세요" />
                <LeftSmGrayText text="모두 필수 선택 항목입니다" />
            </div>
            <div className="mb-5">
                <LeftXlBoldText text="성별" />
                <SelectWantedSexButton />
            </div>
            <div className="mb-5">
                <LeftXlBoldText text="나이" />
            </div>
            <div className="mb-5">
                <LeftXlBoldText text="버디즈 성향" />
                <LeftXsmGrayText text="3개를 선택해주세요" />
            </div>
            <div className="mx-2">
                <PreferThemeToRender />
            </div>
        </div>
    );
}
