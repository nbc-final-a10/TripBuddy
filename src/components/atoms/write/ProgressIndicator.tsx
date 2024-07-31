import React from 'react';

type ProgressIndicatorProps = {
    step: number;
    counts: number;
};

export default function ProgressIndicator({
    step,
    counts,
}: ProgressIndicatorProps) {
    return (
        <div className="flex ml-2 mt-16 xl:mt-28">
            {[...Array(counts)].map((_, index) => (
                <div
                    key={index}
                    className={`h-2 w-2 xl:h-4 xl:w-4 rounded-full mx-1 ${index <= step ? 'bg-main-color' : 'bg-gray-100'}`}
                ></div>
            ))}
        </div>
    );
}
