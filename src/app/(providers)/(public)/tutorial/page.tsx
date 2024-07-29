'use client';

import React from 'react';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import { useRouter } from 'next/navigation';
import Tuto from '@/components/atoms/tutorial/Tuto';

const Tutorial: React.FC = () => {
    const [step, setStep] = React.useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            router.push('/login');
        }
    };

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
                <Tuto step={step + 1} />
            </section>

            <div className="mb-10">
                <ProgressIndicator step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-2xl bg-main-color font-bold py-2 px-4 rounded w-11/12 max-w-md mb-4"
                >
                    {step < 4 ? '다음' : '완료'}
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
