import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy, LogInData } from '@/types/Auth.types';
import { postLogIn } from '@/api-services/auth/client';

export default function useLogInMutation() {
    const queryClient = useQueryClient();
    return useMutation<Buddy | null, Error, LogInData>({
        mutationFn: (data: LogInData) => postLogIn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}
