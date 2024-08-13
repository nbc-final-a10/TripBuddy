import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import { useQuery } from '@tanstack/react-query';

export const fetchBuddyProfile = async (id: string) => {
    const response = await fetch(`/api/buddyProfile/buddy?id=${id}`);
    if (!response.ok) {
        throw new Error('버디 프로필을 가져오는 데 실패했습니다.');
    }
    return response.json();
};

export function useBuddyProfile(id: string) {
    return useQuery<Buddy, Error>({
        queryKey: [QUERY_KEY_BUDDY, id],
        queryFn: () => fetchBuddyProfile(id),
        staleTime: Infinity,
    });
}
