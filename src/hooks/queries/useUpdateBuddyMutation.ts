import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy, PartialBuddy } from '@/types/Auth.types';
import { patchBuddyInfo } from '@/api-services/auth/client';

export default function useUpdateBuddyMutation() {
    const queryClient = useQueryClient();
    return useMutation<Buddy, Error, PartialBuddy>({
        mutationFn: (buddyInfo: PartialBuddy) => patchBuddyInfo(buddyInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}
