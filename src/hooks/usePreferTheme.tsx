'use client';

import PreferTheme from '@/components/atoms/common/PreferTheme';
import { buddyThemes, tripThemes } from '@/data/themes';
import { AllBuddyTheme, AllTripTheme } from '@/types/Themes.types';
import handleChipClick from '@/utils/common/handleChipClick';
import { MouseEvent, ReactNode, useRef, useState } from 'react';

// (AllTripTheme | AllBuddyTheme)[];

type UsePreferThemeProps = {
    mode: 'trip' | 'buddy';
    isLabel?: boolean;
};

const usePreferTheme = ({
    mode,
    isLabel,
}: UsePreferThemeProps): [() => ReactNode, string[]] => {
    const themeRef = useRef<AllTripTheme[] | AllBuddyTheme[]>(
        mode === 'trip' ? [...tripThemes] : [...buddyThemes],
    );
    const [selectedTheme, setSelectedTheme] = useState<string[]>([]);

    const handleThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;

        const mutableThemes = themeRef.current?.map(theme => theme.ko);
        handleChipClick(target, mutableThemes, selectedTheme, setSelectedTheme);
    };

    const PreferThemeToRender = () => {
        return (
            <PreferTheme
                selectedTheme={selectedTheme}
                handleThemeChange={handleThemeChange}
                themes={themeRef.current}
                label={isLabel && mode === 'trip' ? '여행 테마' : '버디즈 성향'}
            />
        );
    };

    return [PreferThemeToRender, selectedTheme];
};

export default usePreferTheme;
