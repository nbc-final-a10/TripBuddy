'use client';

import ChooseDestination from '@/components/organisms/write/ChoideDestination';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음', 4);

    return (
        <section className="h-dvh flex flex-col  items-center">
            <div
                style={{
                    // flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                {step === 0 && <WelcomePage />}
                {step === 1 && <ChooseDestination />}
            </div>
            <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-[150px] xl:w-[300px]" />
        </section>
    );
};

export default WritePage;
