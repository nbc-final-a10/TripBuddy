import { getUserClient } from '@/api-services/auth/getUserClient';
import { QUERY_KEY_USER } from '@/constants/query.constants';
import { AuthContext } from '@/contexts/auth.context';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined || context === null) {
        throw new Error('오류 발생! 오류발생! 훅은 프로바이더 안에서 써줘요잉');
    }

    return context;
};

// 서버쪽 쿼리는 작성 금지

export function useBuddyQuery(initialBuddy: any) {
    return useQuery({
        queryKey: [QUERY_KEY_USER],
        queryFn: () => getUserClient(initialBuddy),
    });
}
