'use client';

import AddButtonSmall from '@/components/atoms/stories/AddButtonSmall';
import LikesButton from '@/components/atoms/stories/LikesButton';
import useStoryLikesQuery from '@/hooks/queries/useStoryLikesQuery';
import { Buddy } from '@/types/Auth.types';
import { StoryOverlay } from '@/types/Story.types';
import { getTimeSinceUpload } from '@/utils/common/getTimeSinceUpload';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type StoryCardProps = {
    name: string;
    created_at: string;
    profile_image: string;
    background_image: string;
    mode: 'my' | 'story';
    id: string;
    buddy: Buddy;
    storyId: string;
    overlay: StoryOverlay[];
};

const StoryCard: React.FC<StoryCardProps> = ({
    name,
    created_at,
    profile_image,
    background_image,
    mode,
    id,
    buddy,
    storyId,
    overlay,
}) => {
    const { data: likes, isPending: isLikesPending } =
        useStoryLikesQuery(storyId);

    if (isLikesPending)
        return (
            <div className="relative min-w-[139px] w-[139px] h-[190px] bg-gray-300 rounded-lg xl:min-w-[254px]"></div>
        );

    return (
        <div className="relative flex flex-col justify-center items-center min-w-[139px] w-[139px] h-[190px] bg-gray-300 rounded-lg gap-2 aspect-auto xl:min-w-[254px]">
            <div className="absolute top-0.5 right-1 w-full flex flex-row justify-end z-[99]">
                <button className="relative focus:outline-none">
                    {likes && (
                        <LikesButton
                            story_id={storyId}
                            likes={likes}
                            mode="card"
                        />
                    )}
                </button>
            </div>
            <Link
                className="w-full h-full absolute aspect-auto flex justify-center items-center"
                href={`/stories/${name}?id=${id}`}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 rounded-lg z-10"></div>

                <Image
                    src={background_image}
                    alt="my-profile-background"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={twMerge(
                        'object-cover rounded-lg',
                        overlay[0].filter && overlay[0].filter.className,
                    )}
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
