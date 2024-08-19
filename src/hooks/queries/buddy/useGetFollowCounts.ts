import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_FOLLOW_COUNT } from '@/constants/query.constants';
import { fetchFollowData } from '@/api-services/auth/client';
import { Follow } from '@/types/Follow.types';

export function useFollowCountQuery(clickedBuddyId: string | null) {
    return useQuery<Follow[] | null, Error>({
        queryKey: [QUERY_KEY_FOLLOW_COUNT, clickedBuddyId],
        queryFn: () =>
            clickedBuddyId ? fetchFollowData(clickedBuddyId) : null,
        enabled: !!clickedBuddyId,
    });
}
