'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import DateSearch from '@/components/organisms/search/DateSearch';
import { useState } from 'react';

export default function DateSearchPage() {
    const [startDateTimestamp, setStartDateTimestamp] = useState<string>('');
    const [endDateTimestamp, setEndDateTimestamp] = useState<string>('');

    const handleDateChange = (start: string, end: string) => {
        setStartDateTimestamp(start);
        setEndDateTimestamp(end);
    };

    return (
        <div className="p-5">
            <SearchPageTitle
                title="언제 떠나시나요?"
                description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
            />
            <DateSearch setDateChange={handleDateChange} />
        </div>
    );
}
