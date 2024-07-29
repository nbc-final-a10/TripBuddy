import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import usePreferTheme from '@/hooks/usePreferTheme';
import React from 'react';

export default function SelectAdditionalBuddyThemes() {
    const [PreferThemeToRender, selectedBuddyThemes] = usePreferTheme({
        mode: 'buddy',
        isLabel: true,
    });
    console.log(`selectedBuddyThemes: ${selectedBuddyThemes}`);
    return (
        <div>
            <Left2xlBoldText text="원하는 버디즈의 특성을 알려주세요" />
            <div>
                <PreferThemeToRender />
            </div>
        </div>
    );
}
