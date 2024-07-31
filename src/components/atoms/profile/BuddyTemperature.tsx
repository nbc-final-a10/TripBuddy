'use client';

import { BuddyProfileProps } from '@/types/ProfileParams.types';
import React, { useState } from 'react';

const BuddyTemperature = ({
    id,
    isLabel = true,
    isTempText = true,
}: BuddyProfileProps) => {
    const [temperature, setTemperature] = useState(36.5);

    return (
        <div className="flex flex-col">
            {isLabel && (
                <span className="block text-left xl:text-xl">버디즈 온도</span>
            )}
            {isTempText && (
                <span className="block text-gray-500 text-right">
                    {temperature}°C
                </span>
            )}
            <div className="w-full rounded-full h-2 bg-[#A67000]">
                <div
                    className={`h-2 rounded-full bg-main-color`}
                    style={{ width: `${temperature}%` }}
                ></div>
            </div>
        </div>
    );
};

export default BuddyTemperature;
