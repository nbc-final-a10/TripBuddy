import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY_TRIP_INFINITE } from '@/constants/query.constants';
import { getInfiniteTrips } from '@/api-services/trips/tripService';
import { TripInfiniteQueryResponse } from '@/types/Trips.types';

export default function useTripInfiniteQuery() {
    return useInfiniteQuery({
        queryKey: [QUERY_KEY_TRIP_INFINITE],
        initialPageParam: 1,
        getNextPageParam: (
            lastPage: TripInfiniteQueryResponse,
            allPages: TripInfiniteQueryResponse[],
        ) => {
            if (lastPage.trips.length === 0) return null;
            return allPages.length;
        },
        queryFn: getInfiniteTrips,
        select: data => data.pages.flatMap(page => page.trips),
    });
}
