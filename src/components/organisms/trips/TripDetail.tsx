'use client';

import DefaultLoader from '@/components/atoms/common/defaultLoader';
import TripCard from '@/components/molecules/trips/TripCard';
import useTripQuery from '@/hooks/queries/useTripQuery';
import { Trip } from '@/types/Trips.types';
import Image from 'next/image';
import React from 'react';

type TripDetailProps = {
    id: string;
};

const TripDetail: React.FC<TripDetailProps> = ({ id }) => {
    const { data: trip, isPending, error: tripError } = useTripQuery(id);

    if (isPending) return <DefaultLoader />;
    if (tripError) return <div>Error: {tripError.message}</div>;

    // 마스터 아이디로 유저 찾아오는 로직 추가할 것

    return (
        <div className="flex flex-col gap-2 bg-gray-100">
            {/** 이미지 + 여행정보 묶음 영역 */}
            <div className="relative h-full flex flex-col">
                {/** 이미지 영역 */}
                <div className="h-[217px] bg-gray-40 relative aspect-auto">
                    <Image
                        //src={trip.trip_image}
                        src="/images/test_city2.jpg"
                        alt="trip image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"
                        className="object-cover"
                    />
                </div>
                {/** 여행 정보 영역 */}
                <TripCard trip={trip} mode="detail" />
            </div>

            {/** 글쓴이 정보 영역 */}
            <div className="flex items-center bg-white gap-2 h-[217px]"></div>

            {/** 글 내용 */}
            <div className="flex flex-col bg-white gap-2 h-[217px] p-4">
                <p className="text-gray-950 text-center">
                    어쩌구 저쩌구 글입니다 어쩌구 저쩌구 글입니다 어쩌구 저쩌구
                    글입니다
                </p>

                <h3 className="text-gray-950 text-xl font-bold">
                    추천인기 버디즈
                </h3>
            </div>
        </div>
    );
};

export default TripDetail;
