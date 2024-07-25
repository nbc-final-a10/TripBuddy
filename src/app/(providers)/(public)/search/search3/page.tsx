'use client';

import React, { useState } from 'react';
import { I18nProvider } from '@react-aria/i18n';
import { RangeCalendar } from '@nextui-org/calendar';
import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';

const DateSearchPage = () => {
    const [selectedRange, setSelectedRange] = useState({
        start: undefined,
        end: undefined,
    });

    return (
        <main className="p-4">
            <SearchPageTitle
                title="언제 떠나시나요?"
                description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
            />

            <div className="w-full flex justify-center mb-20 mt-12">
                <I18nProvider locale="ko-KR-u-ca-dangi">
                    <RangeCalendar aria-label="Date (Controlled Focused Value)" />
                </I18nProvider>
            </div>
            <button className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden">
                선택하기
            </button>
        </main>
    );
};

export default DateSearchPage;
