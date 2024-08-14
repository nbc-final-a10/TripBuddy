'use client';

import LoaderOnly from '@/components/atoms/common/LoaderOnly';
import InfiniteScroll from '@/components/molecules/common/InfiniteScroll';
import { useTripInfiniteQuery } from '@/hooks/queries';
import React, { useMemo, useState } from 'react';
import TripCard from './TripCard';
import { TripWithContract } from '@/types/Trips.types';
import filterTripList from '@/utils/trips/filterTripList';

const TripListMobile: React.FC = () => {
    const [filter, setFilter] = useState('latest');
    const {
        data: tripsInfinite,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useTripInfiniteQuery();

    const filteredTrips = useMemo(
        () => filterTripList(tripsInfinite, filter),
        [tripsInfinite, filter],
    );

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const selectedValue = event.target.value;
        setFilter(selectedValue);
    };

    // 추후수정요망
    if (!tripsInfinite) return <div>No trips</div>;
    if (!filteredTrips) return <div>No filtered trips</div>;

    return (
        <section className="w-full flex flex-col justify-center items-center h-auto pt-4">
            <button className="flex justify-between items-center border-1 border-black rounded-md p-1">
                <select
                    className="w-full focus:outline-none"
                    value={filter}
                    onChange={handleSelectChange}
                >
                    <option value="latest">최신순</option>
                    <option value="bookmark">인기순</option>
                    <option value="imminent">마감임박순</option>
                    <option value="deadline">마감여유순</option>
                </select>
            </button>

            <div className="grid w-full mx-auto place-items-center grid-cols-1 xl:grid-cols-4 gap-3 pb-28">
                <InfiniteScroll
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                >
                    {filteredTrips.map(item => (
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
