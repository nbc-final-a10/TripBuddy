'use client';

import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import Calendar from '@/components/atoms/Calendar';
import React from 'react';

const DateSearchPage: React.FC = () => {
    return (
        <section>
            <Calendar />

            {/* <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 mb-8 rounded-xl bg-gray-500 text-white m-3 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:hidden"
                // onClick={handleSelect}
            >
                선택하기
            </button> */}
        </section>
    );
};

export default DateSearchPage;
