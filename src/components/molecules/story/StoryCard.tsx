import ProfileImage from '@/components/atoms/profile/ProfileImage';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import Image from 'next/image';
import React from 'react';

const StoryCard: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center w-[139px] h-[190px] bg-gray-300 rounded-lg gap-2">
            <div className="relative w-full h-10"></div>
            <div className="rounded-full relative aspect-square border-4 border-main-color h-[64px] w-[64px]">
                <Image
                    src="/images/test.webp"
                    alt="my-profile"
                    fill
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-[2px] text-center">
                <p className="text-sm">김소희</p>
                <p className="text-xs">
                    {getTimeSinceUpload(new Date().toISOString())}
                </p>
            </div>
        </div>
    );
};

export default StoryCard;
