'use client';

import React, { useState } from 'react';

// type useSelectBuddyCountsProps = {
//     buddyCounts: number;
//     handleAddBuddyCounts: () => void;
//     handleSubBuddyCounts: () => void;
//     SelectBuddyCounts: () => React.JSX.Element;
// };

export default function useSelectBuddyCounts() {
    const [buddyCounts, setBuddyCounts] = useState<number>(2);

    const handleAddBuddyCounts = () => {
        // setBuddyCounts(buddyCounts + 1);
        setBuddyCounts(prev => Math.min(prev + 1, 4));
    };

    const handleSubBuddyCounts = () => {
        // setBuddyCounts(buddyCounts - 1);
        setBuddyCounts(prev => Math.max(prev - 1, 2));
    };

    // console.log('buddyCounts', buddyCounts);

    const SelectBuddyCounts = () => {
        return (
            <div className="flex justify-center items-center mx-auto flex-row gap-[2px]">
                <button
                    className="text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center"
                    onClick={handleSubBuddyCounts}
                    disabled={buddyCounts === 2}
                >
                    -
                </button>

                <input
                    type="hidden"
                    className="md:p-2 p-1 text-xs md:text-base focus:outline-none text-center h-[24px]"
                    readOnly
                    name="custom-input-number"
                />
                <div className="bg-main-color w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] text-white md:text-base flex items-center justify-center cursor-default">
                    <span>{buddyCounts}</span>
                </div>

                <button
                    className="text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center"
                    onClick={handleAddBuddyCounts}
                    disabled={buddyCounts === 4}
                >
                    +
                </button>
            </div>
        );
    };

    return {
        buddyCounts,
        handleAddBuddyCounts,
        handleSubBuddyCounts,
        SelectBuddyCounts,
    };
}
