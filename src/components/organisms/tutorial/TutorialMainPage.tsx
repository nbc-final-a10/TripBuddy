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

    const handleNext = async () => {
        if (step < 4) {
            setStep(prev => prev + 1);
        } else {
            await setCookieAction();
        }
    };

    const handleSkip = async () => {
        await setCookieAction();
    };

    useEffect(() => {
        const funnel = searchParams.get('funnel');
        if (funnel) {
            setStep(Number(funnel));
        }
    }, [searchParams]);

    useEffect(() => {
        if (step < 4) {
            router.push(`/tutorial?funnel=${step}`);
        }
    }, [step, router]);

    return (
        <div className="relative  h-dvh overflow-hidden bg-white xl:h-[calc(100dvh-100px)] xl:mt-14 px-[20px] mt-[64px]">
            {step < 4 ? (
                <button
                    onClick={handleSkip}
                    className="relative w-full text-right text-base py-1 px-1 rounded mb-4 xl:mb-0 "
                >
                    건너뛰기
                </button>
            ) : (
                <button className="relative w-full text-right text-base p-4 rounded mb-4 xl:h-[32px] xl:p-0 xl:mb-0"></button>
            )}

            <section className="flex flex-col items-center justify-start w-full flex-1 text-center pb-0 mb-0">
                <Tuto step={step} />
            </section>

            <div className="mb-5 xl:mb-5 flex justify-center">
                <ProgressIndicator className="pt-5" step={step} counts={5} />
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={handleNext}
                    className="text-[18px] bg-main-color font-bold rounded-2xl mb-4 text-white"
                    style={{ width: '335px', height: '48px' }}
                >
                    {step < 4 ? '다음' : '홈으로'}
                </button>
            </div>
        </div>
    );
};

export default TutorialMainPage;
