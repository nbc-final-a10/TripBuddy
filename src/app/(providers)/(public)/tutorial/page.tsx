'use client';

import ProgressIndicator from '@/components/atoms/MyPage/ProgressIndicator';
import TutorialPage1 from '@/components/organisms/tutorial/TutorialPage1';
import TutorialPage2 from '@/components/organisms/tutorial/TutorialPage2';
import TutorialPage3 from '@/components/organisms/tutorial/TutorialPage3';
import TutorialPage4 from '@/components/organisms/tutorial/TutorialPage4';
import TutorialPage5 from '@/components/organisms/tutorial/TutorialPage5';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const Tutorial: React.FC = () => {
    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 5,
    });
    return (
        <>
            {/* <div className="mt-4 xl:mt-20 ml-5 xl:ml-64"> */}
            <ProgressIndicator step={step} counts={5} />
            {/* </div> */}
            <section className="h-dvh flex flex-col">
                <div className="flex flex-col">
                    {step === 0 && <TutorialPage1 />}
                    {step === 1 && <TutorialPage2 />}
                    {step === 2 && <TutorialPage3 />}
                    {step === 3 && <TutorialPage4 />}
                    {step === 4 && <TutorialPage5 />}
                </div>
                <div className="flex justify-center">
                    <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-full" />
                </div>
            </section>
        </>
    );
};

export default Tutorial;
