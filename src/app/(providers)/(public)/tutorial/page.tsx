'use client';

import React from 'react';
import ProgressIndicator from '@/components/atoms/MyPage/ProgressIndicator';
import TutorialPage1 from '@/components/organisms/tutorial/TutorialPage1';
import TutorialPage2 from '@/components/organisms/tutorial/TutorialPage2';
import TutorialPage3 from '@/components/organisms/tutorial/TutorialPage3';
import TutorialPage4 from '@/components/organisms/tutorial/TutorialPage4';
import TutorialPage5 from '@/components/organisms/tutorial/TutorialPage5';
import useNextButton from '@/hooks/useFunnelNextStep';
import { useRouter } from 'next/navigation';

const Tutorial: React.FC = () => {
    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 4,
    });

    const router = useRouter();

    const handleSkip = () => {
        router.push('/login');
    };

    return (
        <div className="relative flex flex-col items-center h-screen">
            <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-xl bg-gray-200 py-2 px-4 rounded"
            >
                Skip
            </button>
            <section className="flex flex-col items-center justify-center flex-grow">
                <div className="flex flex-col items-center">
                    {step === 0 && <TutorialPage1 />}
                    {step === 1 && <TutorialPage2 />}
                    {step === 2 && <TutorialPage3 />}
                    {step === 3 && <TutorialPage4 />}
                    {step === 4 && <TutorialPage5 />}
                </div>
            </section>
            <div className="mb-10">
                <ProgressIndicator step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 rounded w-11/12 max-w-md mb-4" />
            </div>
        </div>
    );
};

export default Tutorial;
