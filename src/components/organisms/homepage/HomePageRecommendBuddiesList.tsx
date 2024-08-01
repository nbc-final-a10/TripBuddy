import MascotImage from '@/components/atoms/common/O_MascotImage';
import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import SkeletonLoader from '@/components/atoms/profile/SkeletonLoader';
import useTapScroll from '@/hooks/useTapScroll';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Buddy } from '@/types/Auth.types';

function HomePageRecommnedBuddiesList() {
    const buddiesRef = useRef<HTMLDivElement>(null);
    const { createMouseDownHandler } = useTapScroll();
    const [loading, setLoading] = useState(true);
    const [buddies, setBuddies] = useState<Buddy[] | null>(null);

    useEffect(() => {
        const fetchBuddies = async () => {
            try {
                const response = await fetch(
                    '/api/buddyProfile/buddiesRecommendationList',
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
                                  <Link
                                      key={index}
                                      href={`/profile/${buddy.buddy_id}`}
                                      passHref
                                  >
                                      <div className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 cursor-pointer flex items-center">
                                          <div className="flex items-center justify-center w-full h-full">
                                              <div className="flex-shrink-0 w-[75px] h-[75px] flex items-center justify-center">
                                                  {buddy.buddy_profile_pic ? (
                                                      <Image
                                                          src={
                                                              buddy.buddy_profile_pic
                                                          }
                                                          alt="profile"
                                                          width={60}
                                                          height={60}
                                                          className="rounded-lg w-[60px] h-[60px]"
                                                      />
                                                  ) : (
                                                      <MascotImage intent="happy" />
                                                  )}
                                              </div>
                                              <div className="mx-1 flex flex-col w-full">
                                                  <span className="text-xs font-bold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                                                      {buddy.buddy_preferred_buddy1 &&
                                                      buddy.buddy_preferred_buddy2
                                                          ? `#${buddy.buddy_preferred_buddy1} #${buddy.buddy_preferred_buddy2}`
                                                          : '#태그없음'}
                                                  </span>
                                                  <div className="text-m font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                                      <span className="block truncate">
                                                          {buddy.buddy_nickname}
                                                      </span>
                                                  </div>

                                                  <div className="w-full">
                                                      <BuddyTemperature
                                                          isLabel={false}
                                                          isTempText={false}
                                                          temperature={
                                                              buddy.buddy_temperature
                                                          }
                                                      />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </Link>
                              ))
                            : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePageRecommnedBuddiesList;
