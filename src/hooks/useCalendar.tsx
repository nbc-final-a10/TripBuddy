'use client';

import React, { useState } from 'react';
import { RangeCalendar } from '@nextui-org/calendar';
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date';

export default function useCalendar() {
    const initialStartDate = today(getLocalTimeZone());
    const initialEndDate = initialStartDate.add({ weeks: 1 });

    const [value, setValue] = useState({
        start: initialStartDate,
        end: initialEndDate,
    });
    const [startDateTimestamp, setStartDateTimestamp] = useState('');
    const [endDateTimestamp, setEndDateTimestamp] = useState('');

    const handleSelectCalendar = (value: {
        start: CalendarDate;
        end: CalendarDate;
    }) => {
        setValue(value);
        setStartDateTimestamp(value.start.toString());
        setEndDateTimestamp(value.end.toString());
    };

    function SelectCalendar() {
        return (
            <div className="w-full flex justify-center mb-16 mt-16">
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
