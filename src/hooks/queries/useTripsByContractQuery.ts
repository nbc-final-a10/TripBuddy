import { getBannerTrips } from '@/api-services/contracts';
import { QUERY_KEY_TRIP_BY_CONTRACT } from '@/constants/query.constants';
import { BannerTripWithContract } from '@/types/Contract.types';
import { useQuery } from '@tanstack/react-query';

export default function useTripsByContractQuery(buddyId: string | undefined) {
    return useQuery<BannerTripWithContract | null, Error>({
        queryKey: [QUERY_KEY_TRIP_BY_CONTRACT],
        queryFn: () => getBannerTrips(buddyId),
        enabled: !!buddyId,
    });
}
