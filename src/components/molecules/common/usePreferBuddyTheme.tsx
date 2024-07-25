'use client';

import Chip from '@/components/atoms/common/O_Chip';
import { buddyThemes } from '@/data/themes';
import handleChipClick from '@/utils/common/handleChipClick';
import { MouseEvent, useState } from 'react';

const usePreferBuddyTheme = () => {
    const [selectedBuddyTheme, setSelectedBuddyTheme] = useState<string[]>([]);

    const handleBuddyThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;

        const mutableBuddyThemes = buddyThemes.map(theme => theme.ko);
        handleChipClick(
            target,
            mutableBuddyThemes,
            selectedBuddyTheme,
            setSelectedBuddyTheme,
        );
    };

    const PreferBuddyTheme = () => {
        return (
            <>
                <label htmlFor="buddyTheme">선호버디테마</label>
                <section className="flex flex-wrap gap-2">
                    {buddyThemes.map(theme => (
                        <Chip
                            key={theme.en}
                            selected={selectedBuddyTheme.includes(theme.ko)}
                            onClick={handleBuddyThemeChange}
                            intent={theme.en}
                        >
                            {theme.ko}
                        </Chip>
                    ))}
                </section>
            </>
        );
    };

    return { PreferBuddyTheme, selectedBuddyTheme };
};

export default usePreferBuddyTheme;
