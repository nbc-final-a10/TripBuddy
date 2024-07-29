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
            <span className="text-sm text-gray-500">{firstLabel} </span>
            <span className="text-base font-bold text-main-color">
                {selectedData}
                {` `}
            </span>
            <span className="text-sm text-gray-500">{secondLabel}</span>
        </div>
    );
}
