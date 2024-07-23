'use client';

import SearchBar from '@/components/atoms/M_SearchBar';
import MainPageBuddies from '@/components/molecules/mainpage/MainPageBuddies';
import MainPageStories from '@/components/molecules/mainpage/MainPageStories';
import MainPageTrips from '@/components/molecules/mainpage/MainPageTrips';
import React, { useRef } from 'react';

const MainPageContainer = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        const container = scrollContainerRef.current;
        if (container) {
            const startX = event.pageX - container.offsetLeft;
            const scrollLeft = container.scrollLeft;

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const x = moveEvent.pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // 스크롤 속도 조정
                container.scrollLeft = scrollLeft - walk;
            };

            const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    };

    return (
        <div className="rounded-t-[32px] bg-white p-4">
            <SearchBar />
            <div className="mt-4 mb-2">
                <div>
                    <p className="text-lg font-bold">추천 인기 버디즈</p>
                    <p className="text-sm">
                        버디즈에게 가장 인기있는 버디즈예요!
                    </p>
                </div>
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                >
                    <MainPageBuddies />
                </div>
            </div>
            <div className="mt-4 mb-2">
                <div>
                    <p className="font-bold">인기 스토리</p>
                    <p>버디즈의 스토리를 확인하세요!</p>
                </div>
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                >
                    <MainPageStories />
                </div>
            </div>
            <div className="mt-4 mb-2">
                <div>
                    <p className="font-bold">지금 모집중인 여정</p>
                    <p>함께 여행할 버디즈를 찾아보세요!</p>
                </div>
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                >
                    <MainPageTrips />
                </div>
            </div>
        </div>
    );
};

export default MainPageContainer;
