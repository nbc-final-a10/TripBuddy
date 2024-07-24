'use client';

import HomePageSearchBar from '@/components/atoms/HomePageSearchBar';
import HomePageBuddies from '@/components/molecules/homepage/HomePageBuddies';
import HomePageStories from '@/components/molecules/homepage/HomePageStories';
import HomePageTrips from '@/components/molecules/homepage/HomePageTrips';
import React, { useRef } from 'react';
import useTapScroll from '@/hooks/useTapScroll';
import HomePageTitle from '@/components/molecules/homepage/HomePageTitle';

const HomePageContainer = () => {
    const buddiesRef = useRef<HTMLDivElement>(null);
    const storiesRef = useRef<HTMLDivElement>(null);
    const tripsRef = useRef<HTMLDivElement>(null);

    const { createMouseDownHandler } = useTapScroll();

    return (
        <div className="rounded-t-[32px] bg-white p-4">
            <HomePageSearchBar />

            <div className="mt-4 mb-2">
                <HomePageTitle
                    title="추천 인기 버디즈"
                    buttonText="전체보기"
                    description="버디즈에게 가장 인기있는 버디즈예요!"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={buddiesRef}
                    onMouseDown={createMouseDownHandler(buddiesRef)}
                >
                    <HomePageBuddies />
                </div>
            </div>

            <div className="mt-4 mb-2">
                <HomePageTitle
                    title="인기 스토리"
                    buttonText="전체보기"
                    description="버디즈의 스토리를 확인하세요!"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={storiesRef}
                    onMouseDown={createMouseDownHandler(storiesRef)}
                >
                    <HomePageStories />
                </div>
            </div>

            <div className="mt-4 mb-2">
                <HomePageTitle
                    title="지금 모집중인 여정"
                    buttonText="전체보기"
                    description="함께 여행할 버디즈를 찾아보세요!"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={tripsRef}
                    onMouseDown={createMouseDownHandler(tripsRef)}
                >
                    <HomePageTrips />
                </div>
            </div>
        </div>
    );
};

export default HomePageContainer;