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
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    // 날짜 포맷 함수
    const formatDate = (date: Date) => {
        if (isNaN(date.getTime())) return 'Invalid date';
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[date.getDay()];
        return `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} (${dayOfWeek})`;
    };

    // 기본 날짜 설정 함수
    // 함수가 변경되지 않게. 무한 렌더링 방지
    const getFormattedDate = useCallback((offsetDays: number) => {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);
        return formatDate(date);
    }, []);

    useEffect(() => {
        const today = getFormattedDate(0);
        const tomorrow = getFormattedDate(1);

        const startDateParam = searchParams.get('startDate');
        const endDateParam = searchParams.get('endDate');

        // 날짜 유효성 검사 함수
        const isValidDate = (dateStr: string) => {
            const date = new Date(dateStr);
            return !isNaN(date.getTime());
        };

        if (
            startDateParam &&
            endDateParam &&
            isValidDate(startDateParam) &&
            isValidDate(endDateParam)
        ) {
            setStartDate(startDateParam);
            setEndDate(endDateParam);
        } else {
            setStartDate(today);
            setEndDate(tomorrow);
        }
    }, [searchParams, getFormattedDate]);

    // 날짜 변경 시 호출되는 useEffect
    useEffect(() => {
        setDateChange(startDate, endDate);
    }, [startDate, endDate, setDateChange]);

    // 날짜 유효성 검사 함수
    const isValidDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
    };

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
