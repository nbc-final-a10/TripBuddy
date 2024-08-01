import { getStory } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.type';
import { useQuery } from '@tanstack/react-query';

export function useStoryQuery() {
    return useQuery<StoryWithBuddies[] | null, Error>({
        queryKey: [QUERY_KEY_STORY],
        queryFn: getStory,
    });
}
