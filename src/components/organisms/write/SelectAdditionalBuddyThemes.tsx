import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import React from 'react';

type SelectAdditionalBuddyThemesProps = {
    PreferThemeToRender: React.FC;
};

export default function SelectAdditionalBuddyThemes({
    PreferThemeToRender,
}: SelectAdditionalBuddyThemesProps) {
    return (
        <div>
            <div className="mb-10">
                <Left2xlBoldText text="어떤 유형의 여정을 원하세요?" />
                <LeftSmGrayText text="최대 3개까지 선택할 수 있어요" />
            </div>
            <div className="mb-10">
                <PreferThemeToRender />
            </div>
        </div>
    );
}
