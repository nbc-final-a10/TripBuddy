import TripCard from '@/components/molecules/trips/TripCard';
import React from 'react';

const TripsDetailPage: React.FC = () => {
    return (
        <div>
            <div></div>
            <TripCard
                title={`Trip 123123`}
                description={`Description 123123`}
                date="2022-01-01"
                location="Seoul"
                participants="10"
                mode="detail"
            />
        </div>
    );
};

export default TripsDetailPage;
