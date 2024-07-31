import MascotImage from '@/components/atoms/common/O_MascotImage';
import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import SkeletonLoader from '@/components/atoms/profile/SkeletonLoader';
import useTapScroll from '@/hooks/useTapScroll';
import React, { useState, useEffect, useRef } from 'react';

type Buddy = {
    buddy_nickname: string;
    buddy_birth: number;
    buddy_temperature: number;
    buddy_preferred_theme1: string;
    buddy_preferred_theme2: string;
    buddy_preferred_theme3: string;
};

function HomePageRecommnedBuddiesList() {
    const buddiesRef = useRef<HTMLDivElement>(null);
    const { createMouseDownHandler } = useTapScroll();
    const [loading, setLoading] = useState(true);
    const [buddies, setBuddies] = useState<Buddy[] | null>(null);

    useEffect(() => {
        const fetchBuddies = async () => {
            try {
                const response = await fetch(
                    '/api/home/BuddiesRecommendationList',
                );
                const data = await response.json();
                console.log(data);
                setBuddies(data.buddies);
                setLoading(false);
            } catch (error) {
                console.error('버디 추천 리스트 통신 오류 발생:', error);
            }
        };
        fetchBuddies();
    }, []);

    return (
        <div className="container">
            {loading ? (
                <div className="flex space-x-4 scrollbar-hide overflow-x-auto">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            ) : (
                <div>
                    <div
                        className="flex overflow-x-auto scrollbar-hide xl:scrollbar-default"
                        onMouseDown={createMouseDownHandler(buddiesRef)}
                    >
                        {buddies
                            ? buddies.map((buddy: Buddy, index: number) => (
                                  <div
                                      key={index}
                                      className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 shadow-md"
                                  >
                                      <div className="flex items-center w-[120px] h-full">
                                          <div className="flex-shrink-0 w-[75px] h-[75px]">
                                              <MascotImage intent="happy" />
                                          </div>
                                          <div className="ml-2 flex flex-col">
                                              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                                                  #
                                                  {buddy.buddy_preferred_theme1}{' '}
                                                  #
                                                  {buddy.buddy_preferred_theme2}{' '}
                                                  #
                                                  {buddy.buddy_preferred_theme3}
                                              </span>
                                              <div className="text-m font-bold whitespace-nowrap">
                                                  <span>
                                                      {buddy.buddy_nickname}
                                                  </span>
                                                  <span> / </span>
                                                  <span>
                                                      {buddy.buddy_birth}세
                                                  </span>
                                              </div>
                                              <div>
                                                  <BuddyTemperature
                                                      isLabel={false}
                                                      isTempText={false}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePageRecommnedBuddiesList;
