import { getTrips } from '@/api-services/trips';
import { QUERY_KEY_TRIP } from '@/constants/query.constants';
import { Trip } from '@/types/Trips.types';
import { useQuery } from '@tanstack/react-query';

export default function useTripsQuery() {
    return useQuery<Trip[] | null, Error>({
        queryKey: [QUERY_KEY_TRIP],
        queryFn: getTrips,
    });
}
