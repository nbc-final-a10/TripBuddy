import { getSpecificStories } from '@/api-services/stories';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { StoryWithBuddies } from '@/types/Story.types';
import { useQuery } from '@tanstack/react-query';

export default function useSpecificStoriesQuery(id: string) {
    return useQuery<StoryWithBuddies[], Error>({
        queryKey: [QUERY_KEY_STORY, id],
        queryFn: () => getSpecificStories(id),
        enabled: !!id,
    });
}
