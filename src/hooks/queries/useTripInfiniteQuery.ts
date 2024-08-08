import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY_TRIP_INFINITE } from '@/constants/query.constants';
import { getTrips } from '@/api-services/trips/tripService';
import { TripWithContract } from '@/types/Trips.types';

export default function useTripInfiniteQuery() {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY_TRIP_INFINITE],
        initialPageParam: 0,
        getNextPageParam: (
            lastPage: TripWithContract[],
            allPages: TripWithContract[][],
        ) => {
            if (lastPage.length === 0) return null;
            return allPages.length;
        },
        queryFn: getTrips,
        select: data => data.pages.flat(),
    });
}
