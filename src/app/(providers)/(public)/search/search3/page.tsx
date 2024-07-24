'use client';

import React, { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { RangeCalendar } from '@nextui-org/calendar';

const DateSearchPage = () => {
    const [selectedRange, setSelectedRange] = useState(
        // <{
        //     start: CalendarDate | undefined;
        //     end: CalendarDate | undefined;
        // }>
        {
            start: undefined,
            end: undefined,
        },
    );

    // const handleRangeChange = (range: {
    //     start: CalendarDate | undefined;
    //     end: CalendarDate | undefined;
    // }) => {
    //     setSelectedRange(range);
    // };

    return (
        <main className="p-4">
            <header className="mt-2 mb-10">
                <h2 className="text-base font-semibold">언제 떠나시나요?</h2>
                <p className="text-sm text-gray-500">
                    버디즈와 함께 여행하고 싶은 날짜를 선택해주세요.
                </p>
            </header>
            <section className="mb-10">
                <I18nProvider locale="ko-KR-u-ca-dangi">
                    <RangeCalendar aria-label="Date (Controlled Focused Value)" />
                </I18nProvider>
            </section>
            <button className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden">
                선택하기
            </button>
        </main>
    );
};

export default DateSearchPage;
