'use client';

import React, { useState } from 'react';

const BuddyTemperature = () => {
    const [temperature, setTemperature] = useState(36.5);

    return (
        <div className="mt-4 xl:mt-8 mx-2 xl:mx-8">
            <span className="block text-left xl:text-xl">버디즈 온도</span>
            <span className="block text-gray-500 text-right">
                {temperature}°C
            </span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div
                    className={`h-3 rounded-full bg-main-color`}
                    style={{ width: `${temperature}%` }}
                ></div>
            </div>
        </div>
    );
};

export default BuddyTemperature;
