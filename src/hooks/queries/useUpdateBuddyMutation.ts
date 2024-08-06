import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy, PartialBuddy } from '@/types/Auth.types';
import { patchBuddyInfo } from '@/api-services/auth/client';

export default function useUpdateBuddyMutation() {
    const queryClient = useQueryClient();
    return useMutation<
        Buddy,
        Error,
        { buddyInfo?: PartialBuddy | null; imageFile?: File | null }
    >({
        mutationFn: ({
            buddyInfo = null,
            imageFile = null,
        }: {
            buddyInfo?: PartialBuddy | null;
            imageFile?: File | null;
        }) => patchBuddyInfo({ buddyInfo, imageFile }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}
