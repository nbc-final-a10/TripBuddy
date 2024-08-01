'use client';

import Loading from '@/app/(providers)/loading';
import StoryCard from '@/components/molecules/stories/StoryCard';
import { useAuth } from '@/hooks/auth';
import useStoriesQuery from '@/hooks/queries/useStoriesQuery';
import React from 'react';

const StoryList: React.FC = () => {
    const { buddy } = useAuth();
    const { data: stories, isPending, error: storyError } = useStoriesQuery();

    // 추후 변경 요망
    if (storyError) return <div>Error</div>;
    if (isPending) return <Loading />;
    if (!stories) return <div>No stories</div>;

    return (
        <section className="grid grid-cols-2 place-items-center gap-4 overflow-hidden xl:grid-cols-4">
            {stories.map(story => (
                <StoryCard
                    key={story.story_id}
                    id={story.story_id}
                    name={story.buddies.buddy_nickname}
                    created_at={story.story_created_at}
                    profile_image={
                        story.buddies.buddy_profile_pic || '/images/test.webp' // 추후변경요망
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
