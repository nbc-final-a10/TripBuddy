'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import React from 'react';
import useCalendar from '@/hooks/useCalendar';
import SelectedResultRealtimeText from '../write/SelectedResultRealtimeText';

const DateSearchPage: React.FC = () => {
    const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
        useCalendar();
    return (
        <section>
            <div className="flex justify-center">
                <SelectCalendar />
            </div>
            <div>
                {startDateTimestamp && endDateTimestamp ? (
                    <SelectedResultRealtimeText
                        selectedData={`${startDateTimestamp} ~ ${endDateTimestamp}`}
                        firstLabel="선택하신 날짜는"
                        secondLabel="입니다."
                    />
                ) : (
                    <SelectedResultRealtimeText firstLabel="날짜를 선택해주세요" />
                )}
            </div>
        </section>
    );
};

export default DateSearchPage;
