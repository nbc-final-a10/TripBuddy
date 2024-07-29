import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import LeftSmGrayText from '@/components/atoms/write/LeftSmGrayText';
import usePreferTheme from '@/hooks/usePreferTheme';
import React from 'react';

export default function SelectTripThemesPage() {
    const [PreferThemeToRender, selectedTheme] = usePreferTheme({
        mode: 'trip',
        // isLabel: true,
    });
    console.log(`selectedTheme: ${selectedTheme}`);
    return (
        <div>
            <Left2xlBoldText text="어떤 유형의 여정을 원하세요?" />
            <LeftSmGrayText text="최대 3개까지 선택할 수 있어요" />
            <PreferThemeToRender />
        </div>
    );
}
