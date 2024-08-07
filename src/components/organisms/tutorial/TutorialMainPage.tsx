'use client';
import Tuto from '@/components/atoms/tutorial/Tuto';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import { setCookieAction } from '@/utils/tutorial/setCookieAction';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TutorialMainPage: React.FC = () => {
    const [step, setStep] = useState(0);
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
            router.push('/');
        }
    }, [step, router]);

    const handleNext = () => {
        if (step === 1) {
            setCookieAction();
        }
        if (step < 4) {
            setStep(step + 1);
        } else {
            router.push('/');
        }
    };

    const handleSkip = async () => {
        await setCookieAction();
        router.push('/');
    };

    return (
        <div className="relative flex flex-col items-center h-dvh overflow-hidden bg-white xl:h-[calc(100dvh-100px)]">
            {step < 4 ? (
                <button
                    onClick={handleSkip}
                    className="relative w-full text-right text-base py-1 px-1 rounded mb-4 xl:mb-0"
                >
                    건너뛰기
                </button>
            ) : (
                <button className="relative w-full text-right text-base p-4 rounded mb-4 xl:h-[32px] xl:p-0 xl:mb-0"></button>
            )}

            <section className="flex flex-col items-center justify-center w-full xl:h-[100%-64px]">
                <Tuto step={step + 1} />
            </section>

            <div className="mb-5 xl:mb-5">
                <ProgressIndicator className="pt-5" step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-2xl bg-main-color font-bold py-2 px-4 rounded-2xl w-11/12 max-w-md mb-4"
                >
                    {step < 4 ? '다음' : '홈으로'}
                </button>
            </div>
        </div>
    );
};

export default TutorialMainPage;
