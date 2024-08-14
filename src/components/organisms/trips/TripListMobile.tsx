'use client';

import LoaderOnly from '@/components/atoms/common/LoaderOnly';
import InfiniteScroll from '@/components/molecules/common/InfiniteScroll';
import { useTripInfiniteQuery } from '@/hooks/queries';
import React from 'react';
import TripCard from './TripCard';

const TripListMobile: React.FC = () => {
    const {
        data: tripsInfinite,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useTripInfiniteQuery();

    // 추후수정요망
    if (!tripsInfinite) return <div>No trips</div>;

    return (
        <section className="w-full flex flex-col justify-center items-center h-auto pt-4">
            {/* <div className="w-full justify-end items-center hidden xl:flex">
                <button className="flex justify-between items-center border-1 border-black rounded-md p-1">
                    <select className="w-full focus:outline-none">
                        <option value="popular">인기순</option>
                        <option value="latest">최신순</option>
                    </select>
                </button>
            </div> */}

            <div className="grid w-full mx-auto place-items-center grid-cols-1 xl:grid-cols-4 gap-3 pb-28">
                <InfiniteScroll
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                >
                    {tripsInfinite.map(item => (
                        <TripCard key={item.trip_id} trip={item} mode="list" />
                    ))}
                    {isFetching && (
                        <div className="w-full h-20 flex justify-center items-center">
                            <LoaderOnly />
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        </section>
    );
};

export default TripListMobile;
