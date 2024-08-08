'use client';

import Loading from '@/app/(providers)/loading';
import TripCard from '@/components/molecules/trips/TripCard';
import useTripsQuery from '@/hooks/queries/useTripsQuery';
import React from 'react';

const TripList: React.FC = () => {
    const { data: trips, isPending, error } = useTripsQuery();

    // 추후변경요망
    if (error) return <div>Error</div>;
    if (isPending) return <Loading />;
    if (!trips) return <div>No trips</div>;

    return (
        <section className="w-full flex justify-start items-center min-h-dvh pt-4 mb-10 xl:pt-0">
            <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-4 gap-3">
                {trips.map(trip => (
                    <TripCard key={trip.trip_id} trip={trip} mode="list" />
                ))}
            </div>
        </section>
    );
};

export default TripList;
