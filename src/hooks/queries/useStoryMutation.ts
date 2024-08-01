import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_STORY } from '@/constants/query.constants';
import { Story, StoryData } from '@/types/Story.type';
import { postStory } from '@/api-services/stories';

export default function useStoryMutation() {
    const queryClient = useQueryClient();
    return useMutation<Story | null, Error, StoryData>({
        mutationFn: (data: StoryData) => postStory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STORY] });
        },
    });
}
