import { getTrips } from '@/api-services/trips';
import TripList from '@/components/organisms/trips/TripList';
import { QUERY_KEY_TRIP_INFINITE } from '@/constants/query.constants';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';
import { TripWithContract } from '@/types/Trips.types';

const TripsPage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
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
        pages: 1,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <Suspense fallback={<Loading />}>
            <HydrationBoundary state={dehydratedState}>
                <TripList />
            </HydrationBoundary>
        </Suspense>
    );
};

export default TripsPage;
