import TripCard from '@/components/molecules/trips/TripCard';
import React from 'react';

const TripsPage: React.FC = () => {
    return (
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-4 px-4 py-4 xl:px-0">
            {Array.from({ length: 10 }, (_, index) => (
                <TripCard
                    key={index}
                    title={`Trip ${index}`}
                    description={`Description ${index}`}
                    date="2022-01-01"
                    location="Seoul"
                    participants="10"
                    mode="card"
                    counts={3}
                />
            ))}
        </section>
    );
};

export default TripsPage;
