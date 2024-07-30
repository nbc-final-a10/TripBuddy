'use client';

import React from 'react';

type SelectAgesRangeProps = {
    startAge: number;
    endAge: number;
    handleStartAge: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEndAge: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectAgesRange: React.FC<SelectAgesRangeProps> = ({
    startAge,
    endAge,
    handleStartAge,
    handleEndAge,
}) => {
    return (
        <div className="flex flex-col justify-center items-center mt-4">
            <input
                value={startAge}
                className="bg-gray-100 w-full mx-2 px-4 py-1 xl:py-2 rounded-full hover:bg-gray-200 text-center"
                onChange={handleStartAge}
            />
            <span className="text-lg mx-2"> ~ </span>
            <input
                value={endAge}
                className="bg-gray-100 w-full mx-2 px-4 py-1 xl:py-2 rounded-full hover:bg-gray-200 text-center"
                onChange={handleEndAge}
            />
            <input
                type="range"
                min={18}
                max={100}
                value={startAge}
                onChange={handleStartAge}
                className="w-full mx-2"
            />
            <input
                type="range"
                min={18}
                max={100}
                value={endAge}
                onChange={handleEndAge}
                className="w-full mx-2"
            />
        </div>
    );
};

export default SelectAgesRange;
