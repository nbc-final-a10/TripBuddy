import clsx from 'clsx';
import React from 'react';

export default function SelectedResultRealtimeText({
    firstLabel,
    secondLabel,
    selectedData,
    isMini,
}: {
    firstLabel?: string;
    secondLabel?: string;
    selectedData?: string;
    isMini?: boolean | null | 0;
}) {
    return (
        <div className="text-center">
            <span
                className={clsx('text-sm text-gray-500', isMini && 'text-xs')}
            >
                {firstLabel}
            </span>
            <span
                className={clsx(
                    'text-md font-bold text-main-color',
                    isMini && 'text-sm',
                )}
            >
                {selectedData}
            </span>
            <span
                className={clsx('text-sm text-gray-500', isMini && 'text-xs')}
            >
                {secondLabel}
            </span>
        </div>
    );
}
