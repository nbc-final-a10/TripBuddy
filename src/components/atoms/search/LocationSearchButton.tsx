'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type LocationSearchMainPageProps = {
    onClick: () => void;
    location?: string | null;
};

const LocationSearchButton: React.FC<LocationSearchMainPageProps> = ({
    onClick,
    location,
}) => {
    const router = useRouter();

    const handleClick = () => {
        // 현재 URL 쿼리 파라미터를 가져옴
        const currentQuery = new URLSearchParams(window.location.search);
        if (location) {
            // 현재 선택 장소를 쿼리 파라미터에 추가
            currentQuery.set('location', location);
        } else {
            currentQuery.delete('location');
        }

        // 페이지를 이동할 때 쿼리 파라미터를 포함한다
        router.push(`/search/location?${currentQuery.toString()}`);
    };

    return (
        <div className="xl:w-[300px] bg-grayscale-color-85 py-1.5 pl-10 rounded-2xl flex box-border">
            <button onClick={handleClick}>
                <div className="absolute left-8 top-[173px] xl:top-[164px] transform -translate-y-1/2 xl:top-[164px] xl:left-3 xl:left-[333px]">
                    <Image
                        src="/svg/Place.svg"
                        alt="Place"
                        width={20}
                        height={20}
                    />
                </div>
                <span>
                    {location
                        ? `현재 선택된 장소: ${location}`
                        : '지역, 국가를 찾아보세요'}
                </span>
            </button>
        </div>
    );
};

export default LocationSearchButton;
