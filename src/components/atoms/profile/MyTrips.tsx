'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAccordion, Accordion } from '@/hooks/useAccordion';
import { BuddyProfileProps } from '@/types/ProfileParams.types';
import { FaCalendarCheck, FaPen } from 'react-icons/fa';
import TripCard from '@/components/molecules/trips/TripCard';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { Trip } from '@/types/Trips.types';
import useTapScroll from '@/hooks/useTapScroll';
import { ContractWithTrips } from '@/types/Contract.types';

export default function MyTrips({ id }: BuddyProfileProps) {
    const participatingAccordion = useAccordion();
    const createdAccordion = useAccordion();
    const [trips, setTrips] = useState<{
        created: Trip[];
        participated: ContractWithTrips[];
    }>({ created: [], participated: [] });

    const createdTripsRef = useRef<HTMLDivElement>(null);
    const participatingTripsRef = useRef<HTMLDivElement>(null);

    const { createMouseDownHandler } = useTapScroll();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await fetchWrapper<{
                    created: Trip[];
                    participated: ContractWithTrips[];
                }>(`/api/trips/my/${id}`, {
                    method: 'GET',
                });
                setTrips(data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [id]);

    return (
        <div className="p-4 bg-gray-100 rounded-xl">
            <Accordion
                title="내가 만든 여정"
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
                icon={<FaPen />}
            >
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={createdTripsRef}
                    onMouseDown={createMouseDownHandler(createdTripsRef)}
                >
                    {trips.created.map(trip => (
                        <TripCard key={trip.trip_id} trip={trip} mode="card" />
                    ))}
                </div>
            </Accordion>
            <Accordion
                title="내가 참여한 여정"
                isOpen={participatingAccordion.isOpen}
                toggleAccordion={participatingAccordion.toggleAccordion}
                icon={<FaCalendarCheck />}
            >
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={participatingTripsRef}
                    onMouseDown={createMouseDownHandler(participatingTripsRef)}
                >
                    {trips.participated.map(contract => (
                        <TripCard
                            key={contract.trips.trip_id}
                            trip={contract.trips}
                            mode="card"
                        />
                    ))}
                </div>
            </Accordion>
        </div>
    );
}
