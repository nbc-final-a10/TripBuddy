'use client';

import ProgressIndicator from '@/components/molecules/write/ProgressIndicator';
import DateSearchPage from '@/components/organisms/search/DateSearchPage';
import LocationSearchPage from '@/components/organisms/search/LocationSearchPage';
import SearchMainPage from '@/components/organisms/search/SearchMainPage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const SearchPage: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음', 4);

    return (
        <>
            <section className="items-center">
                <div>
                    {step === 0 && <SearchMainPage />}
                    {step === 1 && <LocationSearchPage />}
                    {step === 2 && <DateSearchPage />}
                </div>
                <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-[150px] xl:w-[300px]" />
            </section>
        </>
    );
};

export default SearchPage;
