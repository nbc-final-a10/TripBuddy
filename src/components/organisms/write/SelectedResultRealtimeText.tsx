import React from 'react';

export default function SelectedResultRealtimeText({
    firstLabel,
    secondLabel,
    selectedData,
}: {
    firstLabel?: string;
    secondLabel?: string;
    selectedData?: string;
}) {
    return (
        <div className="text-center">
            <span className="text-sm xl:text-2xl text-gray-500">
                {firstLabel}
                {` `}
            </span>
            <span className="text-m xl:text-3xl font-bold text-main-color">
                {selectedData}
                {` `}
            </span>
            <span className="text-sm xl:text-2xl text-gray-500">
                {secondLabel}
            </span>
        </div>
    );
}
