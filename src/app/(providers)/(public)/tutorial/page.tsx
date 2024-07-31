'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import Tuto from '@/components/atoms/tutorial/Tuto';

const Tutorial: React.FC = () => {
    const [step, setStep] = React.useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const funnel = searchParams.get('funnel');
        if (funnel) {
            setStep(Number(funnel));
        }
    }, [searchParams]);

    useEffect(() => {
        if (step <= 5) {
            router.push(`/tutorial?funnel=${step}`, { scroll: false });
        } else {
            router.push('/login');
        }
    }, [step, router]);

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            router.push('/login');
        }
    };

    const handleSkip = () => {
        router.push('/login');
    };

    return (
        <div className="relative flex flex-col items-center h-[850] overflow-hidden">
            <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-xl bg-gray-200 py-2 px-4 rounded mb-8"
            >
                건너뛰기
            </button>

            <section className="flex flex-col items-center justify-center flex-grow max-h-screen">
                <Tuto step={step + 1} />
            </section>

            <div className="mb-12">
                <ProgressIndicator step={step} counts={6} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-2xl bg-main-color font-bold py-2 px-4 rounded w-11/12 max-w-md mb-4"
                >
                    {step < 5 ? '다음' : '완료'}
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
