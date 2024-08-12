'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

type DateSearchMainPageProps = {
    defaultStartDate: string;
    defaultEndDate: string;
    setDateChange: (start: string, end: string) => void;
};

const DateSearchButton: React.FC<DateSearchMainPageProps> = ({
    defaultStartDate,
    defaultEndDate,
    setDateChange,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [startDate, setStartDate] = useState<string>(defaultStartDate);
    const [endDate, setEndDate] = useState<string>(defaultEndDate);

    // 날짜 포맷 함수 ('00.00.00(요일)' 형식)
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return '00.00.00(일)';

        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[date.getDay()];
        return `${date.getFullYear().toString().slice(-2)}.${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(
                2,
                '0',
            )}.${date.getDate().toString().padStart(2, '0')} (${dayOfWeek})`;
    };

    // searchParams 변경될 시 startDate, endDate를 업데이트
    useEffect(() => {
        const startDateParam = searchParams.get('startDate');
        const endDateParam = searchParams.get('endDate');

        // 새로운 날짜 들어오면 업데이트, setDateChange 호출
        if (startDateParam && endDateParam) {
            setStartDate(startDateParam);
            setEndDate(endDateParam);
            setDateChange(startDateParam, endDateParam);
        }
    }, [searchParams, setDateChange]);

    const handleClick = () => {
        // URLSearchParams로 쿼리 파라미터 구성
        const query = new URLSearchParams();
        if (defaultStartDate) query.set('startDate', defaultStartDate);
        if (defaultEndDate) query.set('endDate', defaultEndDate);
        router.push(`/search/date?${query.toString()}`);
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
                    {formatDate(startDate)} ~ {formatDate(endDate)}
                </span>
            </button>
        </div>
    );
};

export default DateSearchButton;
