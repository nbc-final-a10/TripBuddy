import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchBuddyInfo } from '@/api-services/auth';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy, PartialBuddy } from '@/types/Auth.types';

export function useUpdateBuddyMutation() {
    const queryClient = useQueryClient();
    return useMutation<Buddy, Error, PartialBuddy>({
        mutationFn: (buddyInfo: PartialBuddy) => patchBuddyInfo(buddyInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}
