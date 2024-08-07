'use client';

import DefaultLoader from '@/components/atoms/common/defaultLoader';
import useTapScroll from '@/hooks/useTapScroll';
import { StoryOverlay, StoryWithBuddies } from '@/types/Story.types';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useRef, useState } from 'react';

type StoryDetailProps = {
    nickname: string;
    id: string;
    stories: StoryWithBuddies[];
};

const StoryDetail: React.FC<StoryDetailProps> = ({ nickname, id, stories }) => {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [selectedStory, setSelectedStory] = useState<StoryWithBuddies>(
        stories[0],
    );
    useTapScroll({ refs: [scrollRef] });

    const handleNextBefore = (e: MouseEvent<HTMLDivElement>) => {
        const next = e.currentTarget.dataset.next;
        if (next === 'before') {
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
                setSelectedStory(stories[selectedIndex - 1]);
            }
        } else {
            if (selectedIndex < stories.length - 1) {
                setSelectedIndex(selectedIndex + 1);
                setSelectedStory(stories[selectedIndex + 1]);
            }
        }
    };

    const handleSelectStory = (story: StoryWithBuddies, index: number) => {
        setSelectedStory(story);
        setSelectedIndex(index);
        router.push(`/stories/${nickname}?id=${story.story_id}`);
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
        <>
            {!isLoaded && <DefaultLoader />}
            <section className="relative w-full h-[calc(100dvh-57px-56px)] bg-gray-800 aspect-auto xl:h-[calc(100dvh-100px)] xl:w-[430px] xl:mx-auto">
                <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-row">
                    <div
                        data-next="before"
                        className="relative w-1/2 h-full cursor-pointer"
                        onClick={handleNextBefore}
                    ></div>
                    <div
                        data-next="next"
                        className="relative w-1/2 h-full cursor-pointer"
                        onClick={handleNextBefore}
                    ></div>
                </div>

                <div
                    className="absolute w-full top-1 left-1/2 -translate-x-1/2 flex flex-row gap-1 z-30 overflow-x-scroll scrollbar-hidden"
                    ref={scrollRef}
                >
                    {stories.map((story, idx) => (
                        <button
                            className="relative min-w-10 h-2 bg-gray-200 cursor-pointer rounded-lg"
                            key={story.story_id}
                            onClick={() => handleSelectStory(story, idx)}
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
                        storyOverlay[0].filter &&
                            storyOverlay[0].filter.className,
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
        </>
    );
};

export default StoryDetail;
