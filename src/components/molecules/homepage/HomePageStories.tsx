'use client';
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
    // stories에서 buddies.buddy_id 값이 같은 것들만 배열로 묶은 객체 생성
    const sortedStories = useMemo(() => {
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

    return (
        <>
            {sortedStories.map(story => (
                <StoryCard
                    key={story.buddyId}
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
                />
            ))}
        </>
    );
};

export default HomePageStories;
