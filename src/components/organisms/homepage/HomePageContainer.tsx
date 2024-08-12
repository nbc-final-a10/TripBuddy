'use client';

import HomePageSearchBar from './HomePageSearchBar';
import HomePageStories from '@/components/molecules/homepage/HomePageStories';
import HomePageTrips from '@/components/molecules/homepage/HomePageTrips';
import React, { useEffect, useMemo, useRef } from 'react';
import HomePageTitle from '@/components/molecules/homepage/HomePageTitle';
import HomePageRecommendBuddiesList from './HomePageRecommendBuddiesList';
import Navigate from '@/components/atoms/common/Navigate';
import { showAlert } from '@/utils/ui/openCustomAlert';
import filterOldTrips from '@/utils/trips/filterOldTrips';
import { TripWithContract } from '@/types/Trips.types';
import { useHomeQueries } from '@/hooks/queries';
import { useAuth, useTapScroll } from '@/hooks';

const HomePageContainer = () => {
    const buddiesRef = useRef<HTMLDivElement>(null);
    const storiesRef = useRef<HTMLDivElement>(null);
    const tripsRef = useRef<HTMLDivElement>(null);

    const { createScrollLeft, createScrollRight } =
        useTapScroll({
            refs: [buddiesRef, storiesRef, tripsRef],
        }) ?? {};

    const { buddy } = useAuth();
    const queries = useHomeQueries();

    const [buddies, trips, stories] = queries;

    useEffect(() => {
        queries.forEach(query => {
            if (query.error) showAlert('error', query.error.message);
        });
    }, [queries]);

    const upcomingTrips = useMemo(() => {
        if (!trips.data) return [];
        return filterOldTrips(trips.data.trips as TripWithContract[]);
    }, [trips]);

    // if (queries.some(query => query.isPending)) return <DefaultLoader />;

    return (
        <div className="rounded-t-[32px] bg-white p-4 z-10 relative">
            <HomePageSearchBar />
            <div className="mt-4 mb-2 relative z-10">
                <HomePageTitle
                    title="추천 인기 버디즈"
                    buttonText="전체보기"
                    description="버디즈에게 가장 인기있는 버디즈예요!"
                    href="/profile/rank"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={buddiesRef}
                >
                    {buddies.data?.buddies && (
                        <HomePageRecommendBuddiesList
                            buddies={buddies.data?.buddies}
                        />
                    )}
                </div>
                {createScrollLeft && createScrollRight && (
                    <>
                        <Navigate
                            mode="before"
                            onClick={createScrollLeft(buddiesRef)}
                            className="top-[73%]"
                        />
                        <Navigate
                            mode="after"
                            onClick={createScrollRight(buddiesRef)}
                            className="top-[73%]"
                        />
                    </>
                )}
            </div>

            <div className="mt-4 mb-2 relative z-10">
                <HomePageTitle
                    title="인기 스토리"
                    buttonText="전체보기"
                    description="버디즈의 스토리를 확인하세요!"
                    href="/stories"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden relative flex gap-[10px] z-10"
                    ref={storiesRef}
                >
                    {stories.data?.stories && (
                        <HomePageStories
                            stories={stories.data?.stories}
                            buddy={buddy || null}
                        />
                    )}
                </div>
                {createScrollLeft && createScrollRight && (
                    <>
                        <Navigate
                            mode="before"
                            onClick={createScrollLeft(storiesRef)}
                        />
                        <Navigate
                            mode="after"
                            onClick={createScrollRight(storiesRef)}
                        />
                    </>
                )}
            </div>

            <div className="mt-4 mb-5 relative z-10">
                <HomePageTitle
                    title="지금 모집중인 여정"
                    buttonText="전체보기"
                    description="함께 여행할 버디즈를 찾아보세요!"
                    href="/trips"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={tripsRef}
                >
                    {upcomingTrips.length > 0 && (
                        <HomePageTrips
                            trips={upcomingTrips as TripWithContract[]}
                        />
                    )}
                </div>
                {createScrollLeft && createScrollRight && (
                    <>
                        <Navigate
                            mode="before"
                            onClick={createScrollLeft(tripsRef)}
                        />
                        <Navigate
                            mode="after"
                            onClick={createScrollRight(tripsRef)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePageContainer;
