import { StoryWithBuddies } from '@/types/Story.types';

// 유틸리티 함수 정의
function groupStoriesByBuddyId(
    stories: StoryWithBuddies[],
): Record<string, StoryWithBuddies[]> {
    return stories.reduce<Record<string, StoryWithBuddies[]>>((acc, story) => {
        const buddyId = story.buddies.buddy_id;
        acc[buddyId] = acc[buddyId] || [];
        acc[buddyId].push(story);
        return acc;
    }, {});
}
export default groupStoriesByBuddyId;
