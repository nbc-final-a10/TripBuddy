'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type DateSearchMainPageProps = {
    startDate: string;
    endDate: string;
};

const DateSearchButton: React.FC<DateSearchMainPageProps> = ({
    startDate,
    endDate,
}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/search/date');
    };

    return (
        <div className="xl:w-[300px] bg-gray-200 py-1.5 pl-10 rounded-2xl flex box-border">
            <button onClick={handleClick}>
                <div className="absolute left-8 top-[227px] xl:top-[164px] transform -translate-y-1/2 xl:top-[164px] xl:left-3 xl:left-[643px]">
                    <Image
                        src="/svg/Date.svg"
                        alt="Place"
                        width={20}
                        height={20}
                    />
                </div>
                {startDate} ~ {endDate}
            </button>
        </div>
    );
};

export default DateSearchButton;
