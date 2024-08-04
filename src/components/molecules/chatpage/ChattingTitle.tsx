'use client';

import { Trip } from '@/types/Trips.types';
import supabase from '@/utils/supabase/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type ChattingTitleProps = {
    id: string;
};

const ChattingTitle: React.FC<ChattingTitleProps> = ({ id }) => {
    const [tripData, setTripData] = useState<Trip | null>(null);

    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const { data, error } = await supabase
                    .from('trips')
                    .select('*')
                    .eq('trip_id', id)
                    .single();

                if (error) {
                    throw error;
                }

                setTripData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTripData();
    }, [id]);
    return (
        <section className="relative">
            <div className="border-y-[1px] border-gray-200 px-6 py-2 mb-4">
                <div className="flex items-center">
                    <div className="w-[40px] h-[40px] flex items-center justify-center">
                        {tripData?.trip_thumbnail ? (
                            <Image
                                src={tripData.trip_thumbnail}
                                width={40}
                                height={40}
                                alt="Trip Thumbnail"
                            />
                        ) : (
                            <div className="w-[40px] h-[40px] bg-gray-200 "></div>
                        )}
                    </div>
                    <div className="h-[40px] px-3 flex flex-col justify-between">
                        <p className="text-sm font-bold">
                            {tripData?.trip_title}
                        </p>
                        <div className="text-xs flex gap-6">
                            <span>{tripData?.trip_final_destination}</span>
                            <span>{tripData?.trip_start_date}</span>
                            <span>3/4명</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChattingTitle;
