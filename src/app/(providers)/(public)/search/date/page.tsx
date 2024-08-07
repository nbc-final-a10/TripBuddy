'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import DateSearch from '@/components/organisms/search/DateSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DateSearchPage() {
    const [startDateTimestamp, setStartDateTimestamp] = useState<string>('');
    const [endDateTimestamp, setEndDateTimestamp] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();

    // 현재 날짜, 다음날 가져오기
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[today.getDay()];
        return `${today.getFullYear().toString().slice(-2)}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}(${dayOfWeek})`;
    };

    const formattedStartDate = startDateTimestamp
        ? formatDate(new Date(startDateTimestamp))
        : formatDate(today);
    const formattedEndDate = endDateTimestamp
        ? formatDate(new Date(endDateTimestamp))
        : formatDate(tomorrow);

    const handleDateChange = (start: string, end: string) => {
        setStartDateTimestamp(start);
        setEndDateTimestamp(end);
    };

    const handleSelectClick = () => {
        if (startDateTimestamp && endDateTimestamp) {
            const query = new URLSearchParams();
            query.set('startDate', startDateTimestamp);
            query.set('endDate', endDateTimestamp);
            router.push(`/search?${query.toString()}`);
        }
    };

    return (
        <div className="p-5 pt-8">
            <SearchPageTitle
                title="언제 떠나시나요?"
                description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
            />
            <DateSearch setDateChange={handleDateChange} />
            <button
                className="flex justify-center items-center mx-auto w-full px-28 h-12 rounded-2xl bg-main-color font-semibold text-white text-xl mt-40 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-[348px] xl:mt-8"
                onClick={handleSelectClick}
            >
                선택하기
            </button>
        </div>
    );
}
