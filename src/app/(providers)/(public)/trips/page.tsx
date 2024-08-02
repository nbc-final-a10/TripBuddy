import { getTrips } from '@/api-services/trips';
import TripList from '@/components/organisms/trips/TripList';
import { QUERY_KEY_TRIP } from '@/constants/query.constants';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';

const TripsPage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_TRIP],
        queryFn: () => getTrips(),
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
