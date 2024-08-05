'use client';

import Loading from '@/app/(providers)/loading';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useAuth } from '@/hooks/auth';
import useStoriesQuery from '@/hooks/queries/useStoriesQuery';
import groupStoriesByBuddyId from '@/utils/stories/groupStoriesByBuddyId';
import React, { useMemo } from 'react';

const StoryList: React.FC = () => {
    const { buddy } = useAuth();
    const { data: stories, isPending, error: storyError } = useStoriesQuery();

    const sortedStories = useMemo(
        () => (stories ? groupStoriesByBuddyId(stories) : []),
        [stories],
    );

    // 추후 변경 요망
    if (storyError) return <div>Error</div>;
    if (isPending) return <Loading />;
    if (!stories) return <div>No stories</div>;

    return (
        <section className="w-[90%] grid grid-cols-2 place-items-center gap-y-4 overflow-hidden xl:grid-cols-4 mx-auto">
            {Object.entries(sortedStories).map(([buddyId, stories]) => (
                <StoryCard
                    key={buddyId}
                    id={stories[0].story_id}
                    buddy={stories[0].buddies}
                    name={stories[0].buddies.buddy_nickname}
                    created_at={stories[0].story_created_at}
                    profile_image={
                        stories[0].buddies.buddy_profile_pic ||
                        '/images/test.webp' // 추후변경요망
                    }
                    background_image={stories[0].story_media}
                    mode={
                        buddy?.buddy_id === stories[0].buddies.buddy_id
                            ? 'my'
                            : 'story'
                    }
                />
            ))}
        </section>
    );
};

export default StoryList;
