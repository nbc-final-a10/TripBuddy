import { type AllBuddyTheme, type AllTripTheme } from '@/types/Themes.types';
import Chip from './O_Chip';
import { MouseEvent, useId } from 'react';

type PreferThemeProps = {
    selectedTheme: string[];
    handleThemeChange: (e: MouseEvent<HTMLSpanElement>) => void;
    themes: (AllTripTheme | AllBuddyTheme)[];
    label?: string;
};

const PreferTheme = ({
    selectedTheme,
    handleThemeChange,
    themes,
    label = '',
}: PreferThemeProps) => {
    const id = useId();

    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <section id={id} className="flex flex-wrap gap-2">
                {themes.map(theme => (
                    <Chip
                        key={theme.en}
                        selected={selectedTheme.includes(theme.ko)}
                        onClick={handleThemeChange}
                        intent={theme.en}
                    >
                        {theme.ko}
                    </Chip>
                ))}
            </section>
        </>
    );
};

export default PreferTheme;
