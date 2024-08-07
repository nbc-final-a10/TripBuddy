'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type DateSearchMainPageProps = {
    defaultStartDate: string;
    defaultEndDate: string;
};

const DateSearchButton: React.FC<DateSearchMainPageProps> = ({
    defaultStartDate,
    defaultEndDate,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    useEffect(() => {
        const startDateParam = searchParams.get('startDate');
        const endDateParam = searchParams.get('endDate');
        if (startDateParam && endDateParam) {
            setStartDate(startDateParam);
            setEndDate(endDateParam);
        }
    }, [searchParams]);

    const handleClick = () => {
        router.push('/search/date');
    };

    return (
        <div className="xl:w-[300px] bg-grayscale-color-85 py-1.5 pl-10 rounded-2xl flex box-border">
            <button onClick={handleClick}>
                <div className="absolute left-8 top-[227px] xl:top-[164px] transform -translate-y-1/2 xl:top-[164px] xl:left-3 xl:left-[643px]">
                    <Image
                        src="/svg/Date.svg"
                        alt="Place"
                        width={20}
                        height={20}
                    />
                </div>
                <span>
                    {startDate} ~ {endDate}
                </span>
            </button>
        </div>
    );
};

export default DateSearchButton;
