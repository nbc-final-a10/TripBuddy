import { getTrips } from '@/api-services/trips';
import { QUERY_KEY_TRIP } from '@/constants/query.constants';
import { TripWithContract } from '@/types/Trips.types';
import { useQuery } from '@tanstack/react-query';

export default function useTripsQuery() {
    return useQuery<TripWithContract[] | null, Error>({
        queryKey: [QUERY_KEY_TRIP],
        queryFn: getTrips,
    });
}
