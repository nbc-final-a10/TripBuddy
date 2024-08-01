import StoryCard from '../stories/StoryCard';
import { StoryWithBuddies } from '@/types/Story.types';
import { Buddy } from '@/types/Auth.types';
import React from 'react';

type HomePageStoriesProps = {
    stories: StoryWithBuddies[];
    buddy: Buddy | null;
};

const HomePageStories: React.FC<HomePageStoriesProps> = ({
    stories,
    buddy,
}: HomePageStoriesProps) => {
    return (
        <>
            {stories?.map(story => (
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
        </>
    );
};

export default HomePageStories;
