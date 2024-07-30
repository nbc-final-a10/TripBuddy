'use client';

import React from 'react';
import { Range, getTrackBackground } from 'react-range';

type SelectAgesRangeProps = {
    startAge: number;
    endAge: number;
    handleStartAge: (value: number) => void;
    handleEndAge: (value: number) => void;
};

const SelectAgesRange: React.FC<SelectAgesRangeProps> = ({
    startAge,
    endAge,
    handleStartAge,
    handleEndAge,
}) => {
    const STEP = 1;
    const MIN = 18;
    const MAX = 150;

    const values = [startAge, endAge];

    const handleChange = (values: number[]) => {
        handleStartAge(values[0]);
        handleEndAge(values[1]);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-4 w-full">
            <div className="flex justify-between w-full px-4 mt-2">
                <input
                    type="number"
                    value={startAge}
                    onChange={e => handleStartAge(Number(e.target.value))}
                    className="bg-gray-100 w-full px-4 py-1 xl:py-2 rounded-full hover:bg-gray-200 text-center"
                />
                <span className="text-lg mx-2"> ~ </span>
                <input
                    type="number"
                    value={endAge}
                    onChange={e => handleEndAge(Number(e.target.value))}
                    className="bg-gray-100 w-full px-4 py-1 xl:py-2 rounded-full hover:bg-gray-200 text-center"
                />
            </div>
            <div className="relative w-full my-3 mt-5">
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={handleChange}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className="w-full h-2 bg-gray-200 rounded-full"
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ['#ccc', '#fca311', '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, isDragged, index }) => (
                        <div
                            {...props}
                            key={index}
                            className={`w-4 h-4 bg-main-color rounded-full ${
                                isDragged ? 'shadow-lg' : ''
                            }`}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default SelectAgesRange;