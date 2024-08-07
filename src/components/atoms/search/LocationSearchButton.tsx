'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type LocationSearchMainPageProps = {
    onClick: () => void;
};

const LocationSearchButton: React.FC<LocationSearchMainPageProps> = ({
    onClick,
}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/search/location');
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
                <span>지역, 국가를 찾아보세요</span>
            </button>
        </div>
    );
};

export default LocationSearchButton;
