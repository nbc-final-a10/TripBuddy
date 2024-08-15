import { getInfiniteTrips, getTrips } from '@/api-services/trips';
import TripList from '@/components/organisms/trips/TripList';
import {
    QUERY_KEY_TRIP,
    QUERY_KEY_TRIP_INFINITE,
} from '@/constants/query.constants';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';
import { TripInfiniteQueryResponse } from '@/types/Trips.types';
import FloatingButton from '@/components/atoms/home/FloatingButton';

const TripsPage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEY_TRIP_INFINITE],
        initialPageParam: 0,
        getNextPageParam: (
            lastPage: TripInfiniteQueryResponse,
            allPages: TripInfiniteQueryResponse[],
        ) => {
            if (lastPage.trips.length === 0) return null;
            return allPages.length;
        },
        queryFn: getInfiniteTrips,
        pages: 1,
    });
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_TRIP],
        queryFn: () => getTrips(),
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <Suspense fallback={<Loading />}>
            <HydrationBoundary state={dehydratedState}>
                <FloatingButton />
                <TripList />
            </HydrationBoundary>
        </Suspense>
    );
};

export default TripsPage;
