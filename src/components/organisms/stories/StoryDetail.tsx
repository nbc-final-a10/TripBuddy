'use client';

import useStoryQuery from '@/hooks/queries/useStoryQuery';
import { StoryOverlay } from '@/types/Story.types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

type StoryDetailProps = {
    nickname: string;
    id: string;
};

const StoryDetail: React.FC<StoryDetailProps> = ({ nickname, id }) => {
    const { data: story, isPending, error: storyError } = useStoryQuery(id);
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log(story);

    if (isPending) return <div>Loading...</div>;
    if (storyError) return <div>Error: {storyError.message}</div>;

    const storyOverlay = story?.story_overlay as StoryOverlay[];

    return (
        <section className="relative w-full h-[calc(100dvh-57px)] bg-gray-800 aspect-auto">
            <Image
                src={story.story_media}
                alt="my-story-background"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                onLoad={() => setIsLoaded(true)}
                className={clsx(
                    'object-contain',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                )}
            />
            <div className="absolute top-0 left-0 w-full h-full">
                {storyOverlay.map(overlay => (
                    <p
                        key={overlay.text}
                        className="absolute w-auto h-auto font-bold text-white"
                        style={{
                            top: `${overlay.position.y}px`,
                            left: `${overlay.position.x}px`,
                            transform: `translate(${overlay.position.x}px, ${overlay.position.y}px)`,
                        }}
                    >
                        {overlay.text}
                    </p>
                ))}
            </div>
        </section>
    );
};

export default StoryDetail;
