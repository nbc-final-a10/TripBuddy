'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import { StoryOverlay, StoryWithBuddies } from '@/types/Story.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useRef, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Close from '../../../../public/svg/Close.svg';
import { showAlert } from '@/utils/ui/openCustomAlert';
import LikesButton from '@/components/atoms/stories/LikesButton';
import {
    useDeleteStoryMutation,
    useSpecificStoryQuery,
    useStoryLikesQuery,
} from '@/hooks/queries';
import { useAuth, useTapScroll } from '@/hooks';

type StoryDetailProps = {
    // nickname: string;
    id: string;
    stories: StoryWithBuddies[];
};

const StoryDetail: React.FC<StoryDetailProps> = ({ id, stories }) => {
    const { buddy } = useAuth();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const {
        data: queryStories,
        isPending,
        error: selectedStoriesError,
    } = useSpecificStoryQuery(id);
    const {
        mutate: deleteStory,
        isPending: isDeleting,
        error: deleteStoryError,
    } = useDeleteStoryMutation();

    useTapScroll({ refs: [scrollRef] });

    const [selectedStory, setSelectedStory] = useState<StoryWithBuddies>(
        stories[0],
    );

    const { data: likes, isPending: isLikesPending } = useStoryLikesQuery({
        id: selectedStory.story_id,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        router.push(`/stories/${story.buddies.buddy_id}`);
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
            router.push(`/stories/${queryStories[0].story_id}`);
        }
    }, [queryStories, router]);

    useEffect(() => {
        if (isLikesPending || isDeleting || isPending) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [isLikesPending, isDeleting, isPending, setIsLoading]);

    const storyOverlay = selectedStory?.story_overlay as StoryOverlay[];

    // if (isLoading) return <DefaultLoader />;

    return (
        <>
            <section className="relative w-full h-[calc(100dvh-57px-54px)] bg-gray-800 aspect-auto xl:h-[calc(100dvh-100px)] xl:w-[430px] xl:mx-auto overflow-hidden">
                {isLoading && <DefaultLoader />}
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
                    <button className="relative focus:outline-none">
                        {likes && (
                            <LikesButton
                                storyId={selectedStory.story_id}
                                likesCount={likes.length}
                                likes={likes}
                            />
                        )}
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
                    className={twMerge(
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
