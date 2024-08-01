import { Trip } from '@/types/Trips.types';
import React from 'react';
import TripCard from '../trips/TripCard';

type HomePageTripsProps = {
    trips: Trip[];
};

const HomePageTrips: React.FC<HomePageTripsProps> = ({ trips }) => {
    return (
        <>
            {trips.map(trip => (
                <TripCard
                    key={trip.trip_id}
                    trip={trip}
                    // participants={trip.trip_max_buddies_counts} // 추후변경요망 컨트랙트 참조해야함
                    mode="main"
                />
            ))}
        </>
    );
};

export default HomePageTrips;
