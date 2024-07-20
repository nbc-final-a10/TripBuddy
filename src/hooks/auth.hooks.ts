import { getUserClient } from '@/api-services/auth/getUserClient';
import { getUserServer } from '@/api-services/auth/getUserServer';
import { QUERY_KEY_USER } from '@/constants/auth.constans';
import { AuthContext } from '@/contexts/auth.context';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === undefined || context === null) {
        throw new Error('오류 발생! 오류발생! 훅은 프로바이더 안에서 써줘요잉');
    }

    return context;
};

export async function usePrefetchBuddy(queryClient: QueryClient) {
    return await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: () => getUserServer(),
    });
}

export function useBuddyQuery(initialBuddy: any) {
    return useQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: () => getUserClient(initialBuddy),
    });
}
