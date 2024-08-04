'use client';

import React from 'react';

type LocationSearchMainPageProps = {
    onClick: () => void;
};

const LocationSearchButton: React.FC<LocationSearchMainPageProps> = ({
    onClick,
}) => {
    return (
        <button
            className="w-full bg-gray-100 p-2 rounded-xl text-left text-gray-400"
            onClick={onClick}
        >
            지역, 국가를 찾아보세요
        </button>
    );
};

export default LocationSearchButton;
