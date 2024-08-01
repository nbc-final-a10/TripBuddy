import AddButtonSmall from '@/components/atoms/stories/AddButtonSmall';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type StoryCardProps = {
    name: string;
    created_at: string;
    profile_image: string;
    background_image: string;
    mode: 'my' | 'story';
    id: string;
};

const StoryCard: React.FC<StoryCardProps> = ({
    name,
    created_at,
    profile_image,
    background_image,
    mode,
    id,
}) => {
    return (
        <div className="relative flex flex-col justify-center items-center min-w-[139px] w-[139px] h-[190px] bg-gray-300 rounded-lg gap-2 aspect-auto">
            <Link
                className="w-full h-full absolute aspect-auto flex justify-center items-center"
                href={`/stories/${id}`}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>

                <Image
                    src={background_image}
                    alt="my-profile-background"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                />
            </Link>

            <div className="relative w-full h-14"></div>
            <div className="rounded-full relative aspect-square border-4 border-main-color h-[64px] w-[64px] z-10">
                <Image
                    src={profile_image}
                    alt="my-profile"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full object-cover"
                />
                {mode === 'my' && <AddButtonSmall />}
            </div>

            <div className="flex flex-col gap-[2px] text-center text-white z-10">
                <p className="text-sm">{name}</p>
                <p className="text-xs">
                    {mode === 'my'
                        ? '내 스토리'
                        : getTimeSinceUpload(created_at)}
                </p>
            </div>
        </div>
    );
};

export default StoryCard;
