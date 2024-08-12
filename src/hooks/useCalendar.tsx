'use client';

import React, { useState } from 'react';
import { RangeCalendar } from '@nextui-org/calendar';
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date';

export default function useCalendar() {
    const [value, setValue] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ weeks: 1 }),
    });
    const [startDateTimestamp, setStartDateTimestamp] = useState('');
    const [endDateTimestamp, setEndDateTimestamp] = useState('');

    const handleSelectCalendar = (value: {
        start: CalendarDate;
        end: CalendarDate;
    }) => {
        setValue(value);
        // CalendarDate는 setHours 메서드를 지원하지 않으므로 Date 객체로 변환
        const startDate = new Date(value.start.toString());
        const endDate = new Date(value.end.toString());
        startDate.setHours(23, 59, 59, 999);
        endDate.setHours(23, 59, 59, 999);
        setStartDateTimestamp(startDate.toISOString().split('T')[0]);
        setEndDateTimestamp(endDate.toISOString().split('T')[0]);
    };

    function SelectCalendar() {
        return (
            <div className="w-full flex justify-center mb-10 mt-10">
                <RangeCalendar
                    aria-label="Date (Controlled Focused Value)"
                    value={value}
                    onChange={handleSelectCalendar}
                />
            </div>
        );
    }

    return { SelectCalendar, startDateTimestamp, endDateTimestamp };
}
