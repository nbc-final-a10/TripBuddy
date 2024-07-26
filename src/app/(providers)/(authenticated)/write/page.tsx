'use client';

import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import CompletePage from '@/components/organisms/write/CompletePage';
import SelectAdditionalBuddyThemes from '@/components/organisms/write/SelectAdditionalBuddyThemes';
import SelectRegionPage from '@/components/organisms/write/SelectRegionPage';
import SelectTripThemesPage from '@/components/organisms/write/SelectTripThemesPage';
import SelectDatePage from '@/components/organisms/write/SelectDatePage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import WriteTrip from '@/components/organisms/write/WriteTrip';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 6,
    });
    return (
        <>
            {/* <div className="mt-4 xl:mt-20 ml-5 xl:ml-64"> */}
            <ProgressIndicator step={step} counts={7} />
            {/* </div> */}
            <section className="h-dvh flex flex-col">
                <div className="flex flex-col">
                    {step === 0 && <WelcomePage />}
                    {step === 1 && <SelectRegionPage />}
                    {step === 2 && <SelectDatePage />}
                    {step === 3 && <SelectTripThemesPage />}
                    {step === 4 && <SelectAdditionalBuddyThemes />}
                    {step === 5 && <WriteTrip />}
                    {step === 6 && <CompletePage />}
                </div>
                <div className="flex justify-center">
                    <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-full" />
                </div>
            </section>
        </>
    );
};

export default WritePage;
