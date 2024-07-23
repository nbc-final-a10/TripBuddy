'use client';

import ProgressIndicator from '@/components/molecules/write/ProgressIndicator';
import SelectDestinationPage from '@/components/organisms/write/SelectDestinationPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

interface ProgressIndicatorProps {
    step: number;
}

const WritePage: React.FC<ProgressIndicatorProps> = () => {
    const { NextButton, step } = useNextButton(0, '다음', 4);

    return (
        <section className="h-dvh flex flex-col  items-center">
            <ProgressIndicator step={step} />
            <div
                style={{
                    // flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                {step === 0 && <WelcomePage />}
                {step === 1 && <SelectDestinationPage />}
            </div>
            <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-[150px] xl:w-[300px]" />
        </section>
    );
};

export default WritePage;
