'use client';

import DateSearchButton from '@/components/atoms/search/DateSearchButton';
import LocationSearchButton from '@/components/atoms/search/LocationSearchButton';
import SearchInput from '@/components/atoms/search/SearchInput';
import { SearchBarsProps } from '@/types/SearchBarsProps';
import React from 'react';

const SearchBars: React.FC<SearchBarsProps> = ({
    searchInput,
    setSearchInput,
    startDateTimestamp,
    setStartDateTimestamp,
    endDateTimestamp,
    setEndDateTimestamp,

    thirdLevelLocation,
    setThirdLevelLocation,

    handleShowResult,
    handleKeyDown,
    formattedStartDate,
    formattedEndDate,
}) => {
    return (
        <section className="flex flex-col mx-auto mb-10 mt-6 gap-[18px] xl:flex-row xl:items-center xl:justify-center xl:max-w-screen-xl xl:gap-5">
            <SearchInput
                value={searchInput}
                onKeyDown={handleKeyDown}
                onChange={e => setSearchInput(e.target.value)}
            />

            <DateSearchButton
                defaultStartDate={formattedStartDate}
                defaultEndDate={formattedEndDate}
                setDateChange={(start, end) => {
                    setStartDateTimestamp(start);
                    setEndDateTimestamp(end);
                }}
            />

            <LocationSearchButton
                onClick={() => {}}
                location={thirdLevelLocation || undefined}
            />

            <button
                className="hidden xl:flex xl:w-[140px] xl:px-4 xl:py-2.5 rounded-xl bg-main-color justify-center items-center mx-auto font-semibold text-white text-sm transition-colors duration-200 ease-in-out active:bg-gray-300 whitespace-nowrap"
                onClick={handleShowResult}
            >
                검색하기
            </button>
        </section>
    );
};

export default SearchBars;
