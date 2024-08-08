'use client';

import DefaultLoader from '@/components/atoms/common/defaultLoader';
import useTapScroll from '@/hooks/useTapScroll';
import { StoryOverlay, StoryWithBuddies } from '@/types/Story.types';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useRef, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '../../../../public/svg/Close.svg';
import { FaRegHeart } from 'react-icons/fa';
import { useAuth } from '@/hooks/auth';
import useDeleteStoryMutation from '@/hooks/queries/useDeleteStoryMutation';
import { showAlert } from '@/utils/ui/openCustomAlert';
import useSpecificStoriesQuery from '@/hooks/queries/useSpecificStoriesQuery';

type StoryDetailProps = {
    nickname: string;
    id: string;
    stories: StoryWithBuddies[];
};

const StoryDetail: React.FC<StoryDetailProps> = ({ nickname, id, stories }) => {
    const [isHearted, setIsHearted] = useState<boolean>(false);
    const { buddy } = useAuth();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [selectedStory, setSelectedStory] = useState<StoryWithBuddies>(
        stories[0],
    );
    const {
        data: queryStories,
        isPending,
        error: selectedStoriesError,
    } = useSpecificStoriesQuery(stories[0].story_created_by);
    const {
        mutate: deleteStory,
        isPending: isDeleting,
        error: deleteStoryError,
    } = useDeleteStoryMutation();
    useTapScroll({ refs: [scrollRef] });

    const handleNextBefore = (e: MouseEvent<HTMLDivElement>) => {
        const next = e.currentTarget.dataset.next;
        if (next === 'before') {
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
                setSelectedStory(
                    !queryStories
                        ? stories[selectedIndex - 1]
                        : queryStories[selectedIndex - 1],
                );
            }
        } else {
            if (selectedIndex < stories.length - 1) {
                setSelectedIndex(selectedIndex + 1);
                setSelectedStory(
                    !queryStories
                        ? stories[selectedIndex + 1]
                        : queryStories[selectedIndex + 1],
                );
            }
        }
    };

    const handleSelectStory = (story: StoryWithBuddies, index: number) => {
        setSelectedStory(story);
        setSelectedIndex(index);
        router.push(`/stories/${nickname}?id=${story.story_id}`);
    };

    const handleDeleteStory = () => {
        deleteStory(selectedStory.story_id);
        if (!isDeleting && !isPending) {
            showAlert('success', '스토리가 삭제되었습니다.');
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            const selectedButton = scrollRef.current.children[
                selectedIndex
            ] as HTMLElement;
            if (selectedButton) {
                selectedButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
            }
        }
    }, [selectedIndex]);

    useEffect(() => {
        if (selectedStoriesError || deleteStoryError) {
            showAlert('error', '스토리를 불러오는데 실패했습니다.');
        }
    }, [selectedStoriesError, deleteStoryError]);

    useEffect(() => {
        if (queryStories) {
            setSelectedStory(queryStories[0]);
            router.push(`/stories/${nickname}?id=${queryStories[0].story_id}`);
        }
    }, [queryStories, router, nickname]);

    const storyOverlay = selectedStory?.story_overlay as StoryOverlay[];

    return (
        <>
            {isDeleting && <DefaultLoader />}
            {isPending && <DefaultLoader />}
            <section className="relative w-full h-[calc(100dvh-57px-56px)] bg-gray-800 aspect-auto xl:h-[calc(100dvh-100px)] xl:w-[430px] xl:mx-auto overflow-hidden">
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

                <div className="absolute top-4 right-1 w-full flex flex-row justify-end gap-2 z-[99]">
                    <button className="relative">
                        <FaRegHeart className="cursor-pointer fill-white" />
                    </button>
                    {buddy?.buddy_id === selectedStory.story_created_by ? (
                        <button
                            className="relative"
                            onClick={handleDeleteStory}
                        >
                            <Close className="cursor-pointer fill-white" />
                        </button>
                    ) : null}
                </div>

                <div
                    className="absolute w-full top-1 left-1/2 -translate-x-1/2 flex flex-row justify-center gap-1 z-30 overflow-x-auto scrollbar-hidden"
                    ref={scrollRef}
                >
                    {(queryStories ? queryStories : stories).map(
                        (story, idx) => (
                            <button
                                className={twMerge(
                                    'relative min-w-10 h-2 bg-gray-200 cursor-pointer rounded-lg',
                                    idx === selectedIndex
                                        ? 'bg-primary-color-200'
                                        : '',
                                )}
                                key={story.story_id}
                                onClick={() => handleSelectStory(story, idx)}
                            ></button>
                        ),
                    )}
                </div>

                <Image
                    src={selectedStory.story_media}
                    alt="my-story-background"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className={clsx(
                        'object-contain',
                        storyOverlay[0].filter &&
                            storyOverlay[0].filter.className,
                    )}
                />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    {storyOverlay.map(overlay => (
                        <p
                            key={overlay.text}
                            className={twMerge(
                                'absolute w-auto h-auto font-bold',
                                overlay.textColor,
                            )}
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
