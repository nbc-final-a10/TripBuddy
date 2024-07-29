import { type AllBuddyTheme, type AllTripTheme } from '@/types/Themes.types';
import Chip from './O_Chip';
import { MouseEvent, useId } from 'react';
import clsx from 'clsx';

type PreferThemeProps = {
    selectedTheme: string[];
    handleThemeChange: (e: MouseEvent<HTMLSpanElement>) => void;
    themes: (AllTripTheme | AllBuddyTheme)[];
    label?: string | null;
    indicate?: boolean;
};

const PreferTheme = ({
    selectedTheme,
    handleThemeChange,
    themes,
    label = '',
    indicate = false,
}: PreferThemeProps) => {
    return (
        <>
            <div className="flex items-center gap-2">
                {label && <label className="w-full">{label}</label>}
                {indicate && (
                    <span
                        className={clsx(
                            'text-sm w-full text-gray-500',
                            label ? 'text-right' : 'text-left',
                        )}
                    >
                        3가지를 선택해주세요
                    </span>
                )}
            </div>

            <section className="flex flex-wrap gap-2">
                {themes.map(theme => (
                    <Chip
                        key={theme.en}
                        selected={selectedTheme.includes(theme.ko)}
                        onClick={handleThemeChange}
                    >
                        {theme.ko}
                    </Chip>
                ))}
            </section>
        </>
    );
};

export default PreferTheme;
