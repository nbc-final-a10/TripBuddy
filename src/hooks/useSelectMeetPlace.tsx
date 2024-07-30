'use client';

import React, { useState } from 'react';

function useSelectMeetPlace() {
    const [meetPlace, setMeetPlace] = useState<string>('');

    const firstValue = '출발지';
    const secondValue = '여행지';

    const values = [firstValue, secondValue];

    const SelectWantedSexButton = () => {
        return (
            <div className="flex justify-center items-center mt-4">
                {values.map((value, index) => (
                    <button
                        key={index}
                        onClick={() => setMeetPlace(value)}
                        className={`text-lg ${meetPlace === value ? 'bg-main-color text-white' : 'bg-gray-100'} w-full mx-2 px-4 py-1 xl:py-2 rounded-full hover:bg-gray-200`}
                    >
                        {value}
                    </button>
                ))}
            </div>
        );
    };

    return { SelectWantedSexButton, meetPlace };
}

export default useSelectMeetPlace;
