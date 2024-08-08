'use client';

import Loading from '@/app/(providers)/loading';
import TripCard from '@/components/molecules/trips/TripCard';
import useTripInfiniteQuery from '@/hooks/queries/useTripInfiniteQuery';
import React from 'react';

const TripList: React.FC = () => {
    const {
        data: trips = [],
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useTripInfiniteQuery();

    // 추후변경요망
    if (isFetching) return <Loading />;
    if (!trips) return <div>No trips</div>;

    return (
        <section className="w-full flex justify-start items-center h-[calc(100dvh-56px-57px)] pt-4 mb-10 xl:h-[calc(100dvh-100px)] xl:pt-0 xl:mb-0">
            <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-4 gap-3">
                {trips.map(trip => (
                    <TripCard key={trip.trip_id} trip={trip} mode="list" />
                ))}
            </div>
        </section>
    );
};

export default TripList;
