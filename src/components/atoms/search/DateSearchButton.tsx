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

    // 기본 날짜 설정 함수
    const getFormattedDate = useCallback((offsetDays: number) => {
        // 날짜 포맷 함수
        const formatDate = (date: Date) => {
            if (isNaN(date.getTime())) return 'Invalid date';
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            const dayOfWeek = week[date.getDay()];
            return `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} (${dayOfWeek})`;
        };

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

        let newStartDate = startDate;
        let newEndDate = endDate;

        if (
            startDateParam &&
            endDateParam &&
            isValidDate(startDateParam) &&
            isValidDate(endDateParam)
        ) {
            newStartDate = startDateParam;
            newEndDate = endDateParam;
        }

        // 상태가 변경된 경우에만 업데이트
        if (startDate !== newStartDate || endDate !== newEndDate) {
            setStartDate(newStartDate);
            setEndDate(newEndDate);
        }
    }, [searchParams, getFormattedDate, startDate, endDate]);
    // searchParams는 URL의 쿼리 파라미터를 반영, 값이 변경될 때마다 useEffect를 다시 실행
    // getFormattedDate 함수는 formatDate 함수에 의존함, 날짜 포맷 시 실행

    // 날짜 변경 시 호출되는 useEffect
    useEffect(() => {
        setDateChange(startDate, endDate);
    }, [startDate, endDate, setDateChange]);

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
