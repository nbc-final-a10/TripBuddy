import StoryCard from '../stories/StoryCard';
import { StoryWithBuddies } from '@/types/Story.types';
import { Buddy } from '@/types/Auth.types';
import React, { useMemo } from 'react';
import groupStoriesByBuddyId from '@/utils/stories/groupStoriesByBuddyId';

type HomePageStoriesProps = {
    stories: StoryWithBuddies[];
    buddy: Buddy | null;
};

const HomePageStories: React.FC<HomePageStoriesProps> = ({
    stories,
    buddy,
}: HomePageStoriesProps) => {
    console.log(stories);

    // stories에서 buddies.buddy_id 값이 같은 것들만 배열로 묶은 객체 생성
    const sortedStories = useMemo(
        () => groupStoriesByBuddyId(stories),
        [stories],
    );

    console.log(sortedStories);

    return (
        <>
            {Object.entries(sortedStories).map(([buddyId, stories]) => (
                <StoryCard
                    key={buddyId}
                    id={buddyId}
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
        </>
    );
};

export default HomePageStories;
