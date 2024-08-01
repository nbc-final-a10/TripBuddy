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

const HomePage: React.FC = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_BUDDY, QUERY_KEY_TRIP, QUERY_KEY_STORY],
        queryFn: () => getBuddyTripStory(),
    });
    const dehydratedState = dehydrate(queryClient);
    return (
        <div className="bg-gray-300">
            <section>
                <div className="h-[200px]">
                    <HomePageBanner />
                </div>
                <Suspense fallback={<Loading />}>
                    <HydrationBoundary state={dehydratedState}>
                        <HomePageContainer />
                    </HydrationBoundary>
                </Suspense>
            </section>
        </div>
    );
};

export default HomePage;
