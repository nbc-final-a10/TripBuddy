'use client';

import SearchBar from '@/components/atoms/M_SearchBar';
import MainPageBuddies from '@/components/molecules/mainpage/MainPageBuddies';
import MainPageStories from '@/components/molecules/mainpage/MainPageStories';
import MainPageTrips from '@/components/molecules/mainpage/MainPageTrips';
import React, { useRef } from 'react';
import useTapScroll from '@/hooks/useTapScroll';
import MainPageTitle from '@/components/molecules/mainpage/MainPageTitle';

const MainPageContainer = () => {
    const buddiesRef = useRef<HTMLDivElement>(null);
    const storiesRef = useRef<HTMLDivElement>(null);
    const tripsRef = useRef<HTMLDivElement>(null);

    const { createMouseDownHandler } = useTapScroll();

    return (
        <div className="rounded-t-[32px] bg-white p-4">
            <SearchBar />

            <div className="mt-4 mb-2">
                <MainPageTitle
                    title="추천 인기 버디즈"
                    buttonText="전체보기"
                    description="버디즈에게 가장 인기있는 버디즈예요!"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={buddiesRef}
                    onMouseDown={createMouseDownHandler(buddiesRef)}
                >
                    <MainPageBuddies />
                </div>
            </div>

            <div className="mt-4 mb-2">
                <MainPageTitle
                    title="인기 스토리"
                    buttonText="전체보기"
                    description="버디즈의 스토리를 확인하세요!"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={storiesRef}
                    onMouseDown={createMouseDownHandler(storiesRef)}
                >
                    <MainPageStories />
                </div>
            </div>

            <div className="mt-4 mb-2">
                <MainPageTitle
                    title="지금 모집중인 여정"
                    buttonText="전체보기"
                    description="함께 여행할 버디즈를 찾아보세요!"
                />
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={tripsRef}
                    onMouseDown={createMouseDownHandler(tripsRef)}
                >
                    <MainPageTrips />
                </div>
            </div>
        </div>
    );
};

export default MainPageContainer;
