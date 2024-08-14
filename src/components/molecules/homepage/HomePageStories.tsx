'use client';
import StoryCard from '../stories/StoryCard';
import { StoryOverlay, StoryWithBuddiesAndLikes } from '@/types/Story.types';
import { Buddy } from '@/types/Auth.types';
import React, { useMemo } from 'react';
import groupStoriesByBuddyId from '@/utils/stories/groupStoriesByBuddyId';

type HomePageStoriesProps = {
    stories: StoryWithBuddiesAndLikes[];
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

    // console.log(sortedStories);

    // 0번 인덱스만 전달하는 이유는 스토리 최신 것만 앞에 보여주기 위함임
    return (
        <>
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
                    isMain={true}
                />
            ))}
        </>
    );
};

export default HomePageStories;
