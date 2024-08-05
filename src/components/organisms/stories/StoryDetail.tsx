'use client';

import useStoriesQuery from '@/hooks/queries/useStoriesQuery';
import useStoryQuery from '@/hooks/queries/useStoryQuery';
import { StoryOverlay, StoryWithBuddies } from '@/types/Story.types';
import groupStoriesByBuddyId from '@/utils/stories/groupStoriesByBuddyId';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

type StoryDetailProps = {
    nickname: string;
    id: string;
    stories: StoryWithBuddies[];
};

const StoryDetail: React.FC<StoryDetailProps> = ({ nickname, id, stories }) => {
    // const [selectedId, setSelectedId] = useState<string>(id);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [selectedStory, setSelectedStory] = useState<StoryWithBuddies>(
        stories[0],
    );
    console.log(stories);

    const handleSelectStory = (story: StoryWithBuddies) => {
        console.log(story);
        setSelectedStory(story);
    };

    // const {
    //     data: story,
    //     isPending: storyPending,
    //     error: storyError,
    // } = useStoryQuery(selectedId);

    // if (storyPending) return <div>Loading...</div>;
    // if (storyError) return <div>Error: {storyError.message}</div>;

    const storyOverlay = selectedStory?.story_overlay as StoryOverlay[];

    return (
        <section className="relative w-full h-[calc(100dvh-57px)] bg-gray-800 aspect-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-row gap-2 z-30">
                {stories.map(story => (
                    <button
                        className="w-10 h-2 bg-gray-500"
                        key={story.story_id}
                        onClick={() => handleSelectStory(story)}
                    ></button>
                ))}
            </div>

            <Image
                src={selectedStory.story_media}
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
