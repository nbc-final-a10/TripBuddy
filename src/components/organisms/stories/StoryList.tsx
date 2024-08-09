'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useAuth } from '@/hooks/auth';
import useStoriesQuery from '@/hooks/queries/useStoriesQuery';
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

    return (
        <section className="w-[90%] grid grid-cols-2 place-items-center gap-y-4 overflow-hidden xl:grid-cols-4 mx-auto">
            {sortedStories.map(story => (
                <StoryCard
                    key={story.buddyId}
                    // id={story.stories[0].story_id}
                    id={story.buddyId}
                    buddy={story.stories[0].buddies}
                    name={story.stories[0].buddies.buddy_nickname}
                    created_at={story.stories[0].story_created_at}
                    profile_image={
                        story.stories[0].buddies.buddy_profile_pic ||
                        '/images/test.webp' // 추후변경요망
                    }
                    background_image={story.stories[0].story_media}
                    mode={
                        buddy?.buddy_id === story.stories[0].buddies.buddy_id
                            ? 'my'
                            : 'story'
                    }
                    storyId={story.stories[0].story_id}
                    overlay={story.stories[0].story_overlay as StoryOverlay[]}
                />
            ))}
        </section>
    );
};

export default StoryList;
