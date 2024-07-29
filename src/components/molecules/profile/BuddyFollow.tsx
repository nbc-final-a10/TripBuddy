import React from 'react';
import { BuddyProfileProps } from '@/types/ProfileParams.types';

export default function BuddyFollow({ id }: BuddyProfileProps) {
    return (
        <div className="mt-4 flex items-center justify-center mx-4 space-x-4">
            {/* 등급표 */}
            {/* <div className="text-center bg-gray-200 h-20 w-20 xl:h-32 xl:w-32 flex flex-col items-center justify-center rounded-xl">
                <p className="block text-sm xl:text-lg font-semibold">
                    BASIC {'>'}
                </p>
            </div> */}
            {/* 팔로워/팔로잉 */}

            <div className="items-center justify-center text-center">
                <p className="block text-sm xl:text-lg font-semibold">20</p>
                <p className="text-gray-500 text-sm xl:text-base">팔로워</p>
            </div>

            <div className="items-center justify-center text-center mx-2">
                <p className="block text-sm xl:text-lg font-semibold">13</p>
                <p className="text-gray-500 text-sm xl:text-base">팔로잉</p>
            </div>
        </div>
    );
}
