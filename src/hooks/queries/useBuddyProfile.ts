import { QUERY_KEY_BUDDY_PROFILE } from '@/constants/query.constants';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const fetchBuddyProfile = async (id: string) => {
    const response = await fetch(`/api/buddyProfile/buddy?id=${id}`);
    if (!response.ok) {
        throw new Error('버디 프로필을 가져오는 데 실패했습니다.');
    }
    return response.json();
};

function useBuddyProfile(id: string) {
    return useQuery({
        queryKey: [QUERY_KEY_BUDDY_PROFILE, id],
        queryFn: () => fetchBuddyProfile(id),
        staleTime: Infinity,
    });
}

export default useBuddyProfile;