'use client';

import Image from 'next/image';
import React from 'react';

type LocationSearchMainPageProps = {
    onClick: () => void;
};

const LocationSearchButton: React.FC<LocationSearchMainPageProps> = ({
    onClick,
}) => {
    return (
        <button onClick={onClick}>
            <div className="absolute left-8 top-[173px] xl:top-[164px] transform -translate-y-1/2 xl:top-[164px] xl:left-3 xl:left-[333px]">
                <Image
                    src="/svg/Place.svg"
                    alt="Place"
                    width={20}
                    height={20}
                />
            </div>
            지역, 국가를 찾아보세요
        </button>
    );
};

export default LocationSearchButton;
