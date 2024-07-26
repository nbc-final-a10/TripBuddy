import TripCard from '@/components/molecules/trips/TripCard';
import React from 'react';

type TripDetailPageProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const TripsDetailPage: React.FC<TripDetailPageProps> = ({
    params,
    searchParams,
}) => {
    return (
        <div className="flex flex-col gap-2 bg-gray-100">
            {/** 이미지 + 여행정보 묶음 영역 */}
            <div>
                {/** 이미지 영역 */}
                <div className="h-[217px] bg-gray-400"></div>
                {/** 여행 정보 영역 */}
                <TripCard
                    title={`Trip 123123`}
                    description={`Description 123123`}
                    date="2022-01-01"
                    location="Seoul"
                    participants="10"
                    mode="detail"
                />
            </div>

            <div></div>
        </div>
    );
};

export default TripsDetailPage;
