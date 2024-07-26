'use client';

import { getBuddyClient } from '@/api-services/auth/getBuddyClient';
import { postLogIn } from '@/api-services/auth/postLogIn';
import { updateBuddyInfo } from '@/api-services/auth/updateBuddyInfo';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { AuthContext } from '@/contexts/auth.context';
import {
    type Buddy,
    type LogInData,
    type PartialBuddy,
} from '@/types/Auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined || context === null) {
        throw new Error('오류 발생! 오류발생! 훅은 프로바이더 안에서 써줘요잉');
    }

    return context;
};

// 서버쪽 쿼리는 작성 금지

export function useBuddyQuery() {
    return useQuery<Buddy | null, Error>({
        queryKey: [QUERY_KEY_BUDDY],
        queryFn: () => getBuddyClient(),
    });
}

export function useUpdateBuddyInfoMutation() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, PartialBuddy>({
        mutationFn: (buddyInfo: PartialBuddy) => updateBuddyInfo(buddyInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}

export function useLogInMutation() {
    const queryClient = useQueryClient();
    return useMutation<Buddy, Error, LogInData>({
        mutationFn: (data: LogInData) => postLogIn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}
