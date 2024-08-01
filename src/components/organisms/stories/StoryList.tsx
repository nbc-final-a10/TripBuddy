'use client';

import Loading from '@/app/(providers)/loading';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useAuth } from '@/hooks/auth';
import { useStoriesQuery } from '@/hooks/queries';
import React from 'react';

const StoryList: React.FC = () => {
    const { buddy } = useAuth();
    const { data: story, isPending, error: storyError } = useStoriesQuery();

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
                    mode={
                        buddy?.buddy_id === story.buddies.buddy_id
                            ? 'my'
                            : 'story'
                    }
                />
            ))}
        </section>
    );
};

export default StoryList;
