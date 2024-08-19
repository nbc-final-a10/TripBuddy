import React, { Suspense } from 'react';
import SearchPageContainer from '@/components/organisms/search/SearchPageContainer';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import { QUERY_KEY_TRIPS } from '@/constants/query.constants';
import { getTrips } from '@/api-services/trips';
import Loading from '../loading';
import { TripInfiniteQueryResponse } from '@/types/Trips.types';

export default async function SearchPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_TRIPS],
        queryFn: () => getTrips(),
        staleTime: 1000 * 60 * 5,
    });
    const dehydratedState = dehydrate(queryClient);

    const initialTrips: TripInfiniteQueryResponse | null =
        queryClient.getQueryData([QUERY_KEY_TRIPS]) || null;

    return (
        <Suspense fallback={<Loading />}>
            <HydrationBoundary state={dehydratedState}>
                {initialTrips && (
                    <SearchPageContainer initialTrips={initialTrips} />
                )}
            </HydrationBoundary>
        </Suspense>
    );
}
