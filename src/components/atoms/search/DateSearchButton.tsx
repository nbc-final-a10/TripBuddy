'use client';

import Image from 'next/image';
import React from 'react';

type DateSearchMainPageProps = {
    onClick: () => void;
    startDate: string;
    endDate: string;
};

const DateSearchButton: React.FC<DateSearchMainPageProps> = ({
    onClick,
    startDate,
    endDate,
}) => {
    return (
        <button onClick={onClick}>
            {' '}
            <div className="absolute left-8 top-[227px] xl:top-[164px] transform -translate-y-1/2 xl:top-[164px] xl:left-3 xl:left-[643px]">
                <Image src="/svg/Date.svg" alt="Place" width={20} height={20} />
            </div>
            {startDate} ~ {endDate}
        </button>
    );
};

export default DateSearchButton;
