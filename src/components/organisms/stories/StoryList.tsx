'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useAuth } from '@/hooks';
import { useStoriesQuery } from '@/hooks/queries';
import { StoryOverlay } from '@/types/Story.types';
import groupStoriesByBuddyId from '@/utils/stories/groupStoriesByBuddyId';
import React, { useMemo } from 'react';

const StoryList: React.FC = () => {
    const { buddy } = useAuth();
    const { data: stories, isPending, error: storyError } = useStoriesQuery();

    const sortedStories = useMemo(() => {
        if (!stories) return [];
        const groupedStories = groupStoriesByBuddyId(stories);
        const array = Object.entries(groupedStories).map(
            ([buddyId, stories]) => ({
                buddyId,
                stories,
            }),
        );
        const sortedArray = array.sort((a, b) => {
            return a.buddyId === buddy?.buddy_id ? -1 : 1;
        });

        return sortedArray;
    }, [stories, buddy]);

    // 추후 변경 요망
    if (storyError) return <div>Error</div>;
    if (isPending) return <DefaultLoader />;
    if (!stories) return <div>No stories</div>;

    // console.log(sortedStories);

    return (
        <section className="w-[92%] py-2 grid grid-cols-2 place-items-center gap-y-3 overflow-hidden xl:grid-cols-4 mx-auto xl:w-full">
            {sortedStories.map(story => (
                <StoryCard
                    key={story.buddyId}
                    id={story.buddyId}
                    mode={
                        buddy?.buddy_id === story.stories[0].buddies.buddy_id
                            ? 'my'
                            : 'story'
                    }
                    overlay={story.stories[0].story_overlay as StoryOverlay[]}
                    story={story.stories[0]}
                    likes={story.stories[0].likes}
                />
            ))}
        </section>
    );
};

export default StoryList;
