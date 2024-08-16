import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_FOLLOW_COUNT } from '@/constants/query.constants';
import { fetchFollowData } from '@/api-services/auth/client';
import { Follow } from '@/types/Follow.types';

export function useFollowCountQuery(
    clickedBuddyId: string,
    enabled: boolean = true,
) {
    return useQuery<Follow[] | null, Error>({
        queryKey: [QUERY_KEY_FOLLOW_COUNT],
        queryFn: () => fetchFollowData(clickedBuddyId),
        staleTime: 0,
        enabled,
    });
}
