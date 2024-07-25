'use client';

import PreferTheme from '@/components/atoms/common/PreferTheme';
import { AllBuddyTheme, AllTripTheme } from '@/types/Themes.types';
import handleChipClick from '@/utils/common/handleChipClick';
import { MouseEvent, ReactNode, useState } from 'react';

type UsePreferThemeProps = {
    themes: (AllTripTheme | AllBuddyTheme)[];
    label?: string;
};

const usePreferTheme = ({
    themes,
    label,
}: UsePreferThemeProps): [() => ReactNode, string[]] => {
    const [selectedTheme, setSelectedTheme] = useState<string[]>([]);

    const handleThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;

        const mutableThemes = themes.map(theme => theme.ko);
        handleChipClick(target, mutableThemes, selectedTheme, setSelectedTheme);
    };

    const PreferThemeToRender = () => {
        return (
            <PreferTheme
                selectedTheme={selectedTheme}
                handleThemeChange={handleThemeChange}
                themes={themes}
                label={label}
            />
        );
    };

    return [PreferThemeToRender, selectedTheme];
};

export default usePreferTheme;
