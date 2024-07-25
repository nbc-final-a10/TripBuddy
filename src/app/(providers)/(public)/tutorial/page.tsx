'use client';

import ProgressIndicator from '@/components/molecules/write/ProgressIndicator';
import TutorialPage1 from '@/components/organisms/tutorial/TutorialPage1';
import TutorialPage2 from '@/components/organisms/tutorial/TutorialPage2';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const Tutorial: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음', 1);
    return (
        <>
            <div className="mt-4 xl:mt-20 ml-5 xl:ml-64">
                <ProgressIndicator step={step} />
            </div>
            <section className="h-dvh flex flex-col items-center">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    {step === 0 && <TutorialPage1 />}
                    {step === 1 && <TutorialPage2 />}
                </div>
                <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-[150px] xl:w-[300px]" />
            </section>
        </>
    );
};

export default Tutorial;
