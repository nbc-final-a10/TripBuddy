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
        if (step <= 4) {
            router.push(`/tutorial?funnel=${step}`, { scroll: false });
        } else {
            router.push('/login');
        }
    }, [step, router]);

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
        <div className="relative flex flex-col items-center h-[850] overflow-hidden bg-white">
            <button
                onClick={handleSkip}
                className="absolute top-4 right-3 text-base  py-1 px-1 rounded mb-4"
            >
                건너뛰기
            </button>

            <section className="flex flex-col items-center justify-center flex-grow max-h-screen ">
                <Tuto step={step + 1} />
            </section>

            <div className="mb-12">
                <ProgressIndicator step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-2xl bg-main-color font-bold py-2 px-4 rounded w-11/12 max-w-md mb-4 "
                >
                    {step < 4 ? '다음' : '시작하기'}
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
