'use client';

import ProgressIndicator from '@/components/molecules/write/ProgressIndicator';
import SelectRegion from '@/components/organisms/write/SelectRegionPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 4,
    });

    return (
        <>
            <div className="mt-4 xl:mt-20 ml-5 xl:ml-64">
                <ProgressIndicator step={step} />
            </div>
            <section className="h-dvh flex flex-col items-center">
                <div className="flex flex-col items-center">
                    {step === 0 && <WelcomePage />}
                    {step === 1 && <SelectRegion />}
                </div>
                <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-[150px] xl:w-[300px]" />
            </section>
        </>
    );
};

export default WritePage;
