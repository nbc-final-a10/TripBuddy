'use client';

import ProgressIndicator from '@/components/molecules/write/ProgressIndicator';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const SearchPage: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음', 4);

    return (
        <>
            <div className="mt-4 xl:mt-20 ml-5 xl:ml-64">
                <ProgressIndicator step={step} />
            </div>
            <NextButton className="flex justify-center items-center mx-auto bg-main-color font-bold py-2 px-4 mt-4 rounded w-[150px] xl:w-[300px]" />
        </>
    );
};

export default SearchPage;
