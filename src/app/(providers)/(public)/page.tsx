import HomePageBanner from '@/components/molecules/homepage/HomePageBanner';
import HomePageContainer from '@/components/organisms/homepage/HomePageContainer';
import {
    QUERY_KEY_BUDDY,
    QUERY_KEY_STORY,
    QUERY_KEY_TRIP,
} from '@/constants/query.constants';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Loading from '../loading';
import { getBuddyTripStory } from '@/api-services/home';
import FloatingButton from '@/components/atoms/home/FloatingButton';

const HomePage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_TRIP, QUERY_KEY_STORY],
        queryFn: () => getBuddyTripStory(),
    });
    const dehydratedState = dehydrate(queryClient);
    return (
        <main className="relative h-full w-full">
            <Suspense fallback={<Loading />}>
                <HydrationBoundary state={dehydratedState}>
                    <FloatingButton />
                    <HomePageBanner />
                    <HomePageContainer />
                </HydrationBoundary>
            </Suspense>
        </main>
    );
};

export default HomePage;
