import HomePageBanner from '@/components/molecules/homepage/HomePageBanner';
import HomePageContainer from '@/components/organisms/homepage/HomePageContainer';
import {
    QUERY_KEY_BUDDIES,
    QUERY_KEY_STORIES,
    QUERY_KEY_TRIPS,
} from '@/constants/query.constants';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';
import { getBuddyTripStory } from '@/api-services/home';

const HomePage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_BUDDIES],
        queryFn: () => getBuddyTripStory(QUERY_KEY_BUDDIES),
        staleTime: 1000 * 60 * 5,
    });
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_TRIPS],
        queryFn: () => getBuddyTripStory(QUERY_KEY_TRIPS),
        staleTime: 1000 * 60 * 5,
    });
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_STORIES],
        queryFn: () => getBuddyTripStory(QUERY_KEY_STORIES),
        staleTime: 1000 * 60 * 5,
    });
    const dehydratedState = dehydrate(queryClient);
    return (
        <main className="relative h-full w-full">
            <Suspense fallback={<Loading />}>
                <HydrationBoundary state={dehydratedState}>
                    <HomePageBanner />
                    <HomePageContainer />
                </HydrationBoundary>
            </Suspense>
        </main>
    );
};

export default HomePage;
