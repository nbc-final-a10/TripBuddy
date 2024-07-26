import React from 'react';

export default function BuddyFollow() {
    return (
        <div className="mt-4 flex items-center justify-between mx-4">
            <div className="text-center bg-gray-200 h-20 w-20 xl:h-32 xl:w-32 flex flex-col items-center justify-center rounded-xl">
                <p className="block text-sm xl:text-lg font-semibold">
                    BASIC {'>'}
                </p>
            </div>
            <div className="text-center bg-gray-200 h-20 w-20 xl:h-32 xl:w-32 flex flex-col items-center justify-center rounded-xl">
                <p className="block text-sm xl:text-lg font-semibold">20</p>
                <p className="text-gray-500 text-sm xl:text-base">팔로워</p>
            </div>
            <div className="text-center bg-gray-200 h-20 w-20 xl:h-32 xl:w-32 flex flex-col items-center justify-center rounded-xl">
                <p className="block text-sm xl:text-lg font-semibold">13</p>
                <p className="text-gray-500 text-sm xl:text-base">팔로잉</p>
            </div>
        </div>
    );
}
