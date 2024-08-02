'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import Image from 'next/image';
import supabase from '@/utils/supabase/client';

type Trip = {
    trip_final_destination: string;
    trip_start_date: string;
    trip_id: string;
};

const HomePageBanner = () => {
    const { buddy } = useAuth();
    const [expectedTrip, setExpectedTrip] = useState<Trip | null>(null);
    const [daysLeft, setDaysLeft] = useState<number | null>(null);
    const [randomImgSrc, setRandomImgSrc] = useState<string>('');

    useEffect(() => {
        if (buddy) {
            const fetchRecentTrip = async () => {
                try {
                    const { data: contractsData, error: contractsError } =
                        await supabase
                            .from('contract')
                            .select('contract_trip_id')
                            .eq('contract_buddy_id', buddy.buddy_id);

                    if (contractsError) {
                        throw contractsError;
                    }

                    if (contractsData && contractsData.length > 0) {
                        const contractTripIds = contractsData.map(
                            contract => contract.contract_trip_id,
                        );

                        const { data: tripData, error: tripError } =
                            await supabase
                                .from('trips')
                                .select(
                                    'trip_id, trip_start_date, trip_final_destination',
                                )
                                .in('trip_id', contractTripIds)
                                .order('trip_start_date', { ascending: false })
                                .limit(1)
                                .single();

                        if (tripError) {
                            throw tripError;
                        }

                        if (tripData) {
                            setExpectedTrip(tripData);
                            const startDate = new Date(
                                tripData.trip_start_date,
                            );
                            const today = new Date();

                            const todayStart = new Date(
                                today.getFullYear(),
                                today.getMonth(),
                                today.getDate(),
                            );
                            const startDateStart = new Date(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate(),
                            );

                            const timeDiff =
                                startDateStart.getTime() - todayStart.getTime();
                            const daysDiff = Math.ceil(
                                timeDiff / (1000 * 3600 * 24),
                            );
                            setDaysLeft(daysDiff);
                        }
                    } else {
                        console.log('No contracts found for the buddy');
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error(
                            'Error fetching trip data:',
                            error.message,
                        );
                    } else {
                        console.error('An unknown error occurred:', error);
                    }
                }
            };

            fetchRecentTrip();
        }
    }, [buddy]);

    useEffect(() => {
        const bannerImgs = [
            'test_city.jpg',
            'test_city2.jpg',
            'test_banner1.webp',
            'test_banner2.webp',
            'test_banner3.webp',
        ];
        const randomImg =
            bannerImgs[Math.floor(Math.random() * bannerImgs.length)];
        setRandomImgSrc(`/images/${randomImg}`);
    }, []);

    return (
        <div className="relative h-[200px] z-0">
            <div className="relative text-left font-semibold text-2xl px-4 py-8 h-[230px] flex flex-col justify-end aspect-auto z-0">
                <Image
                    src={randomImgSrc}
                    alt="banner"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 33vw"
                    className="object-cover relative z-0"
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="relative z-20 text-white h-full flex flex-col justify-center gap-3">
                    {expectedTrip ? (
                        <>
                            <p>
                                <span className="font-bold text-3xl">
                                    {buddy?.buddy_nickname}
                                </span>
                                님,
                            </p>
                            <p>
                                예정된 {expectedTrip.trip_final_destination}{' '}
                                여행이
                            </p>
                            <p>
                                <span className="font-bold text-3xl">
                                    {daysLeft}
                                </span>
                                일 남았어요!
                            </p>
                        </>
                    ) : (
                        <p>아직 여행 일정이 없군요!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePageBanner;
