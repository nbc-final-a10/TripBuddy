import React from 'react';
import { twMerge } from 'tailwind-merge';

type ProgressIndicatorProps = {
    step: number;
    counts: number;
    className?: string;
};

export default function ProgressIndicator({
    step,
    counts,
    className = '',
}: ProgressIndicatorProps) {
    return (
        <div className={twMerge('flex ml-2 pt-16 xl:pt-28', className)}>
            {[...Array(counts)].map((_, index) => (
                <div
                    key={index}
                    className={`h-2 w-2 xl:h-4 xl:w-4 rounded-full mx-1 ${index <= step ? 'bg-main-color' : 'bg-gray-100'}`}
                ></div>
            ))}
        </div>
    );
}
