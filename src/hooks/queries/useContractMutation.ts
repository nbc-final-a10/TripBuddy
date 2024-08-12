import { postContract } from '@/api-services/contracts';
import { QUERY_KEY_CONTRACT } from '@/constants/query.constants';
import { Contract, PartialContract } from '@/types/Contract.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useContractMutation() {
    const queryClient = useQueryClient();
    return useMutation<Contract, Error, PartialContract>({
        mutationFn: newContract => postContract(newContract),
        onSuccess: newContract => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_CONTRACT, newContract.contract_trip_id],
            });
        },
    });
}
