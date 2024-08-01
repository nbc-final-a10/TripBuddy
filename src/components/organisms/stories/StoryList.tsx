'use client';

import Loading from '@/app/(providers)/loading';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useStoryQuery } from '@/hooks/queries';
import React from 'react';

const StoryList: React.FC = () => {
    const { data: story, isPending, error: storyError } = useStoryQuery();

    if (storyError) return <div>Error</div>;
    if (isPending) return <Loading />;

    return (
        <section className="flex flex-col gap-4 overflow-hidden">
            {story?.map(story => (
                <StoryCard
                    key={story.story_id}
                    name={story.buddies.buddy_nickname}
                    created_at={story.story_created_at}
                    profile_image={
                        story.buddies.buddy_profile_pic || '/images/test.webp'
                    }
                    background_image={story.story_media}
                    mode="my"
                />
            ))}
        </section>
    );
};

export default StoryList;
