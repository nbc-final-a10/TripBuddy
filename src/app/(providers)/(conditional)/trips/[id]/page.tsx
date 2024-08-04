import TripDetail from '@/components/organisms/trips/TripDetail';
import React from 'react';

type TripDetailPageProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const TripsDetailPage: React.FC<TripDetailPageProps> = ({
    params,
    searchParams,
}) => {
    const { id } = params;

    return <TripDetail id={id} />;
};

export default TripsDetailPage;
