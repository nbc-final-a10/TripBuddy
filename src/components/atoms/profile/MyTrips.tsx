'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaCalendarCheck, FaPen } from 'react-icons/fa';
import TripCard from '@/components/molecules/trips/TripCard';
import fetchWrapper from '@/utils/api/fetchWrapper';
import {
    ContractWithTripsWithContract,
    MyTripsAndContracts,
} from '@/types/Contract.types';
import { Accordion, useAccordion, useTapScroll } from '@/hooks';

type MyTripsProps = {
    id: string;
};

export default function MyTrips({ id }: MyTripsProps) {
    const participatingAccordion = useAccordion();
    const createdAccordion = useAccordion();
    const [trips, setTrips] = useState<MyTripsAndContracts>({
        created: [],
        participated: [],
    });

    const createdTripsRef = useRef<HTMLDivElement>(null);
    const participatingTripsRef = useRef<HTMLDivElement>(null);

    useTapScroll({
        refs: [createdTripsRef, participatingTripsRef],
    });

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

        fetchTrips();
    }, [id]);

    // console.log(trips);

    return (
        <div className="p-2 bg-gray-100 rounded-xl">
            <Accordion
                title={'만든 여정'}
                isOpen={createdAccordion.isOpen}
                toggleAccordion={createdAccordion.toggleAccordion}
                icon={<FaPen />}
            >
                {trips.created.length > 0 ? (
                    <div
                        className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                        ref={createdTripsRef}
                    >
                        {trips.created.map(trip => (
                            <TripCard
                                key={trip.trip_id}
                                trip={trip}
                                mode="card"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        만든 여정이 없습니다.
                    </div>
                )}
            </Accordion>
            <Accordion
                title={'참여한 여정'}
                isOpen={participatingAccordion.isOpen}
                toggleAccordion={participatingAccordion.toggleAccordion}
                icon={<FaCalendarCheck />}
            >
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={participatingTripsRef}
                >
                    {trips.participated.length > 0 ? (
                        trips.participated.map((contract, index) => {
                            // const contractWithTrips =
                            //     contract as ContractWithTripsWithContract;
                            // contractWithTrips.trips.contract =
                            //     trips.participated;

                            return (
                                <TripCard
                                    key={contract.trip_id}
                                    trip={contract}
                                    mode="card"
                                />
                            );
                        })
                    ) : (
                        <div className="text-center text-gray-500">
                            참여한 여정이 없습니다.
                        </div>
                    )}
                </div>
            </Accordion>
        </div>
    );
}
