'use client';

import React, { useEffect, useState } from 'react';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { MyTripsAndContracts } from '@/types/Contract.types';
import CreatedTrips from '@/components/molecules/profile/myTrips/CreatedTrips';
import ParticipatedTrips from '@/components/molecules/profile/myTrips/ParticipatedTrips';
import { useParams } from 'next/navigation';
import BookmarkedTrips from '@/components/molecules/profile/myTrips/BookmarkedTrips';

export default function MyTrips() {
    const { id } = useParams<{ id: string }>();
    const [trips, setTrips] = useState<MyTripsAndContracts>({
        created: [],
        participated: [],
        bookmarked: [],
    });

    const [view, setView] = useState<string | null>(null);

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

        const queryParams = new URLSearchParams(window.location.search);
        const viewParam = queryParams.get('view');
        setView(viewParam);
    }, [id]);

    return (
        <>
            {/* TODO: BookmarkedTrips는 최초 와이어프레임에 없던 지라 MyTripsAndContracts에서
            대응하지 못해 데이터를 직접 하달하고 있는데 리팩토링 필요함 */}
            {/* TODO: CreatedTrips, ParticipatedTrips 스켈레톤 처리 */}
            {view === 'created' ? (
                <CreatedTrips created={trips.created} />
            ) : view === 'participated' ? (
                <ParticipatedTrips participated={trips.participated} />
            ) : view === 'bookmarked' ? (
                <BookmarkedTrips currentUserId={id as string} />
            ) : null}
        </>
    );
}
