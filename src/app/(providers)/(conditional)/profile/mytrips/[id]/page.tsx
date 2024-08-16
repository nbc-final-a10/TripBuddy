'use client';

import React, { useEffect, useState } from 'react';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { MyTripsAndContracts } from '@/types/Contract.types';
import CreatedTrips from '@/components/molecules/profile/myTrips/CreatedTrips';
import ParticipatedTrips from '@/components/molecules/profile/myTrips/ParticipatedTrips';
import { useParams } from 'next/navigation';

export default function MyTrips() {
    const { id } = useParams();
    const [trips, setTrips] = useState<MyTripsAndContracts>({
        created: [],
        participated: [],
    });

    console.log('id', id);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await fetchWrapper<MyTripsAndContracts>(
                    `/api/trips/my/${id}`,
                    {
                        method: 'GET',
                    },
                );
                setTrips(data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        if (id) {
            fetchTrips();
        }
    }, [id]);

    const queryParams = new URLSearchParams(window.location.search);
    const view = queryParams.get('view');

    return (
        <>
            {view === 'created' ? (
                <CreatedTrips created={trips.created} />
            ) : view === 'participated' ? (
                <ParticipatedTrips participated={trips.participated} />
            ) : null}
        </>
    );
}
