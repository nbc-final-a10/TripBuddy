'use client';

import React from 'react';
import useCalendar from '@/hooks/useCalendar';
import SelectedResultRealtimeText from '../write/SelectedResultRealtimeText';

type DateSearchPageProps = {
    setDateChange: (start: string, end: string) => void;
};

const DateSearchPage: React.FC<DateSearchPageProps> = ({ setDateChange }) => {
    const { SelectCalendar, startDateTimestamp, endDateTimestamp } =
        useCalendar();

    React.useEffect(() => {
        if (startDateTimestamp && endDateTimestamp) {
            setDateChange(startDateTimestamp, endDateTimestamp);
        }
    }, [startDateTimestamp, endDateTimestamp, setDateChange]);

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
