import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import { getBuddyClient } from '@/api-services/auth/client';

export default function useBuddyQuery() {
    return useQuery<Buddy | null, Error>({
        queryKey: [QUERY_KEY_BUDDY],
        queryFn: () => getBuddyClient(),
    });
}
