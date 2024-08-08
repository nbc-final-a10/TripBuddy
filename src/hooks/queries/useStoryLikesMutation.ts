import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_STORY_LIKES } from '@/constants/query.constants';
import { StoryLikesData, StoryLikesResponse } from '@/types/Story.types';
import { postStoryLikes } from '@/api-services/stories';

export default function useStoryLikesMutation(id: string) {
    const queryClient = useQueryClient();
    return useMutation<StoryLikesResponse, Error, StoryLikesData>({
        mutationFn: (data: StoryLikesData) => postStoryLikes(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_STORY_LIKES, id],
            });
        },
    });
}
