import { getStories } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.types';
import { useQuery } from '@tanstack/react-query';

export default function useStoriesQuery() {
    return useQuery<StoryWithBuddies[] | null, Error>({
        queryKey: [QUERY_KEY_STORY],
        queryFn: getStories,
    });
}
